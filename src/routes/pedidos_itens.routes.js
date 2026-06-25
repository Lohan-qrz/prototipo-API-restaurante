import { Router } from 'express';
import { pedidos } from '../data/pedidos.js';
import { pedido_itens } from '../data/pedido_itens.js';
import { produtos } from '../data/produtos.js';

const router = Router({ mergeParams: true });

router.get('/', (req, res) => {
    const pedidoId = Number(req.params.id);

    const pedido = pedidos.find(p => p.id === pedidoId);
    if (!pedido) {
        return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    const itens = pedido_itens
        .filter(i => i.pedido_id === pedidoId)
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
    const pedidoId = Number(req.params.id);
    const itemId = Number(req.params.itemId);

    const item = pedido_itens.find(
        i => i.pedido_id === pedidoId && i.id === itemId
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
    const pedidoId = Number(req.params.id);

    const pedido = pedidos.find(p => p.id === pedidoId);
    if (!pedido) {
        return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    const { quantidade, preco_unitario, observacao, produto_id } = req.body;

    const novoItem = {
        id: pedido_itens.length + 1,
        quantidade,
        preco_unitario,
        observacao: observacao || '',
        produto_id,
        pedido_id: pedidoId
    };

    pedido_itens.push(novoItem);

    const produto = produtos.find(p => p.id === produto_id);

    return res.status(201).json({
        ...novoItem,
        produto: produto || null
    });
});

router.patch('/:itemId', (req, res) => {
    const pedidoId = Number(req.params.id);
    const itemId = Number(req.params.itemId);

    const item = pedido_itens.find(
        i => i.pedido_id === pedidoId && i.id === itemId
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
    const pedidoId = Number(req.params.id);
    const itemId = Number(req.params.itemId);

    const index = pedido_itens.findIndex(
        i => i.pedido_id === pedidoId && i.id === itemId
    );

    if (index === -1) {
        return res.status(404).json({ message: 'Item não encontrado' });
    }

    const removido = pedido_itens[index];
    pedido_itens.splice(index, 1);

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