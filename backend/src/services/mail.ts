import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import type { ContactPayload } from '../types/contact.js';

let cachedTransport: Transporter | null = null;
let etherealFrom: string | null = null;

const env = (name: string): string => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing env: ${name}`);
  return value;
};

export const isMailConfigured = (): boolean => {
  if (!process.env.OWNER_EMAIL?.trim()) return false;
  if (process.env.USE_ETHEREAL === 'true') return true;

  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS?.trim(),
  );
};

const createSmtpTransport = (): Transporter => {
  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  return nodemailer.createTransport({
    host: env('SMTP_HOST'),
    port,
    secure,
    auth: {
      user: env('SMTP_USER'),
      pass: env('SMTP_PASS'),
    },
  });
};

const createEtherealTransport = async (): Promise<Transporter> => {
  const testAccount = await nodemailer.createTestAccount();

  console.log('Ethereal (тестовая почта):');
  console.log(`  user: ${testAccount.user}`);
  console.log(`  pass: ${testAccount.pass}`);

  etherealFrom = `"Portfolio" <${testAccount.user}>`;

  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

export const getTransport = async (): Promise<Transporter> => {
  if (cachedTransport) return cachedTransport;

  cachedTransport =
    process.env.USE_ETHEREAL === 'true'
      ? await createEtherealTransport()
      : createSmtpTransport();

  return cachedTransport;
};

export const verifyMailConnection = async (): Promise<void> => {
  const transport = await getTransport();
  await transport.verify();
};

const formatBody = (data: ContactPayload): string =>
  [
    'Новая заявка с сайта',
    '',
    `Имя: ${data.name}`,
    `Телефон: ${data.phone}`,
    `Email: ${data.email}`,
    '',
    'Комментарий:',
    data.comment,
  ].join('\n');

const logPreviewUrl = (info: nodemailer.SentMessageInfo): void => {
  const url = nodemailer.getTestMessageUrl(info);
  if (url) console.log(`  preview: ${url}`);
};

const resolveFrom = (): string => {
  if (process.env.MAIL_FROM?.trim()) return process.env.MAIL_FROM.trim();
  if (process.env.USE_ETHEREAL === 'true' && etherealFrom) return etherealFrom;
  return env('SMTP_USER');
};

export const sendContactEmails = async (data: ContactPayload): Promise<void> => {
  const transport = await getTransport();
  const from = resolveFrom();
  const ownerEmail = env('OWNER_EMAIL');
  const text = formatBody(data);

  const ownerInfo = await transport.sendMail({
    from,
    to: ownerEmail,
    replyTo: data.email,
    subject: `Заявка с сайта — ${data.name}`,
    text,
  });

  if (process.env.USE_ETHEREAL === 'true') {
    console.log('Письмо владельцу (Ethereal):');
    logPreviewUrl(ownerInfo);
  }

  const userInfo = await transport.sendMail({
    from,
    to: data.email,
    subject: 'Копия вашего сообщения',
    text: [
      `Здравствуйте, ${data.name}!`,
      '',
      'Спасибо за обращение. Ниже копия отправленного сообщения:',
      '',
      text,
      '',
      'Я свяжусь с вами в ближайшее время.',
    ].join('\n'),
  });

  if (process.env.USE_ETHEREAL === 'true') {
    console.log('Копия пользователю (Ethereal):');
    logPreviewUrl(userInfo);
  }
};

export const getMailErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    const msg = error.message.toLowerCase();

    if (msg.includes('invalid login') || msg.includes('authentication')) {
      return 'Ошибка авторизации SMTP. Проверьте SMTP_USER и SMTP_PASS.';
    }
    if (msg.includes('connect') || msg.includes('etimedout') || msg.includes('econnrefused')) {
      return 'Не удалось подключиться к SMTP-серверу. Проверьте SMTP_HOST и SMTP_PORT.';
    }
    if (msg.includes('missing env')) {
      return 'Сервер не настроен: заполните переменные в backend/.env';
    }
  }

  return 'Не удалось отправить письмо. Попробуйте позже.';
};
