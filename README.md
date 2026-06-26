# Restaurante API Mock

Projeto acadêmico desenvolvido por estudantes do 3º ano do Ensino Médio integrado ao curso Técnico em Informática. A aplicação é uma API REST simples para simular o funcionamento básico de um sistema de restaurante, usando dados em memória e rotas organizadas por módulos.

## Informações do projeto

- **Tipo de projeto:** API REST
- **Tema:** Sistema de restaurante
- **Finalidade:** Protótipo acadêmico para estudo de desenvolvimento backend
- **Curso:** Técnico em Informática
- **Série:** 3º ano do Ensino Médio
- **Autores:** Gabriel Lohan, João Gustavo, José Isaias e Lucas Gabriel
- **Instituição:** preencher com o nome da escola
- **Ano:** 2026

## Objetivo

O objetivo do projeto é criar uma API para representar funcionalidades comuns de um restaurante, como cadastro de produtos, categorias, clientes, mesas, comandas, pedidos, pagamentos, usuários, relatórios e uma integração simulada com iFood.

Por ser um protótipo acadêmico, os dados são armazenados em arquivos JavaScript dentro da pasta `src/data`, sem uso de banco de dados. As alterações feitas durante a execução ficam apenas em memória.

## Tecnologias utilizadas

- Node.js
- Express
- JavaScript com ES Modules
- OpenAPI/Swagger para documentação da API

## Estrutura do projeto

```text
.
├── src
│   ├── app.js
│   ├── data
│   └── routes
├── package.json
├── package-lock.json
├── swagger.yaml
└── README.md
```

### Principais pastas

- `src/app.js`: arquivo principal da aplicação, responsável por configurar o servidor e registrar as rotas.
- `src/routes`: contém os arquivos de rotas da API.
- `src/data`: contém os dados simulados usados pela aplicação.
- `swagger.yaml`: documentação da API no formato OpenAPI.

## Como executar o projeto

### Pré-requisitos

Antes de iniciar, é necessário ter o Node.js instalado na máquina.

### Instalação

No terminal, dentro da pasta do projeto, instale as dependências:

```bash
npm install
```

### Execução

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

Após executar o comando, a API ficará disponível em:

```text
http://localhost:3000
```

Para testar se a API está funcionando, acesse:

```text
GET http://localhost:3000/
```

Resposta esperada:

```json
{
  "message": "API Restaurante Mock"
}
```

## Rotas principais

| Recurso | Rota base | Descrição |
| --- | --- | --- |
| Categorias | `/categorias` | Gerenciamento das categorias de produtos |
| Clientes | `/clientes` | Gerenciamento de clientes |
| Comandas | `/comandas` | Gerenciamento de comandas |
| Itens da comanda | `/comandas/:id/itens` | Gerenciamento dos itens de uma comanda |
| Integrações | `/integracoes` | Rotas simuladas de integração com iFood |
| Mesas | `/mesas` | Gerenciamento das mesas do restaurante |
| Pagamentos | `/pagamentos` | Gerenciamento de pagamentos |
| Pedidos | `/pedidos` | Gerenciamento de pedidos |
| Itens do pedido | `/pedidos/:id/itens` | Gerenciamento dos itens de um pedido |
| Produtos | `/produtos` | Gerenciamento dos produtos do cardápio |
| Relatórios | `/relatorios` | Consultas de vendas, faturamento e rankings |
| Usuários | `/usuarios` | Gerenciamento de usuários/funcionários |

## Exemplos de operações

### Listar produtos

```text
GET http://localhost:3000/produtos
```

### Buscar produto por ID

```text
GET http://localhost:3000/produtos/1
```

### Criar produto

```text
POST http://localhost:3000/produtos
```

Exemplo de corpo da requisição:

```json
{
  "nome": "Refrigerante",
  "descricao": "Lata 350ml",
  "preco": 6.5,
  "categoria_id": 1
}
```

### Atualizar produto

```text
PUT http://localhost:3000/produtos/1
```

ou

```text
PATCH http://localhost:3000/produtos/1
```

### Remover produto

```text
DELETE http://localhost:3000/produtos/1
```

## Relatórios disponíveis

| Rota | Descrição |
| --- | --- |
| `/relatorios/vendas` | Retorna a quantidade de pedidos e o valor total vendido |
| `/relatorios/faturamento` | Retorna o faturamento total com base nos pagamentos pagos |
| `/relatorios/produtos-mais-vendidos` | Retorna um ranking de produtos vendidos |
| `/relatorios/vendas-por-funcionario` | Retorna o total de vendas por funcionário |

## Integração simulada com iFood

O projeto possui rotas que simulam uma integração externa com o iFood:

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/integracoes/ifood/pedidos` | Lista os pedidos simulados do iFood |
| GET | `/integracoes/ifood/pedidos/:id` | Busca um pedido do iFood por ID |
| POST | `/integracoes/ifood/webhook` | Simula o recebimento de um webhook do iFood |

## Documentação Swagger

A documentação da API está no arquivo:

```text
swagger.yaml
```

Esse arquivo pode ser aberto em ferramentas como Swagger Editor, Swagger UI, Postman ou Insomnia para visualizar e testar as rotas de forma mais organizada.

## Observações importantes

- Este projeto é um protótipo acadêmico.
- Os dados não são persistidos em banco de dados.
- As informações são armazenadas em memória durante a execução da aplicação.
- Ao reiniciar o servidor, os dados voltam ao estado definido nos arquivos da pasta `src/data`.
- Algumas validações foram simplificadas para facilitar o entendimento do funcionamento da API.

## Possíveis melhorias futuras
- Adicionar banco de dados.
- Criar autenticação de usuários.
- Melhorar as validações dos dados enviados nas requisições.
- Adicionar testes automatizados.
- Conectar a interface frontend para consumir a API.

