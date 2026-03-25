export const PARAM_LABELS: Record<string, string> = {
  // Общие
  type: "Тип",
  brand: "Бренд",
  model: "Модель",
  condition: "Состояние",
  color: "Цвет",
  // Авто
  yearOfManufacture: "Год выпуска",
  transmission: "Коробка передач",
  mileage: "Пробег",
  enginePower: "Мощность двигателя",
  // Недвижимость
  address: "Адрес",
  area: "Площадь",
  floor: "Этаж",
};

export const VALUE_LABELS: Record<string, string> = {
  automatic: "Автомат",
  manual: "Механика",
  new: "Новое",
  used: "Б/У",
  flat: "Квартира",
  house: "Дом",
  room: "Комната",
  phone: "Телефон",
  laptop: "Ноутбук",
  misc: "Другое",
};

export const REQUIRED_FIELDS_MAP: Record<string, string[]> = {
  auto: [
    "brand",
    "model",
    "yearOfManufacture",
    "transmission",
    "mileage",
    "enginePower",
  ],
  real_estate: ["type", "address", "area", "floor"],
  electronics: ["type", "brand", "model", "condition", "color"],
};

export const CATEGORIES: Record<string, string> = {
  electronics: 'Электроника',
  real_estate: 'Недвижимость',
  auto: 'Авто'
}
