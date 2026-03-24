import axios from 'axios';

const GROQ_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const improveDescriptionWithAI = async (
  title: string, 
  category: string, 
  params: any, 
  currentDescription: string
) => {
  const prompt = `
    Ты — эксперт по продажам на Авито. 
    Название товара: ${title}.
    Категория: ${category}.
    Параметры: ${JSON.stringify(params)}.
    Текущее описание: ${currentDescription}.
    
    Улучши это описание, сделав его продающим. Разбей на абзацы, выдели ключевые преимущества. 
    Не выдумывай характеристики, которых нет в параметрах. Ответь только текстом описания. Максимальное количество символов 1000. Язык ответа - Русский
  `;

  const response = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    },
    {
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].message.content;
};

export const FindPriceWithAI = async (
  title: string, 
  category: string, 
  params: any, 
  currentDescription: string
) => {
  const prompt = `
    Ты — аналитик цен на крупнейших маркетплейсах (Авито, Авто.ру, Циан). 
    Твоя задача: на основе данных объявления предложить справедливую рыночную цену в рублях.

    ДАННЫЕ ОБЪЯВЛЕНИЯ:
    Название: ${title}
    Категория: ${category}
    Технические характеристики: ${JSON.stringify(params)}
    Текущее описание: ${currentDescription}

    ИНСТРУКЦИЯ:
    1. Оцени состояние товара на основе описания и параметров.
    2. Учти специфику категории (например, для недвижимости важна площадь, для авто — пробег и год).
    3. Проанализируй рыночные тренды 2026 года для данных товаров.
    4. Выдай ответ СТРОГО в формате одного числа (например: 55000). 
    5. Не пиши никаких пояснений, валюту или слов типа "Примерная цена". Только цифры.
  `;

  const response = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
    },
    {
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
    }
  );

  const priceText = response.data.choices[0].message.content;
  return parseInt(priceText.replace(/\D/g, ''), 10);
};