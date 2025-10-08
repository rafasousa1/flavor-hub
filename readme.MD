README.md

# App

FlavorNote.

## Requisitos Funcionais

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar (email e senha);
- [x] Deve ser possível obter o perfil de um usuário logado;

- [x] Deve ser possível cadastrar uma nova receita;
- [x] Deve ser possível buscar uma receita pelo nome;
- [x] Deve ser possível o usuário pode ver os detalhes de uma receita;
- [x] Deve ser possível excluir uma receita;

- [x] Deve ser posível um usuário cadastrar um comentário em uma receita;
- [x] Deve ser possível vizualizar todos os comentários de uma receita;
- [ ] Deve ser possível excluir um comentário;

## Regras de Negócio

- [ ] O usuário não deve se cadastrar com um e-mail existente;
- [ ] O usuário não pode registrar a mesma receita duas vezes;
 
## Requisitos não funcionais

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados precisam estar persistidos em um banco PostgreSQL;
- [ ] O usuário deve ser identificado por um JWT; !