import { Router } from 'express';
import { produtos } from '../data/produtos.js';

const router = Router();

router.get('/', (req, res) => res.json(produtos));

router.get('/:id', (req, res) => {
  const item = produtos.find((x) => x.id === Number(req.params.id));
  if (!item) return res.status(404).json({ message: 'Não encontrado' });
  res.json(item);
});

router.post('/', (req, res) => {
  const novo = { id: produtos.length + 1, ...req.body }; //funcionamento simplificado, o ideal é verificar cada informação do body
  produtos.push(novo);
  res.status(201).json(novo);
});

router.put('/:id', (req, res) => {
  const item = produtos.find((x) => x.id === Number(req.params.id));
  if (!item) return res.status(404).json({ message: 'Não encontrado' });
  Object.assign(item, req.body);
  res.json(item);
});

router.patch('/:id', (req, res) => {
  const item = produtos.find((x) => x.id === Number(req.params.id));
  if (!item) return res.status(404).json({ message: 'Não encontrado' });
  Object.assign(item, req.body);
  res.json(item);
});

router.delete('/:id', (req, res) => {
  const idx = produtos.findIndex((x) => x.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Não encontrado' });
  produtos.splice(idx, 1);
  res.status(204).send();
});

export default router;
