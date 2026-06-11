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

---

## 📋 Patch Notes

### v1.1.0 — Recuperação de senha (Jun/2026)

Implementação do fluxo de recuperação de senha com envio de código por e-mail via **Nodemailer** e **Mailtrap**.

#### Novos endpoints (públicos)

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `POST` | `/api/users/recovery-password` | Recebe o e-mail do usuário, envia código OTP de 6 dígitos por e-mail e retorna um `uuid` para identificar a solicitação. |
| `POST` | `/api/users/set-new-password/:uuid` | Recebe o código (do e-mail) e a nova senha; valida e atualiza a senha do usuário. |

#### Fluxo de uso

1. Cliente chama `POST /api/users/recovery-password` com `{ "email": "usuario@email.com" }`.
2. Se o e-mail estiver cadastrado, a API envia um código de 6 dígitos (válido por **15 minutos**) e retorna `{ "uuid": "...", "message": "..." }`.
3. Cliente chama `POST /api/users/set-new-password/:uuid` com `{ "code": "123456", "password": "novaSenha123" }`.
4. Senha atualizada com sucesso; o token de recuperação é invalidado após o uso.

#### Arquivos adicionados

* `src/models/PasswordResetToken.ts` — persistência dos tokens de recuperação (`password_reset_tokens`).
* `src/interfaces/PasswordResetToken.ts`
* `src/services/EmailService.ts` — envio de e-mails via SMTP (Mailtrap).
* `src/services/PasswordRecoveryService.ts` — lógica de solicitação e redefinição de senha.

#### Dependências

* `nodemailer` — envio de e-mails.
* `uuid` — geração do identificador único da solicitação (`uuid` v4).

#### Variáveis de ambiente

```env
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=<usuario-smtp-do-mailtrap>
MAILTRAP_PASS=<senha-ou-token-smtp>
MAIL_FROM=Projeto Baiao <noreply@projeto-baiao.local>
```

#### Segurança

* Código OTP armazenado com hash (`bcrypt`), assim como a senha do usuário.
* Resposta genérica quando o e-mail não existe (não revela se a conta está cadastrada).
* Tokens anteriores do mesmo usuário são invalidados ao criar uma nova solicitação ou ao concluir o reset.
* Nova senha exige no mínimo **8 caracteres**.

#### Postman

Os requests **Recovery Password** e **Set New Password** foram adicionados à pasta **Auth** em `postman-collection.json`. A variável `recoveryUuid` é preenchida automaticamente após a solicitação de recuperação.

---

## Conteiner docker

```
docker run --name projeto-baiao -e POSTGRES_DB=api-dev-web -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=123 -p 5432:5432 -d postgres
```
