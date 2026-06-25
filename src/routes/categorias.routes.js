import { Router } from 'express';
import { categorias } from '../data/categorias.js';

const router = Router();

router.get('/', (req, res) => res.json(categorias));

router.get('/:id', (req, res) => {
    const item = categorias.find(x => x.id === Number(req.params.id));
    if (!item) return res.status(404).json({ message: 'Não encontrado' });
    res.json(item);
});

router.post('/', (req, res) => {
    const novo = { id: categorias.length + 1, ...req.body }; //funcionamento simplificado, o ideal é verificar cada informação do body
    categorias.push(novo);
    res.status(201).json(novo);
});

router.put('/:id', (req, res) => {
    const item = categorias.find(x => x.id === Number(req.params.id));
    if (!item) return res.status(404).json({ message: 'Não encontrado' });
    Object.assign(item, req.body);
    res.status(200).json(item);

});

router.delete('/:id', (req, res) => {
    const idx = categorias.findIndex(x => x.id === Number(req.params.id));
    if (idx === -1) return res.status(404).json({ message: 'Não encontrado' });
    categorias.splice(idx, 1);
    res.status(204).send();
})

export default router;