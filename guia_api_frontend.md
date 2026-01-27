# Guia da API para o Frontend

Este documento fornece as informações essenciais para o desenvolvimento do frontend se conectar com a API do backend.

## Informações Gerais

- **Base URL:** `http://localhost:5000`

## Fluxo de Autenticação

O acesso à maioria dos endpoints requer um token JWT, que é obtido através do processo de login.

### 1. Registro de Usuário

Primeiro, um usuário deve ser registrado. Existem dois perfis: `responsavel` e `escola`.

**Endpoint de Registro de Responsável:**
- **Método:** `POST`
- **Path:** `/register/responsavel`
- **Request Body:**
  ```json
  {
    "nome": "Nome do Responsável",
    "email": "responsavel@email.com",
    "senha": "uma_senha_forte"
  }
  ```
- **Success Response (201):**
  ```json
  {
    "message": "Responsável criado com sucesso!",
    "responsavel_id": "66a0b1c2d3e4f5a6b7c8d9e0"
  }
  ```

**Endpoint de Registro de Escola:**
- **Método:** `POST`
- **Path:** `/register/escola`
- **Request Body:**
  ```json
  {
    "nome": "Usuário da Escola",
    "email": "escola@email.com",
    "senha": "uma_senha_forte"
  }
  ```

### 2. Login

Após o registro, o usuário pode fazer login para obter um token de acesso.

- **Método:** `POST`
- **Path:** `/login`
- **Request Body:**
  ```json
  {
    "email": "usuario@email.com",
    "senha": "uma_senha_forte",
    "perfil": "responsavel" 
  }
  ```
  *O campo `perfil` pode ser `"responsavel"` ou `"escola"`.*

- **Success Response (200):**
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### 3. Enviando o Token

O `access_token` recebido deve ser incluído no cabeçalho `Authorization` de todas as requisições a endpoints protegidos.

- **Formato do Cabeçalho:** `Authorization: Bearer <seu_token_aqui>`

---

## Referência dos Endpoints

### Alunos

**Criar Aluno**
- **Método:** `POST`
- **Path:** `/aluno`
- **Request Body:**
  ```json
  {
    "nome": "Nome do Aluno",
    "ano": 5,
    "ensino": "fundamental",
    "responsavel_ids": ["66a0b1c2d3e4f5a6b7c8d9e0"]
  }
  ```
- **Success Response (201):**
  ```json
  {
    "message": "Aluno criado com sucesso!",
    "aluno_id": 1
  }
  ```

**Listar Todos os Alunos**
- **Método:** `GET`
- **Path:** `/alunos`
- **Success Response (200):**
  ```json
  [
    {
      "aluno_id": 1,
      "nome": "Nome do Aluno",
      "ano": 5,
      "ensino": "F",
      "responsavel_ids": ["66a0b1c2d3e4f5a6b7c8d9e0"],
      "id": "66a0b1c2d3e4f5a6b7c8d9e1"
    }
  ]
  ```

### Avisos

**Criar Aviso**
- **Método:** `POST`
- **Path:** `/avisos`
- **Request Body:**
  ```json
  {
    "aluno_id": 1
  }
  ```
- **Success Response (201):**
  ```json
  {
    "message": "Aviso criado com sucesso!"
  }
  ```

**Listar Avisos (com filtro)**
- **Método:** `GET`
- **Path:** `/avisos`
- **Query Params (Opcional):** `?status=true` (para ativos) ou `?status=false` (para finalizados)
- **Success Response (200):**
  ```json
  [
    {
      "id": "66a0b1c2d3e4f5a6b7c8d9e2",
      "aluno_id" : "66a0b1c2d3e4f5a6b7c8d9e1",
      "status" : false,
      "criado_em" : "2026-01-21T18:51:02.961000",
      "finalizado_em" : "2026-01-21T18:52:05.593000",
      "emergencia" : false
    }
  ]
  ```

**Finalizar Aviso**
- **Método:** `PATCH`
- **Path:** `/avisos/finalizar`
- **Request Body:**
  ```json
  {
    "aluno_id": 1
  }
  ```
- **Success Response (200):**
  ```json
  {
    "message": "Aviso finalizado."
  }
  ```
