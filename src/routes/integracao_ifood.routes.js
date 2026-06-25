import { Router } from 'express';
import { ifood_pedidos } from '../data/ifood_pedidos.js';

const router = Router();

router.get('/ifood/pedidos', (req, res) => {
    return res.status(200).json(ifood_pedidos);
});

router.get('/ifood/pedidos/:id', (req, res) => {
    const id = Number(req.params.id);

    const pedido = ifood_pedidos.find(p => p.id === id);

    if (!pedido) {
        return res.status(404).json({
            message: 'Pedido do iFood não encontrado'
        });
    }

    return res.status(200).json(pedido);
});

router.post('/ifood/webhook', (req, res) => {
    const payload = req.body;

    if (!payload || !payload.id) {
        return res.status(400).json({
            message: 'Payload inválido'
        });
    }

    //funcionamento simplificado, o ideal futuramente é vincular o id do pedido do restaurante ao id do pedido no ifood
    const novoPedido = {
        id: ifood_pedidos.length + 1,
        pedido_id: null,
        ifood_order_id: payload.id,
        payload_json: payload,
        status_ifood: 'RECEBIDO',
        sincronizado_em: new Date()
    };

    ifood_pedidos.push(novoPedido);

    return res.status(201).json({
        message: 'Webhook recebido com sucesso',
        data: novoPedido
    });
});

export default router;