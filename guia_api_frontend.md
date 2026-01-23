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
