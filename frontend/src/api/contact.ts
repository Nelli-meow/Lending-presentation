import type { ContactPayload, ContactResponse } from '../types/contact';

export class ContactApiError extends Error {
  constructor(
    message: string,
    public fieldErrors?: Partial<Record<keyof ContactPayload, string>>,
  ) {
    super(message);
    this.name = 'ContactApiError';
  }
}

export const sendContact = async (data: ContactPayload): Promise<ContactResponse> => {
  let res: Response;

  try {
    res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch {
    throw new ContactApiError('Нет связи с сервером. Запустите backend: npm run dev:backend');
  }

  let json: ContactResponse;

  try {
    json = (await res.json()) as ContactResponse;
  } catch {
    throw new ContactApiError('Сервер вернул некорректный ответ.');
  }

  if (!res.ok || !json.ok) {
    throw new ContactApiError(
      json.ok ? 'Ошибка отправки.' : json.message,
      json.ok ? undefined : json.errors,
    );
  }

  return json;
};
