# PARKING MANAGEMENT

O projeto consiste no desenvolvimento de uma aplicação para gerenciamento de um estacionamento com pagamento em dinheiro automático. A ideia é criar um sistema que controle a entrada e saída de veículos, registrando as informações necessárias, como placa e tipo de veículo, para calcular o preço a ser cobrado.

Ao entrar no estacionamento, o veículo é registrado no sistema, e ao sair, é registrada a saída. Com base no tempo de permanência e no tipo de veículo, o sistema calcula o valor a ser cobrado.

O pagamento é feito em dinheiro, utilizando um caixa eletrônico. O motorista insere as notas e moedas na máquina, e o sistema retorna o troco adequado com base nas informações do estoque de notas e moedas disponíveis. Por exemplo, se o preço a ser pago for R$ 17,45 e o cliente der uma nota de R$ 10, duas notas de R$ 5,00 e uma moeda de R$ 0,50, o sistema deve retornar o troco de acordo com as notas e moedas disponíveis em estoque.

O sistema também deve possibilitar a visualização do estoque de moedas e notas, bem como a movimentação diária dos clientes. Todos os cadastros e registros serão feitos manualmente, simulando a leitura e inserção de informações.

Para a implementação, você pode escolher a tecnologia de sua preferência. No entanto, é necessário que haja uma separação entre o front-end e o back-end, que se comuniquem por meio de uma API Rest com autenticação JWT. O banco de dados utilizado deverá ser o PostgreSQL.

# BACKEND SETUP

-   `npm init -y`: Inicia um novo projeto Node.js e cria o arquivo package.json com configurações padrão.
-   `npm i typescript -D`: Instala o pacote TypeScript como dependência de desenvolvimento no projeto.
-   `npm i @types/node -D`: Instala as definições de tipo para o Node.js como dependência de desenvolvimento.
-   `npx tsc --init`: Inicializa a configuração do TypeScript no projeto, gerando o arquivo tsconfig.json.
-   `npm i tsx -D`: Instala o pacote TSX como dependência de desenvolvimento.
-   `npm i fastify`: Instala o framework Fastify no projeto.
-   `npm i eslint -D`: Instala a ferramenta de linting ESLint como dependência de desenvolvimento.
-   `npm i @rocketseat/eslint-config -D`: Instala a configuração de linting da Rocketseat para o ESLint, e adiciona a extensão no arquivo .eslintrc.json.
-   `npm i prisma -D`: Instala o ORM Prisma como dependência de desenvolvimento no projeto.
-   `npx prisma init`: Inicializa o Prisma no projeto (por padrão já vem configurado com PostgreSQL).

-   `docker run --name parking_management -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=root -e                 POSTGRES_DB=parking_management -p 5432:5432 -d postgres`
 
-   `npx prisma migrate dev`: Executa as migrações do banco de dados com base nos arquivos de migração do Prisma.
-   `npx prisma studio`: Inicia o Prisma Studio, uma ferramenta visual para explorar e gerenciar o banco de dados.
-   `npm i @prisma/client`: Instala o Prisma Client, que é a biblioteca de acesso ao banco de dados gerada pelo Prisma.
-   `npm i zod`: Instala a biblioteca Zod, que é uma alternativa ao Joi para validação de dados.

-   `npm i dotenv -D`: Instala o pacote Dotenv como dependência de desenvolvimento, que carrega variáveis de ambiente a partir de um arquivo .env.
-   `npm i axios`: Instala a biblioteca Axios, que permite fazer requisições HTTP no projeto.
-   `npm i @fastify/jwt`: Instala o pacote Fastify JWT, que fornece suporte para autenticação baseada em JWT (JSON Web Tokens) no Fastify.

-   `npm i @fastify/cors`: Instala o pacote Fastify CORS, que permite configurar as URLs que têm permissão para acessar a API de forma segura.