export const parseAiPrice = (text: string): number | null => {
  console.log(text)
  const cleanText = text.replace(/\s/g, '').replace(/₽/g, '');
  
  const numbers = cleanText.match(/\d+/g);

  if (!numbers || numbers.length === 0) return null;

  if (numbers.length >= 2) {
    const min = parseInt(numbers[0], 10);
    const max = parseInt(numbers[1], 10);
    return Math.round((min + max) / 2);
  }

  return parseInt(numbers[0], 10);
};