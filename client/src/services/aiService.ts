import axios from "axios";

const GROQ_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

interface FormParams {
  [key: string]: string | number | undefined;
}

export const improveDescriptionWithAI = async (
  title: string,
  category: string,
  params: FormParams,
  currentDescription: string,
) => {
  const prompt = `
    Ты — эксперт по продажам на Авито. 
    Название товара: ${title}.
    Категория: ${category}.
    Параметры: ${JSON.stringify(params)}.
    Текущее описание: ${currentDescription}.
    
    Улучши это описание, сделав его продающим. Разбей на абзацы, выдели ключевые преимущества. 
    Не выдумывай характеристики, которых нет в параметрах. Ответь только текстом описания. Максимальное количество символов 700. Язык ответа - Русский
    В ответе дай только улучшенное описание объявления, без каких либо коментариев
  `;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data.choices[0].message.content;
};

export const FindPriceWithAI = async (
  title: string,
  category: string,
  params: FormParams,
  currentDescription: string,
) => {
  const prompt = `
    Проанализируй товар: "${title}" в категории "${category}".
    Характеристики: ${JSON.stringify(params)}.
    Описание: ${currentDescription}.

    Твоя задача — дать оценку рыночной цены в строго определенном формате.
    Используй следующий шаблон:
    
    Средняя цена на [Название товара]:
    [Мин] – [Макс] ₽ — отличное состояние.
    От [Цена] ₽ — идеал, малый износ АКБ (или другие топ-параметры).
    [Мин] – [Макс] ₽ — срочно или с дефектами.

    Важно: 
    1. Пиши только этот текст, без лишних вступлений.
    2. Используй символ "₽" и пробелы в числах (например, 115 000).
  `;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    },
    {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  const priceText = response.data.choices[0].message.content;
  return priceText;
};
