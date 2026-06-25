import { Router } from 'express';
import { comanda_itens } from '../data/comanda_itens.js';
import { comandas } from '../data/comandas.js';
import { produtos } from '../data/produtos.js';

const router = Router({ mergeParams: true });

router.get('/', (req, res) => {
    const comandaId = Number(req.params.id);

    const comanda = comandas.find(c => c.id === comandaId);
    if (!comanda) {
        return res.status(404).json({ message: 'Comanda não encontrada' });
    }

    const itens = comanda_itens
        .filter(i => i.comanda_id === comandaId)
        .map(item => {
            const produto = produtos.find(p => p.id === item.produto_id);

            return {
                ...item,
                produto: produto || null
            };
        });

    return res.status(200).json(itens);
});

router.get('/:itemId', (req, res) => {
    const comandaId = Number(req.params.id);
    const itemId = Number(req.params.itemId);

    const item = comanda_itens.find(
        i => i.comanda_id === comandaId && i.id === itemId
    );

    if (!item) {
        return res.status(404).json({ message: 'Item não encontrado' });
    }

    const produto = produtos.find(p => p.id === item.produto_id);

    return res.status(200).json({
        ...item,
        produto: produto || null
    });
});

router.post('/', (req, res) => {
    const comandaId = Number(req.params.id);

    const comanda = comandas.find(c => c.id === comandaId);
    if (!comanda) {
        return res.status(404).json({ message: 'Comanda não encontrada' });
    }

    const { quantidade, preco_unitario, observacao, produto_id } = req.body;

    const novoItem = {
        id: comanda_itens.length + 1,
        comanda_id: comandaId,
        quantidade,
        preco_unitario,
        observacao: observacao || '',
        produto_id
    };

    comanda_itens.push(novoItem);

    const produto = produtos.find(p => p.id === produto_id);

    return res.status(201).json({
        ...novoItem,
        produto: produto || null
    });
});

router.patch('/:itemId', (req, res) => {
    const comandaId = Number(req.params.id);
    const itemId = Number(req.params.itemId);

    const item = comanda_itens.find(
        i => i.comanda_id === comandaId && i.id === itemId
    );

    if (!item) {
        return res.status(404).json({ message: 'Item não encontrado' });
    }

    const { quantidade, preco_unitario, observacao, produto_id } = req.body;

    if (quantidade !== undefined) item.quantidade = quantidade;
    if (preco_unitario !== undefined) item.preco_unitario = preco_unitario;
    if (observacao !== undefined) item.observacao = observacao;
    if (produto_id !== undefined) item.produto_id = produto_id;

    const produto = produtos.find(p => p.id === item.produto_id);

    return res.status(200).json({
        ...item,
        produto: produto || null
    });
});

router.delete('/:itemId', (req, res) => {
    const comandaId = Number(req.params.id);
    const itemId = Number(req.params.itemId);

    const index = comanda_itens.findIndex(
        i => i.comanda_id === comandaId && i.id === itemId
    );

    if (index === -1) {
        return res.status(404).json({ message: 'Item não encontrado' });
    }

    const removido = comanda_itens[index];
    comanda_itens.splice(index, 1);

    const produto = produtos.find(p => p.id === removido.produto_id);

    return res.status(200).json({
        message: 'Item removido com sucesso',
        item: {
            ...removido,
            produto: produto || null
        }
    });
});

export default router;