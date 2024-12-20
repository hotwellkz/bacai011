import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { db } from '../lib/firebase';
import { Trash2, Edit2, Save, X, Users } from 'lucide-react';

const ADMIN_PASSWORD = '1888';

const AdminPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editTokens, setEditTokens] = useState<number>(0);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Ошибка при загрузке пользователей');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Неверный пароль');
    }
  };

  const handleDeleteUser = async (userId: string, userEmail: string) => {
    if (!window.confirm(`Вы уверены, что хотите удалить пользователя ${userEmail}?`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'users', userId));
      await fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Ошибка при удалении пользователя');
    }
  };

  const handleEditUser = (userId: string, currentTokens: number) => {
    setEditingUser(userId);
    setEditTokens(currentTokens);
  };

  const handleSaveEdit = async (userId: string) => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        tokens: editTokens
      });
      setEditingUser(null);
      await fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Ошибка при обновлении токенов');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-md">
          <div className="bg-gray-900 rounded-2xl p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Вход в панель администратора</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" className="btn-primary w-full">
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Users className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl font-bold">Управление пользователями</h1>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-4">Email</th>
                  <th className="text-left py-4 px-4">Токены</th>
                  <th className="text-right py-4 px-4">Действия</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-800">
                    <td className="py-4 px-4">{user.email}</td>
                    <td className="py-4 px-4">
                      {editingUser === user.id ? (
                        <input
                          type="number"
                          value={editTokens}
                          onChange={(e) => setEditTokens(Number(e.target.value))}
                          className="bg-gray-800 rounded px-2 py-1 w-24"
                        />
                      ) : (
                        user.tokens
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-end gap-2">
                        {editingUser === user.id ? (
                          <>
                            <button
                              onClick={() => handleSaveEdit(user.id)}
                              className="p-2 hover:bg-green-500/20 rounded-lg transition-colors"
                            >
                              <Save className="w-5 h-5 text-green-500" />
                            </button>
                            <button
                              onClick={() => setEditingUser(null)}
                              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                            >
                              <X className="w-5 h-5 text-red-500" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEditUser(user.id, user.tokens)}
                            className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-5 h-5 text-blue-500" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteUser(user.id, user.email)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;