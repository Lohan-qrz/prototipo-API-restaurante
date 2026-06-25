
import { Router } from 'express';
import { mesas } from '../data/mesas.js';

const router = Router();

router.get('/', (req, res) => res.json(mesas));

router.get('/:id', (req, res) => {
    const item = mesas.find(x => x.id === Number(req.params.id));
    if (!item) return res.status(404).json({ message: 'Não encontrado' });
    res.status(200).json(item);
});

router.post('/', (req, res) => {
    const novo = { id: mesas.length + 1, ...req.body }; //funcionamento simplificado, o ideal é verificar cada informação do body
    mesas.push(novo);
    res.status(201).json(novo);
});

router.patch('/:id', (req, res) => {
    const item = mesas.find(x => x.id === Number(req.params.id));
    if (!item) return res.status(404).json({ message: 'Não encontrado' });
    Object.assign(item, req.body);
    res.status(200).json(item);
});

router.delete('/:id', (req, res) => {
    const idx = mesas.findIndex(x => x.id === Number(req.params.id));
    if (idx === -1) return res.status(404).json({ message: 'Não encontrado' });
    mesas.splice(idx, 1);
    res.status(204).send();
});

export default router;
