# 📑 Documentação da API: Trabaalho Prático - Backend

Esta API foi projetada para fornecer uma interface escalável e segura para a gestão de produtos, categorias e controle de acesso de usuários, utilizando as melhores práticas de desenvolvimento com **Node.js** e **TypeScript**.

## 🛠️ Stack Tecnológica

* **Runtime:** Node.js (v18+)
* **Linguagem:** TypeScript (Tipagem estática e segurança de código)
* **Framework:** Express.js (Roteamento e Middlewares)
* **ORM:** Sequelize (Abstração e integração com Banco de Dados SQL)
* **Segurança:**
* `bcrypt`: Hash de senhas para armazenamento seguro.
* `jsonwebtoken (JWT)`: Autenticação baseada em tokens.



---

## 📂 Arquitetura do Projeto

A estrutura segue o padrão de **Camadas (Layered Architecture)**, garantindo a separação de responsabilidades e facilitando a manutenção.

```text
└── 📁backend
    └── 📁src
        └── 📁config
            ├── database.ts
        └── 📁controllers
        └── 📁interfaces
            ├── Product.ts
            ├── ProductCategory.ts
            ├── ProductSituation.ts
            ├── Situation.ts
            ├── User.ts
        └── 📁models
        └── 📁utils
        └── 📁services
        ├── server.ts
    ├── .env
    ├── package-lock.json
    ├── package.json
    ├── readme.md
    └── tsconfig.json

```

---

## 🗄️ Modelo de Dados (ER)

O banco de dados é composto por 5 entidades principais. A relação central ocorre no modelo `Product`, que agrega categorias e status.

### Detalhamento das Entidades

| Modelo | Descrição | Atributos Chave |
| --- | --- | --- |
| **User** | Gerenciamento de usuários e acesso. | `email` (Unique), `password` (Hashed), `situation` |
| **Product** | Catálogo principal de itens. | `name`, `ProductCategory_id`, `ProductSituation_id` |
| **ProductCategory** | Classificação dos produtos (Ex: Eletrônicos). | `name` |
| **ProductSituation** | Status do produto (Ex: Ativo, Fora de Linha). | `name` |
| **Situation** | Status global do sistema/usuário (Ex: Ativo, Pendente). | `name` |

---

## 🚀 Endpoints da API

### 🔐 Autenticação (`/auth`)

| Método | Endpoint | Descrição | Proteção |
| --- | --- | --- | --- |
| `POST` | `/login` | Gera o Token JWT para acesso. | Público |
| `POST` | `/logout` | Invalida a sessão atual (client-side). | Privado |

### 📦 Módulos CRUD

Todos os módulos abaixo seguem o padrão RESTful para as entidades: `User`, `Product`, `ProductCategory`, `ProductSituation` e `Situation`.

| Método | Endpoint | Ação |
| --- | --- | --- |
| `GET` | `/{entity}` | Lista todos os registros. |
| `GET` | `/{entity}/:id` | Busca um registro específico por ID. |
| `POST` | `/{entity}` | Cria um novo registro. |
| `PUT` | `/{entity}/:id` | Atualiza os dados de um registro existente. |
| `DELETE` | `/{entity}/:id` | Remove um registro do sistema. |

---

## 🛡️ Regras de Segurança e Requisitos

1. **Proteção de Rotas:** Exceto o login, todas as rotas devem exigir o header `Authorization: Bearer <token>`.
2. **Criptografia:** Senhas nunca devem ser armazenadas em texto simples. O `bcrypt` deve processar a senha antes do `User.create()`.
3. **Tratamento de Erros:** A API deve retornar status codes semânticos (Ex: `401 Unauthorized` para falha de login, `404 Not Found` para IDs inexistentes).
4. **Validação:** Uso de interfaces TypeScript para garantir que o corpo das requisições (`req.body`) contenha todos os campos obrigatórios.

## Conteiner docker

```
docker run --name projeto-baiao -e POSTGRES_DB=api-dev-web -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=123 -p 5432:5432 -d postgres
```
