import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { Eye, EyeOff, Shield, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user) {
    navigate('/');
    return null;
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const credential = EmailAuthProvider.credential(
        user.email!,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setSuccess('Пароль успешно изменен');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      setError('Ошибка при смене пароля. Проверьте текущий пароль.');
    }
  };

  const resendVerificationEmail = async () => {
    try {
      await user.sendEmailVerification();
      setSuccess('Письмо для подтверждения отправлено');
    } catch (error) {
      setError('Ошибка при отправке письма');
    }
  };

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-gray-900 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <Shield className="w-8 h-8 text-red-500" />
            <h1 className="text-2xl font-bold">Профиль пользователя</h1>
          </div>

          <div className="space-y-6">
            {/* Email Status */}
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium">{user.email}</div>
                  <div className="text-sm text-gray-400">
                    {user.emailVerified ? 
                      'Email подтвержден' : 
                      'Email не подтвержден'
                    }
                  </div>
                </div>
              </div>
              {!user.emailVerified && (
                <button
                  onClick={resendVerificationEmail}
                  className="btn-secondary text-sm"
                >
                  Подтвердить email
                </button>
              )}
            </div>

            {/* Password Change Form */}
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <h2 className="text-xl font-bold">Изменение пароля</h2>
              
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium mb-2">
                    Текущий пароль
                  </label>
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-white"
                  >
                    {showCurrentPassword ? 
                      <EyeOff size={20} /> : 
                      <Eye size={20} />
                    }
                  </button>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium mb-2">
                    Новый пароль
                  </label>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-white"
                  >
                    {showNewPassword ? 
                      <EyeOff size={20} /> : 
                      <Eye size={20} />
                    }
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              {success && (
                <div className="text-green-500 text-sm">{success}</div>
              )}

              <button type="submit" className="btn-primary w-full">
                Изменить пароль
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;