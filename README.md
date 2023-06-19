
# PARKING MANAGEMENT

Este é um sistema de cobrança e controle para um estacionamento. O sistema registra a entrada e saída de veículos, calcula o valor a ser cobrado com base no tempo de permanência e tipo de veículo, e permite o pagamento em dinheiro utilizando um caixa eletrônico. Além disso, o sistema oferece recursos para visualização do estoque de notas e moedas, assim como a movimentação diária dos clientes.

## Funcionalidades

-   Registro de entrada e saída de veículos.
-   Cálculo automático do valor a ser cobrado com base no tempo de permanência e tipo de veículo.
-   Visualização do estoque de moedas e notas.
-   Registro da movimentação diária dos clientes.
-   Retorno de troco adequado com base nas notas e moedas disponíveis em estoque.
-   PLUS: Ter a aplicação publicada no GCP.
-   PLUS: Estar em uma esteira de CI/CD integrado com o Git.

## Requisitos de Implementação

-   Separação entre front-end e back-end.
-   Comunicação entre front-end e back-end por meio de uma API REST com autenticação JWT.
-   Utilização do banco de dados PostgreSQL para armazenamento dos dados.

# Tecnologias Utilizadas

## Backend:

-   Node.js
-   TypeScript
-   Fastify
-   ESLint
-   Prisma
-   PostgreSQL
-   Zod
-   Dotenv
-   Axios
-   Bcryptjs
-   Fastify JWT
-   Fastify CORS
-   Day.js

## Frontend:

-   Next.js
-   React
-   TypeScript
-   ESLint
-   Axios
-   jwt-decode
-   Prettier (com suporte ao Tailwind CSS)
-   React Icons
-   Tailwind CSS
-   js-cookie
-   Day.js
-   Jest (com configuração para TypeScript e Babel)

# Como executar o projeto

1.  Clone o repositório:
    
    `git clone git@github.com:Matheus-Azevedo/az.parkingmanagement.com.br.git` 
    
    ou
    
    `git clone https://github.com/Matheus-Azevedo/az.parkingmanagement.com.br.git` 
    
2.  Configure o ambiente:
    
  -   Execute o seguinte comando tanto na pasta `Backend` quanto na pasta `Frontend` para instalar as dependências:
        
      `npm install` 
        
3.  Execute o Docker Compose:
    
  -   Certifique-se de ter o Docker Compose instalado em sua máquina.
        
  -   Navegue para o diretório raiz do projeto, onde está localizado o arquivo `docker-compose.yml`.
        
  -   Execute o seguinte comando para iniciar os serviços definidos no Docker Compose:
        
      `docker compose up` 
          
      O Docker Compose irá baixar as imagens necessárias, criar e iniciar os contêineres para o backend, frontend e banco de dados PostgreSQL. Ele também irá configurar as variáveis de ambiente definidas no arquivo `.env` para o contêiner do banco de dados.
    
4.  Acesse o projeto: `http://localhost:3000`. 

# Configurações realizadas

Os comandos listados configuram o ambiente de desenvolvimento backend e frontend do projeto. Aqui está uma descrição resumida de cada comando:

## Configuração do Backend:

-   `npm init -y`: Inicia um novo projeto Node.js e cria o arquivo package.json com configurações padrão.
    
-   `npm i typescript -D`: Instala o pacote TypeScript como dependência de desenvolvimento no projeto.
    
-   `npm i @types/node -D`: Instala as definições de tipo para o Node.js como dependência de desenvolvimento.
    
-   `npx tsc --init`: Inicializa a configuração do TypeScript no projeto, gerando o arquivo tsconfig.json.
    
-   `npm i tsx -D`: Instala o pacote TSX como dependência de desenvolvimento.
    
-   `npm i fastify`: Instala o framework Fastify no projeto.
    
-   `npm i eslint -D`: Instala a ferramenta de linting ESLint como dependência de desenvolvimento.
    
-   `npm i @rocketseat/eslint-config -D`: Instala a configuração de linting da Rocketseat para o ESLint.
    
-   `docker run --name parking_management -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=root -e POSTGRES_DB=parking_management -p 5432:5432 -d postgres`: Inicia um contêiner Docker com o PostgreSQL para o projeto.
    
-   `npm i prisma -D`: Instala o ORM Prisma como dependência de desenvolvimento no projeto.

-   `npm i -D ts-node typescript @types/node`
    
-   `npx prisma init`: Inicializa o Prisma no projeto.
    
-   `npx prisma migrate dev`: Executa as migrações do banco de dados com base nos arquivos de migração do Prisma.

-   `npx prisma db seed`: Executa as seeders para popular o banco de dados com arquivos iniciais.
    
