import { Router } from 'express';
import { pedidos } from '../data/pedidos.js';
import { produtos } from '../data/produtos.js';
import { pagamentos } from '../data/pagamentos.js';
import { usuarios } from '../data/usuarios.js';
import { pedido_itens } from '../data/pedido_itens.js';

const router = Router();

router.get('/vendas', (req, res) => {
    const totalPedidos = pedidos.length;

    const totalVendas = pedidos.reduce((acc, p) => acc + p.total, 0);

    return res.status(200).json({
        total_pedidos: totalPedidos,
        valor_total: totalVendas
    });
});

router.get('/faturamento', (req, res) => {
    const totalFaturado = pagamentos
        .filter(p => p.status === 'PAGO')
        .reduce((acc, p) => acc + p.valor, 0);

    return res.status(200).json({
        faturamento_total: totalFaturado
    });
});

router.get('/produtos-mais-vendidos', (req, res) => {

    const ranking = {};

    pedido_itens.forEach(item => {
        if (!ranking[item.produto_id]) {
            ranking[item.produto_id] = 0;
        }

        ranking[item.produto_id] += item.quantidade;
    });

    const resultado = Object.entries(ranking).map(([produto_id, quantidade]) => {
        const produto = produtos.find(p => p.id === Number(produto_id));

        return {
            produto: produto?.nome || 'Desconhecido',
            quantidade
        };
    });

    return res.status(200).json(resultado);
});

router.get('/vendas-por-funcionario', (req, res) => {

    const ranking = {};

    pedidos.forEach(p => {
        if (!ranking[p.usuario_id]) {
            ranking[p.usuario_id] = 0;
        }

        ranking[p.usuario_id] += p.total;
    });

    const resultado = Object.entries(ranking).map(([usuario_id, total]) => {
        const user = usuarios.find(u => u.id === Number(usuario_id));

        return {
            funcionario: user?.nome || 'Desconhecido',
            total_vendas: total
        };
    });

    return res.status(200).json(resultado);
});

export default router;