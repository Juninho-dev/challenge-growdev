# 🗺 Desafio "Growdev"

<h1 align="center">
    <img alt="Growdev logo" src="./assets/logo_growdev.svg" height="100px" />
    <br/>
   <a href="https://nodejs.org" target="_blank" rel="noopener">Node.JS</a> | <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue.JS</a> 
</h1>

<p align="center">
  <img alt="Develop by" src="https://img.shields.io/badge/Develop%20&%20Made%20by-Juniel-blue?style=flat&logo=Awesome-Lists">
  <img alt="GitHub last commit" src="https://img.shields.io/badge/Made%20with-TypeScript-1f425f.svg?logo=typescript">
</p>

<h3 align="center">
  <a href="#-sobre">Sobre o projeto</a>
  <span> · </span>
  <a href="#-tecnologias-utilizadas">Tecnologias utilizadas</a>
  <span> · </span>
  <a href="#-primeiros-passos">Primeiros passos</a>
  <span> · </span>
  <a href="#-padroes-contribuir">Padrões do projeto</a>
</h3>

## 💭 Sobre

O desafio consiste em uma aplicação onde seja possível realizar a matrícula dos alunos na turma de programação web da instituição `Edtech`.

---

## 👨‍💻 Tecnologias Utilizadas

- <a href="https://nodejs.org" target="_blank" rel="noopener">Node.JS</a>;
- <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue.JS</a>;
- <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener">TypeScript</a>.
- <a href="https://vuetifyjs.com" target="_blank" rel="noopener">Vuetify</a>.
- <a href="https://www.prisma.io/" target="_blank" rel="noopener">Prisma 10</a>.
- <a href="https://expressjs.com/" target="_blank" rel="noopener">Express.JS</a>.
- <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite.JS</a>.
- <a href="https://www.cypress.io/" target="_blank" rel="noopener">Cypress</a>.

---

## ⁉ Primeiros passos

### 🤔 Pré-requisitos

Para conseguir utilizar o projeto e contribuir nele, basta seguir as instruções abaixo:

- O **<a href="https://nodejs.org/en/" target="_blank" rel="noopener">Node.js</a>** é **OBRIGATÓRIO** para executar esse projeto e é **RECOMENDADO** usar a versão LTS.
- O **<a href="https://www.npmjs.com/" target="_blank" rel="noopener">NPM</a>** ou **<a href="https://yarnpkg.com/" target="_blank" rel="noopener">Yarn</a>** são **OBRIGATÓRIO** para o gerenciamento dos pacotes da aplicação.
- O **<a href="https://git-scm.com/" target="_blank" rel="noopener">Git</a>** é **OBRIGATÓRIO** para o controle de versão do projeto.

---

### 📝 Passo a passo

Primeiro clone o repositório em seu computador, por meio do terminal utilizando o comando:

1. Clonando o repositório

```sh
  # Clone o repositório
  $ git clone https://github.com/Juninho-dev/challenge-growdev.git
  # Entre na pasta raiz da aplicação
  $ cd challenge-growdev
```

2. Iniciando o Projeto

```sh
  # Instale as dependências da aplicação web
  $ cd web && yarn # ou npm install
  # Execute o comando abaixo para iniciar o projeto
  $ yarn dev

  # Instale as dependências da aplicação api
  $ cd api && yarn # ou npm install
  # Execute o comando abaixo para iniciar o servidor
  $ yarn dev
```
---
## 💯 Padrões do projeto

- SOLID
- MVC
- Repository Pattern

 ---
### Documentação da arquitetura
O projeto esta dividido em:
- **Controller**
- **Middleware**
- **Repositories**
- **Validators**
- **Routes**
- **Helpers**

## Controller
A camada Controller atua como intermediária entre as solicitações enviadas pelo Front-end e as respostas fornecidas pelo Model, processando os dados inseridos pelo usuário e transmitindo-os para outras camadas. Essa camada é fundamental para a estruturação da arquitetura MVC (Model-View-Controller).
## Middleware
Este componente é encarregado de filtrar as requisições e manipular as informações recebidas. Foram desenvolvidos dois middlewares: o primeiro, denominado authenticateToken, tem a responsabilidade de verificar se o usuário está autenticado na plataforma; o segundo, denominado errorMiddleware, trata os erros da aplicação seguindo o padrão apiMessage.
## Repositories
Responsável por implementar as lógicas de negócio relacionadas aos modelos de banco de dados.
## Validators
Responsável por receber, tratar e validar as informações provenientes do Front-end.
## Routes
Responsável por definir e gerenciar todas as rotas da API.
## Helpers
Criado para desenvolver funções que podem ser reutilizadas em várias partes do código, visando manter a base do código organizada e legível.

---
### 🚧 Lista de Atividades

#### TO DO API
- [x] Adding ORM `Prisma 10`.
- [x] Create `Repository Pattern` module.
- [x] Use `SOLID` Arquiteture.
- [x] Create auth routes.
- [x] Create `Middleware` authenticate.
- [x] Implementing tratative errors.
- [x] Use the default response api.
- [x] Create students routes.
- [ ] Create `swagger` documentation.
- [x] Create tests integration.


#### TO DO WEB
- [x] Install `vuetify` and config theme colors.
- [x] Create Login page.
- [x] Create Register page.
- [x] Create Dashboard page.
- [x] Create Students page.
- [x] Configure `vue-router`.
- [x] Configure `cypress` and automatized tests.
- [x] Create middleware authenticate private routes.
- [x] Adding `sweet-alert2` for return messages in application.
- [x] Install axios and configure `api.ts`

---

<sup> Feito com 💙 por 👾<a href="https://github.com/juninho-dev/" target="_blank" rel="noopener">Juniel</a> ® 2024.</sup>
