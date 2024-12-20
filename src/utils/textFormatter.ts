const formatParagraphs = (text: string): string => {
  return text
    .split('\n\n')
    .map(paragraph => paragraph.trim())
    .filter(Boolean)
    .join('\n\n');
};

const formatLists = (text: string): string => {
  return text.replace(/^\d+\.\s+/gm, '• ');
};

const removeExtraSpaces = (text: string): string => {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\n\s+/g, '\n')
    .trim();
};

const formatSections = (text: string): string => {
  return text
    .replace(/^(.*?):\s*$/gm, '<strong>$1</strong>')
    .replace(/^([A-ZА-Я].*?):\s*/gm, '<strong>$1:</strong> ');
};

export function formatAIResponse(text: string): string {
  let formattedText = text
    .replace(/#{1,6}\s+([^\n]+)/g, (_, title) => title) // Remove markdown headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/`([^`]+)`/g, '$1'); // Remove code blocks
    
  formattedText = formatParagraphs(formattedText);
  formattedText = formatLists(formattedText);
  formattedText = removeExtraSpaces(formattedText);
  formattedText = formatSections(formattedText);
  
  return formattedText;
}