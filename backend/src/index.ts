import 'dotenv/config';
import express, { type Request, type Response, type NextFunction } from 'express';
import { contactRouter } from './routes/contact.js';
import { isMailConfigured, verifyMailConnection } from './services/mail.js';

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? 'http://localhost:5173';

app.use(express.json({ limit: '32kb' }));

const corsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  res.setHeader('Access-Control-Allow-Origin', CORS_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
};

const healthHandler = (_req: Request, res: Response): void => {
  res.json({
    ok: true,
    mail: isMailConfigured(),
  });
};

app.use(corsMiddleware);
app.get('/api/health', healthHandler);
app.use('/api/contact', contactRouter);

app.use((_req, res) => {
  res.status(404).json({ ok: false, message: 'Not found' });
});

const start = async (): Promise<void> => {
  if (isMailConfigured()) {
    try {
      await verifyMailConnection();
      console.log('SMTP: подключение успешно');
    } catch (error) {
      console.warn('SMTP: не удалось проверить подключение:', error);
    }
  } else {
    console.warn('SMTP: не настроен — заполните backend/.env или USE_ETHEREAL=true');
  }

  app.listen(PORT, () => {
    console.log(`Backend: http://localhost:${PORT}`);
  });
};

start().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