# Análise de Telas Necessárias para o Frontend

Com base no **Guia da API**, abaixo está a análise das **páginas, fluxos e telas** que o frontend precisará implementar para consumir corretamente o backend.

---

## 1️⃣ Telas Públicas (Sem Autenticação)

### 🏠 Home / Landing Page
**Objetivo:**
- Apresentar o projeto
- Explicar para quem é o sistema
- Servir como ponto de entrada

**Elementos:**
- Texto institucional / explicação do projeto
- Botão **Login**
- Botão **Cadastrar Responsável**
- (Opcional futuramente) Botão **Cadastrar Escola**

**Observação:**
- Não consome API diretamente
- Login e cadastro abrem em **dialogs/modais**

---

### 🔐 Dialog de Login
**Endpoint usado:**
- `POST /login`

**Campos:**
- Email
- Senha
- Perfil (`responsavel` ou `escola`)

**Comportamento:**
- Recebe `access_token`
- Salva token (localStorage ou cookie)
- Redireciona conforme perfil:
  - `responsavel` → Área do Responsável
  - `escola` → Área da Escola

---

### 📝 Dialog de Registro – Responsável
**Endpoint usado:**
- `POST /register/responsavel`

**Campos:**
- Nome
- Email
- Senha

**Pós-sucesso:**
- Login automático **ou**
- Mensagem de sucesso + convite para login

---

## 2️⃣ Telas Autenticadas – Responsável

> Todas as telas abaixo exigem envio do JWT no header  
> `Authorization: Bearer <token>`

---

### 👨‍👩‍👧 Dashboard do Responsável
**Objetivo:**
- Visão geral do responsável logado

**Endpoint usado:**
- `GET /alunos`

**Elementos:**
- Lista de alunos vinculados
- Botão **Cadastrar Aluno**
- (Opcional) Indicador se há avisos ativos

---

### ➕ Cadastro de Aluno (Tela ou Modal)
**Endpoint usado:**
- `POST /aluno`

**Campos:**
- Nome
- Ano
- Ensino
- Responsável (normalmente implícito pelo login)

**Comportamento:**
- Após sucesso:
  - Atualiza lista de alunos
  - Exibe feedback visual

---

### 🔔 Avisos do Aluno (Opcional)
**Objetivo:**
- Permitir ao responsável acompanhar avisos

**Endpoint usado:**
- `GET /avisos`
- Filtro por `status=true | false`

**Observação:**
- Não é essencial no MVP, mas a API já suporta

---

## 3️⃣ Telas Autenticadas – Escola

---

### 🏫 Dashboard da Escola
**Objetivo:**
- Visão geral operacional

**Endpoints usados:**
- `GET /avisos`
- `GET /alunos`

**Elementos:**
- Cards de resumo:
  - Avisos ativos
  - Avisos finalizados
  - Total de alunos
- Lista rápida de avisos ativos

---

### 🚨 Tela de Avisos
**Objetivo:**
- Gerenciar avisos

**Endpoints usados:**
- `GET /avisos?status=true`
- `GET /avisos?status=false`
- `PATCH /avisos/finalizar`

**Elementos:**
- Filtro:
  - Ativos
  - Finalizados
- Cada aviso mostra:
  - Aluno
  - Data de criação
  - Status
  - Botão **Finalizar Aviso** (se ativo)

---

### 👩‍🎓 Tela de Alunos (Escola)
**Objetivo:**
- Visualizar alunos cadastrados no sistema

**Endpoint usado:**
- `GET /alunos`

**Elementos:**
- Lista ou tabela com:
  - Nome
  - Ano
  - Ensino
- Base para criação de avisos futuramente

---

## 4️⃣ Mapa Geral de Páginas

```text
Público
├── Home / Landing
│   ├── Dialog Login
│   └── Dialog Registro Responsável

Responsável (logado)
├── Dashboard do Responsável
│   ├── Lista de Alunos
│   └── Cadastrar Aluno (modal ou página)
└── (Opcional) Avisos do Aluno

Escola (logada)
├── Dashboard da Escola
├── Avisos
│   ├── Ativos
│   └── Finalizados
└── Alunos