-   `npx prisma migrate reset`: Executa um reset no banco de dados.
    
-   `npx prisma studio`: Inicia o Prisma Studio, uma ferramenta visual para explorar e gerenciar o banco de dados.
    
-   `npm i @prisma/client`: Instala o Prisma Client, que é a biblioteca de acesso ao banco de dados gerada pelo Prisma.
    
-   `npm i zod`: Instala a biblioteca Zod para validação de dados.
    
-   `npm i dotenv -D`: Instala o pacote Dotenv como dependência de desenvolvimento para carregar variáveis de ambiente.
    
-   `npm i axios`: Instala a biblioteca Axios para fazer requisições HTTP.
    
-   `npm i bcryptjs`: Instala a biblioteca Bcryptjs para lidar com criptografia de senhas.
    
-   `npm i @fastify/jwt`: Instala o pacote Fastify JWT para suporte de autenticação baseada em JWT.
    
-   `npm i @fastify/cors`: Instala o pacote Fastify CORS para configurar permissões de acesso à API de forma segura.
    
-   `npm i dayjs`: Instala um pacote para manipulação de datas.
    

## Configuração do Frontend:

-   `npx create-next-app@latest web --use-npm`: Cria um novo aplicativo Next.js chamado "web" usando o pacote "create-next-app".
    
-   `npm i @rocketseat/eslint-config -D`: Instala a configuração de linting da Rocketseat para o projeto frontend.
    
-   `npm i axios`: Instala a biblioteca Axios para fazer solicitações de rede.
    
-   `npm i jwt-decode`: Instala a biblioteca jwt-decode para decodificar tokens JWT.
    
-   `npm i prettier-plugin-tailwindcss -D`: Adiciona suporte ao Tailwind CSS ao Prettier.
    
-   `npm install react-icons --save`: Instala a biblioteca React Icons, que fornece uma biblioteca de ícones para o aplicativo React.
    
-   `npm install -D @tailwindcss/forms`: Instala estilos para formulários HTML no Tailwind CSS.
    
-   `npm i js-cookie`: Instala a biblioteca js-cookie para manipulação de cookies.
    
-   `npm i --save-dev @types/js-cookie`: Instala as definições de tipo para a biblioteca js-cookie.
    
-   `npm i dayjs`: Instala um pacote para manipulação de datas.
    
-   `npm i --save-dev jest @babel/preset-typescript @types/jest`: Instala as dependências para configuração de testes com Jest e TypeScript.

# Considerações finais

Primeiramente quero agradecer a oportunidade que a Flowdrive me deu de estar fazendo este projeto. Independente da decisão da empresa sem seguir comigo em seu processo seletivo, eu pude evoluir bastante como profissional com este protótipo de gerenciador de estacionamento.

## Vamos falar do projeto

Como base no tempo estipulado por mim, que se iniciou em 24/05 e finalizou no dia 30/05, o protótipo  atingiu os seguinte estado:

`A respeito do que foi solicitado`, das 10 requisitos propostos, entre funcionais e não funcionais, não alcancei 3 demandas, as quais foram:
  -   Retorno de troco adequado com base nas notas e moedas disponíveis em estoque.
  -   PLUS: Ter a aplicação publicada no GCP.
  -   PLUS: Estar em uma esteira de CI/CD integrado com o Git.

`A respeito do código no FRONTEND`, foram implementados maneiras diferentes de execução e frameworks variados, foi proposital para demostrar meu conhecimento na área.

`A respeito do código no BACKEND`, por se tratar de um protótipo, decidi  concentrar os código em poucos arquivos, porém é antes de prosseguir com o projeto é necessário que seja feita a estruturação em um padrão de projeto.

Por fim tanto no back quanto no front é necessário refatorar as chamadas de api para que sejam feitas com devido tratamento de erros. 

`A respeito do testes`, foram implementados alguns testes no FRONTEND, porém ainda estão incompletos, e no BACKEND tive contratempo com as documentações dos frameworks para execução dos testes.

Com um pouco mais tempo com certeza o projeto seria concluído adequadamente, sendo que para entrar em produção outros funcionalidades teriam que ser adicionadas, como por exemplo:
  -   Implementação de autenticação por redes sociais;
  -   Implementação do sistema de cartão de crédito, débito e pix;
  -   Implementação de um design mais adequado. 

## Atualizações

`Refatoração`:
  -   Backend: realizado um tratamento de erros inicial e foi posto em arquitetura de camadas baseada em MVC.
  -   Front: realizado a componentização do código e iniciou-se o tratamento de erros.

`Retorno de troco adequado com base nas notas e moedas disponíveis em estoque`: concluído a última funcionalidade da aplicação.

