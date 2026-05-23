import type { ContactPayload } from '../types/contact';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s+()-]{10,20}$/;

export const validateContact = (
  data: ContactPayload,
): Partial<Record<keyof ContactPayload, string>> => {
  const errors: Partial<Record<keyof ContactPayload, string>> = {};

  if (data.name.trim().length < 2) errors.name = 'Минимум 2 символа.';
  if (!PHONE_RE.test(data.phone.trim())) errors.phone = 'Некорректный телефон.';
  if (!EMAIL_RE.test(data.email.trim())) errors.email = 'Некорректный email.';
  if (data.comment.trim().length < 10) errors.comment = 'Минимум 10 символов.';

  return errors;
};
