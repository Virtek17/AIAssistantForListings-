export const formatCurrency = (value?: number) => {
  return value !== undefined 
    ? `${value.toLocaleString('ru-RU')} ₽` 
    : 'Цена не указана';
};