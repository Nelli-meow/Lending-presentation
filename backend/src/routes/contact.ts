import { Router, type Request, type Response } from 'express';
import { sendContactEmails, isMailConfigured } from '../services/mail.js';
import { validateContactPayload } from '../utils/validation.js';

export const contactRouter = Router();

const handleContactPost = async (req: Request, res: Response): Promise<void> => {
  const { data, errors } = validateContactPayload(req.body);

  if (!data) {
    res.status(400).json({ ok: false, message: 'Проверьте поля формы.', errors });
    return;
  }

  if (!isMailConfigured()) {
    res.status(503).json({
      ok: false,
      message: 'Отправка писем не настроена.',
    });
    return;
  }

  try {
    await sendContactEmails(data);
    res.json({ ok: true, message: 'Сообщение отправлено. Копия придёт на ваш email.' });
  } catch (error) {
    console.error('Mail error:', error);
    res.status(500).json({ ok: false, message: 'Не удалось отправить письмо.' });
  }
};

contactRouter.post('/', handleContactPost);
