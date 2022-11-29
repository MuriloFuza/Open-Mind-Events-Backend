# Open Mind Events API

## Requisitos

É necessário minimamente para o funcionamento, o NPM ou YARN em conjunto com o docker e docker-compose

## Instalação

Instale todas as dependências com npm ou yarn na raiz do projeto

```bash

  yarn

```

```bash

  npm install

```

## Execução

Execute os containers do docker na raiz do projeto

```bash

  docker-compose up -d

```

Rode a migration para o banco

```bash

npx prisma migrate dev

```

Rode a geração das classes

```bash

npx prisma generate

```

Rodando o código

```bash

yarn run dev

```

## Gerenciamento

Para gerenciar o banco pode se utilizar

```bash

npx prisma studio

```
