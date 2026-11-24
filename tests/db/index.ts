import express, { type Request, type Response } from 'express';
import { getTagById, getTags } from '@news-aggregator/db'

const app = express();
app.use(express.json());

interface QueryTagData {
  id: string
}

interface BodyTagData {
  name: string
}

app.get('/tags', async (req: Request<unknown, unknown, BodyTagData, QueryTagData>, res: Response) => {
  let results

  if (req.query.id) {
      results = await getTagById(req.query.id)
      return res.json(results);
  }

  results = await getTags(req.body)
  console.log(results)
  res.json(results);
});


app.post('/tags/:data', (req: Request<unknown, unknown, BodyTagData, unknown>, res: Response) => {
  res.json({ status: 'ok' });
});

app.patch('/tags', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.delete('/tags/:id', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
