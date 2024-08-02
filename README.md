# Caju Front End Teste

Esse é um teste para você demonstrar suas experiencia como front end, a aplicação basicamente se divide em duas telas, o `Dashboard` e um `Formulário`.
Voce deverá criar uma plataforma de admissão que permita o usuario adicionar uma admissão com as opções de aprovar, reprovar ou excluir.

O `Dashboard` mostra todas as admissões criadas, com as opções de Aprovar, reprovar, e excluir.

![Screenshot 2024-06-11 at 11 48 24 AM](https://github.com/caju-beneficios/caju-front-teste-1/assets/31169925/fedeff5c-a0d3-4df1-aebd-1f2d25c56a48)

Dashboard com os cards. (Utilize o componente `RegistrationCard`)

![Screenshot 2024-06-11 at 1 52 35 PM](https://github.com/caju-beneficios/caju-front-teste-1/assets/31169925/3b002341-454b-4b24-82cb-6390656b56cc)

O `Formulario` exibe um formulário simples que será utilizado para preencher o dashboard com os dados.

![Screenshot 2024-06-11 at 11 48 47 AM](https://github.com/caju-beneficios/caju-front-teste-1/assets/31169925/bbbb211c-165f-40e5-b2af-61adafd61398)

## Apresentanção do problema

O desafio é melhorar a organização do projeto, refatorar o código e implementar algumas regras e novas funcionalidades(logo abaixo).
Sinta-se a vontade para criar novas pastas, novos utils, contextos, custom hooks, o que achar melhor para deixar o projeto mais organizado e atigir as especificações abaixo.


## Especificações

### Dashboard
  
- Implementar `GET` ao carregar a pagina e ao fazer pequisa por `CPF`
- Filtrar os cards por coluna, usando o status.
- Implementar `PUT` ao clicar em Reprovar e alterar o status para `REPROVED`
- Implementar `PUT` ao clicar em Aprovar e alterar o status para `APPROVED`
- Implementar `PUT` ao clicar em Revisar novamente e alterar o status para `REVIEW`
- Implementar `DELETE` ao clicar no lixeira no card.
- Implementar um loading na tela ao realizar requisições.
- Realizar a requisição automaticamente ao preencher um CPF válido completo
- Atualizar os dados (refetch) ao clicar no icone de atualizar
- Adicionar máscara de CPF no campo de pesquisa.

### Pesquisa por CPF

Para realizar a pesquisa por CPF, utilize essa funcionalidade do json-web-server:
<br/>
https://github.com/typicode/json-server/tree/v0?tab=readme-ov-file#filter

### Formulário

- Implementar validação no campo de `email` para que aceite apenas emails válidos
- Implementar validação no campo `nome completo` para que aceite pelo menos um espaço, no mínimo duas letras, e que a primeira letra não seja um número.
- Implementar validação no campo CPF para aceitar apenas CPFs válidos e adicionar uma máscara de CPF ao campo.
- Implementar `POST` ao preencher todos os campos corretamentes.
- Redirecionar ao `/dashboard` ao criar uma nova registration.

## Regras de negócio

- Implementar tipagem correta e enums em TypeScript.
- Todas as requisições devem ter modal de confirmação da ação
- Todas as requisições devem aparecer uma notificação de sucesso ou erro
- O botão de `Reprovar` e `Aprovar` só deve aparecer em registrations com status `REVIEW` 
- O botão `Revisar novamente` só deve aparecer em registration com status `REPROVED` ou `APPROVED`

## API
Você consumirá uma API mockada localmente, que será executada utilizando o json-server. Para mais informações consulte a [documentação](https://github.com/typicode/json-server/).

Exemplo de Requisição:

```
POST http://localhost:3000/registrations
Content-Type: application/json
{
  "admissionDate": "23/10/2023",
  "email": "maria@caju.com.br",
  "employeeName": "Maria Silva",
  "status": "REVIEW",
  "cpf": "12345678901"
}
```


## Extras (opcional)

- Testes Unitários e de Integração `(Obrigátorio para Senior e Tech Lead)`
- End-to-End (E2E) 
- Documentação detalhada utilizando Storybook e Docusaurus
- Configuração de CI/CD com deploy automatizado

## Dicas e sugestões

- Crie custom hooks para separar a lógica da camada de UI.
- Utilize alguma lib de validação para o formulário
- Crie testes que simulem o comportamento esperado do usuario.

## Desenvolvimento

```shell
git clone https://github.com/caju-beneficios/caju-front-teste-1.git
cd caju-front-test-1
yarn 
yarn dev
```

Abra outro terminal e execute: 
```shell
yarn init:db
```

Para os testes

```shell
yarn test:dev
```
Se tude tiver dado certo as seguintes portas estarão disponiveis:
<br/>

Aplicação http://localhost:3001/
<br/>
Json Web Server http://localhost:3000/

``
Para concluir o desenvolvimento, clone o repositório, faça as edições necessárias e depois envie a URL do novo repositório com suas alterações para o RH.
``


# Project README

Welcome to our React Project! This README will guide you through the structure and organization of our project, ensuring you understand how everything fits together seamlessly. Our architecture is designed with simplicity and scalability in mind, enabling you to quickly grasp the project and contribute effectively.

## Table of Contents

1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Components](#components)
4. [Contexts](#contexts)
5. [Hooks](#hooks)
6. [Mocks](#mocks)
7. [Pages](#pages)
8. [Router](#router)
9. [Services](#services)
10. [Types](#types)
11. [Utils](#utils)
12. [Getting Started](#getting-started)
13. [Conclusion](#conclusion)

## Introduction

Our React project is built with a clear and intuitive architecture, ensuring ease of use and rapid development. With a focus on modularity and reusability, our structure allows for effortless scalability and maintenance.

## Project Structure

Here's an overview of our project structure:

```
src/
  components/
  contexts/
  hooks/
  mocks/
  pages/
  router/
  services/
  types/
  utils/
  App.tsx
  index.css
  main.tsx
  vite-env.d.ts
```

### Components

Our `components` directory houses reusable UI elements, ensuring consistency across the application.

- **Buttons/**: Contains button components.
  - `IconButton.tsx`
  - `index.test.tsx`
  - `index.tsx`
- **ConfirmationModal/**: Modal components for user confirmations.
  - `index.tsx`
  - `styles.ts`
- **CustomToast/**: Custom toast notifications.
  - `index.tsx`
- **Header/**: Application header.
  - `index.tsx`
- **Loading/**: Loading indicators.
  - `index.css`
  - `index.tsx`
- **TextField/**: Custom text fields.
  - `index.tsx`

### Contexts

The `contexts` directory contains context providers for managing global state.

- **RegistrationContext.tsx**: Manages registration-related state.

### Hooks

Custom hooks to encapsulate and reuse logic.

- **useLoading.ts**: Manages loading state.

### Mocks

Mock data for testing and development.

- **listStatus-mock.ts**
- **newUser-mock.ts**

### Pages

The `pages` directory contains the main views of our application.

- **Dashboard/**: Main dashboard view.
  - **components/**: Dashboard-specific components.
    - **Columns/**: Columns for displaying data.
      - `index.tsx`
      - `styles.tsx`
    - **RegistrationCard/**: Cards for displaying registration details.
      - `index.tsx`
      - `styles.tsx`
    - **Searchbar/**: Search bar component.
      - `index.tsx`
      - `styles.tsx`
  - `index.tsx`
  - `styles.tsx`
- **NewUser/**: New user registration view.
  - `index.tsx`
  - `styles.ts`

### Router

Routing configuration for the application.

- **index.tsx**
- **routes.ts**

### Services

Service files for API interactions.

- **axiosConfig.ts**: Axios configuration.
- **registrationService.ts**: Registration-related API calls.

### Types

Type definitions for TypeScript.

- **Registration.ts**
- **StatusEnum.ts**
- **TypeMessageToastEnum.ts**

### Utils

Utility functions for common tasks.

- **admissionDateUtils.ts**
- **cpfUtils.ts**
- **emailUtils.ts**
- **employeeNameUtils.ts**

## Getting Started

Follow these steps to get started with the project:

1. **Clone the repository**: `git clone https://github.com/your-repo/react-project.git`
2. **Install dependencies**: `yarn install`
3. **Run the development server**: `yarn dev`
4. **Build the project**: `yarn build`
5. **Run tests**: `yarn test`

## Conclusion

Our React project is designed to be intuitive, modular, and scalable. By following this architecture, you can quickly understand the structure and start contributing effectively. Enjoy coding and building amazing features!

Feel free to reach out if you have any questions or need further assistance. Happy coding! 🚀