
import { Router } from 'express';
import { comandas } from '../data/comandas.js';

const router = Router();

router.get('/', (req, res) => res.json(comandas));

router.get('/:id', (req, res) => {
    const item = comandas.find(x => x.id === Number(req.params.id));
    if (!item) return res.status(404).json({ message: 'Não encontrado' });
    res.status(200).json(item);
});

router.post('/', (req, res) => {
    const novo = { id: comandas.length + 1, ...req.body }; //funcionamento simplificado, o ideal é verificar cada informação do body
    comandas.push(novo);
    res.status(201).json(novo);
});

router.patch('/:id', (req, res) => {
    const item = comandas.find(x => x.id === Number(req.params.id));
    if (!item) return res.status(404).json({ message: 'Não encontrado' });
    Object.assign(item, req.body);
    res.status(200).json(item);
});

router.delete('/:id', (req, res) => {
    const idx = comandas.findIndex(x => x.id === Number(req.params.id));
    if (idx === -1) return res.status(404).json({ message: 'Não encontrado' });
    comandas.splice(idx, 1);
    res.status(204).send();
});

export default router;
