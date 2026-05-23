import type { ContactField, ContactPayload } from '../types/contact.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s+()-]{10,20}$/;

export const validateContactPayload = (
  body: unknown,
): {
  data: ContactPayload | null;
  errors: Partial<Record<ContactField, string>>;
} => {
  const errors: Partial<Record<ContactField, string>> = {};

  if (!body || typeof body !== 'object') {
    return { data: null, errors: { name: 'Некорректное тело запроса.' } };
  }

  const raw = body as Record<string, unknown>;
  const name = typeof raw.name === 'string' ? raw.name.trim() : '';
  const phone = typeof raw.phone === 'string' ? raw.phone.trim() : '';
  const email = typeof raw.email === 'string' ? raw.email.trim() : '';
  const comment = typeof raw.comment === 'string' ? raw.comment.trim() : '';

  if (name.length < 2 || name.length > 100) {
    errors.name = 'Имя: от 2 до 100 символов.';
  }
  if (!PHONE_RE.test(phone)) {
    errors.phone = 'Укажите корректный телефон.';
  }
  if (!EMAIL_RE.test(email)) {
    errors.email = 'Укажите корректный email.';
  }
  if (comment.length < 10 || comment.length > 2000) {
    errors.comment = 'Комментарий: от 10 до 2000 символов.';
  }

  if (Object.keys(errors).length > 0) {
    return { data: null, errors };
  }

  return { data: { name, phone, email, comment }, errors: {} };
};
