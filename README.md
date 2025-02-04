# API de Gestão de Clientes, Vendas, Planos e Serviços

Esta API foi projetada para gerenciar clientes, vendas, planos e serviços, permitindo a criação, consulta, atualização e exclusão desses registros. Além disso, oferece dashboards com estatísticas detalhadas sobre vendas, clientes, planos e serviços.

## Tecnologias Utilizadas

- **AdonisJS 6**: Framework para desenvolvimento de APIs robustas e performáticas.
- **TypeScript**: Garantindo maior segurança e produtividade no desenvolvimento.
- **VineJS**: Biblioteca para validação de dados na API.
- **Japa**: Framework de testes para garantir a qualidade e funcionalidade do código.
- **PostgreSQL**: Banco de dados relacional utilizado para persistência de dados.

## Funcionalidades

### 1. **Clientes**

- **POST /clientes**: Cadastrar um novo cliente (físico ou jurídico).
- **GET /clientes**: Listar todos os clientes com paginação.
- **GET /clientes/{id}**: Buscar um cliente específico.
- **PUT /clientes/{id}**: Atualizar as informações de um cliente.
- **DELETE /clientes/{id}**: Remover um cliente.

### 2. **Vendas**

- **POST /vendas**: Registrar uma nova venda associada a um cliente.
- **GET /vendas**: Listar todas as vendas com filtros opcionais (por cliente, data, etc.).
- **GET /vendas/{id}**: Buscar uma venda específica.
- **PUT /vendas/{id}**: Atualizar uma venda.
- **DELETE /vendas/{id}**: Cancelar uma venda.

### 3. **Planos e Serviços**

- **POST /planos**: Criar um novo plano (restrito a usuários autorizados).
- **GET /planos**: Listar todos os planos.
- **GET /planos/{id}**: Buscar um plano específico.
- **PUT /planos/{id}**: Atualizar um plano.
- **DELETE /planos/{id}**: Excluir um plano.
- **POST /servicos**: Criar um novo serviço.
- **GET /servicos**: Listar todos os serviços.
- **GET /servicos/{id}**: Buscar um serviço específico.
- **PUT /servicos/{id}**: Atualizar um serviço.
- **DELETE /servicos/{id}**: Excluir um serviço.
- \*\*POST /planos/com-ajustes: Criar um plano com perceutal de ajuste para o preço de cada UF
- \*\*POST /servicos/com-ajustes: Criar um servico com perceutal de ajuste para o preço de cada UF

### 4. **Dashboard**

- **GET /dashboard/vendas**: Exibir uma visão geral de vendas (filtros por cliente, plano, período, UF, serviços).
- **GET /dashboard/clientes**: Exibir uma visão geral de clientes cadastrados (filtros por tipo, volume de compras).

## Como Rodar a API

### Pré-requisitos

Antes de rodar a API, certifique-se de ter os seguintes requisitos instalados em sua máquina:

- **Node.js** (versão 16.x ou superior)
- **Yarn** ou **NPM** (gerenciador de pacotes)
- **Docker** e **Docker Compose** (para facilitar a configuração do ambiente)

### 1. Clonar o Repositório

Primeiro, clone o repositório em seu ambiente local:

```bash
git clone https://github.com/seuusuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Usando Docker Compose

#### 2.1 Criar o Arquivo `.env`

Na raiz do projeto, crie um arquivo `.env` com as seguintes variáveis de ambiente:

````ini
# Timezone
TZ=UTC

# General environment variables
HOST=localhost
PORT=3333
NODE_ENV=development
LOG_LEVEL=info
APP_KEY=your_app_key_here

# Postgres database environment variables

POSTGRES_USER=projetoadonis
POSTGRES_PASSWORD=projetosenha
POSTGRES_DB=sales_management
POSTGRES_PORT=5433
POSTGRES_HOST=127.0.0.1

# PGAdmin environment variables
PGADMIN_PORT=5050
PGADMIN_EMAIL=seuemail@gmail.com
PGADMIN_PASSWORD=suasenha

#### 2.2 Subir os Contêineres

Execute o seguinte comando para iniciar os contêineres do AdonisJS e do PostgreSQL:

```bash
docker-compose up --build -d
````

Isso irá:

- Construir e iniciar os contêineres necessários para rodar a aplicação e o banco de dados.
- O contêiner da aplicação estará disponível em `http://localhost:3333`.
- O banco de dados PostgreSQL ficará disponível em `localhost:5432`.

#### 2.3 Rodar as Migrações e Seeders

Após os contêineres estarem em funcionamento, execute as migrações e seeders para configurar as tabelas e dados iniciais:

```bash
node ace migration:run

node ace db:seed
```

#### 2.4 Acessar a API

Com a aplicação em funcionamento, você pode acessar a API através de `http://localhost:3333`.

## Testes Automatizados

A API inclui testes automatizados para garantir que todas as rotas funcionem corretamente.

### 3. Rodar os Testes

Para rodar os testes, execute dentro do container:

```bash
node ace test
```

Ou, caso tenha configurado o ambiente localmente, use o seguinte comando:

```bash
node ace test
```

## Documentação da API

A API está documentada usando a biblioteca **adonis-autoswagger**. Para acessar a documentação interativa e testar os endpoints diretamente, visite:

[Documentação da API](http://localhost:3333/swagger)

> > > > > > > b7fe0674ea422c75637e0be65d9e7898f131db20
