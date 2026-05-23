import nodemailer from 'nodemailer';
import type { ContactPayload } from '../types/contact.js';

const env = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env: ${name}`);
  return value;
};

export const isMailConfigured = (): boolean =>
  Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.OWNER_EMAIL,
  );

const formatBody = (data: ContactPayload): string =>
  [
    `Имя: ${data.name}`,
    `Телефон: ${data.phone}`,
    `Email: ${data.email}`,
    '',
    'Комментарий:',
    data.comment,
  ].join('\n');

export const sendContactEmails = async (data: ContactPayload): Promise<void> => {
  const transport = nodemailer.createTransport({
    host: env('SMTP_HOST'),
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: env('SMTP_USER'),
      pass: env('SMTP_PASS'),
    },
  });

  const from = process.env.MAIL_FROM ?? env('SMTP_USER');
  const ownerEmail = env('OWNER_EMAIL');
  const text = formatBody(data);

  await transport.sendMail({
    from,
    to: ownerEmail,
    replyTo: data.email,
    subject: `Заявка с сайта — ${data.name}`,
    text,
  });

  await transport.sendMail({
    from,
    to: data.email,
    subject: 'Копия вашего сообщения',
    text: [`Здравствуйте, ${data.name}!`, '', 'Копия отправленного сообщения:', '', text].join(
      '\n',
    ),
  });
};
