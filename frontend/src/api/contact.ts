import type { ContactPayload, ContactResponse } from '../types/contact';

export const sendContact = async (
    data: ContactPayload,
): Promise<ContactResponse> => {
    try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const json = (await res.json()) as ContactResponse;

        if (!res.ok || !json.ok) {
            throw new Error(json.message || 'Ошибка отправки');
        }

        return json;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }

        throw new Error('Нет связи с сервером');
    }
};