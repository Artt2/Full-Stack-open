import express from 'express';
const app = express();
import diaryRouter from './routes/diaries';
import cors from "cors";
app.use(express.json());
app.use(cors({  // eslint-disable-line @typescript-eslint/no-unsafe-call
  origin: "http://localhost:3000"
}));

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});