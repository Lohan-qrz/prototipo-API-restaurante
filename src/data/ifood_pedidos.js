export const ifood_pedidos = [
  {
    id: 1,
    pedido_id: 1,
    ifood_order_id: 'ord_456',
    payload_json: {
      id: 'ord_456',

      createdAt: '2026-08-20T19:30:00Z',

      customer: {
        name: 'João Silva',
        phone: '83999999999',
      },

      delivery: {
        deliveryAddress: {
          streetName: 'Rua Aprígio Veloso',
          streetNumber: '882',
          neighborhood: 'Universitário',
          city: 'Campina Grande',
          state: 'PB',
          postalCode: '58429-900',
          country: 'BR',
          reference: 'Próximo ao IFPB',
        },
      },

      items: [
        {
          id: 'item_1',
          name: 'X-Burguer',
          quantity: 2,
          unitPrice: 18.0,
        },
        {
          id: 'item_2',
          name: 'Refrigerante',
          quantity: 1,
          unitPrice: 6.0,
        },
      ],

      payments: [
        {
          method: 'ONLINE',
          value: 42.0,
        },
      ],

      total: {
        orderAmount: 42.0,
      },
    },
    status_ifood: 'PREPARATION_STARTED',
    sincronizado_em: new Date(),
  },
];
