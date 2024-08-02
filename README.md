# Projeto README

Bem-vindo ao nosso Projeto React! Este README guiará você pela estrutura e organização do nosso projeto, garantindo que você entenda como tudo se encaixa perfeitamente. Nossa arquitetura é projetada com simplicidade e escalabilidade em mente, permitindo que você entenda o projeto rapidamente e contribua efetivamente.

## Índice

1. [Introdução](#introdução)
2. [Estrutura do projeto](#estrutura-do-projeto)
3. [Componentes](#componentes)
4. [Contextos](#contextos)
5. [Ganchos](#ganchos)
6. [Simulações](#simulações)
7. [Páginas](#páginas)
8. [Roteador](#roteador)
9. [Serviços](#serviços)
10. [Tipos](#tipos)
11. [Utilitários](#utilitários)
12. [Introdução](#introdução-do-projeto)
13. [Conclusão](#conclusão)

## Introdução

Nosso projeto React é construído com uma arquitetura clara e intuitiva, garantindo facilidade de uso e desenvolvimento rápido. Com foco em modularidade e reutilização, nossa estrutura permite escalabilidade e manutenção sem esforço.

## Estrutura do projeto

Aqui está uma visão geral da estrutura do nosso projeto:

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

### Componentes

Nosso diretório `components` abriga elementos de IU reutilizáveis, garantindo consistência em todo o aplicativo.

- **Buttons/**: contém componentes de botão.
- `IconButton.tsx`
- `index.test.tsx`
- `index.tsx`
- **ConfirmationModal/**: componentes modais para confirmações do usuário.
- `index.tsx`
- `styles.ts`
- **CustomToast/**: notificações toast personalizadas.
- `index.tsx`
- **Header/**: cabeçalho do aplicativo.
- `index.tsx`
- **Loading/**: Indicadores de carregamento.
- `index.css`
- `index.tsx`
- **TextField/**: Campos de texto personalizados.
- `index.tsx`

### Contextos

O diretório `contexts` contém provedores de contexto para gerenciar o estado global.

- **RegistrationContext.tsx**: Gerencia o estado relacionado ao registro.

### Hooks

Hooks personalizados para encapsular e reutilizar a lógica.

- **useLoading.ts**: Gerencia o estado de carregamento.

### Mocks

Dados simulados para teste e desenvolvimento.

- **listStatus-mock.ts**
- **newUser-mock.ts**

### Pages

O diretório `pages` contém as principais visualizações do nosso aplicativo.

- **Dashboard/**: Visualização do painel principal.
- **components/**: Componentes específicos do painel.
- **Columns/**: Colunas para exibir dados.
- `index.tsx`
- `styles.tsx`
- **RegistrationCard/**: Cartões para exibir detalhes do registro.
- `index.tsx`
- `styles.tsx`
- **Searchbar/**: Componente da barra de pesquisa.
- `index.tsx`
- `styles.tsx`
- `index.tsx`
- `styles.tsx`
- **NewUser/**: Nova visualização de registro de usuário.
- `index.tsx`
- `styles.ts`

### Router

Configuração de roteamento para o aplicativo.

- **index.tsx**
- **routes.ts**

### Services

Arquivos de serviço para interações de API.

- **axiosConfig.ts**: Configuração do Axios.
- **registrationService.ts**: Chamadas de API relacionadas ao registro.

### Types

Definições de tipo para TypeScript.

- **Registration.ts**
- **StatusEnum.ts**
- **TypeMessageToastEnum.ts**

### Utils

Funções utilitárias para tarefas comuns.

- **admissionDateUtils.ts**
- **cpfUtils.ts**
- **emailUtils.ts**
- **employeeNameUtils.ts**

## Getting Started

Siga estas etapas para começar o projeto:

1. **Clone o repositório**: `git clone https://github.com/your-repo/react-project.git`
2. **Instale dependências**: `yarn install`
3. **Execute o servidor de desenvolvimento**: `yarn dev`
4. **Crie o projeto**: `yarn build`
5. **Execute testes**: `yarn test`

## Conclusão

Minha solução em  React foi projetado para ser intuitivo, modular e escalável. Ao seguir esta arquitetura, você pode entender rapidamente a estrutura e começar a contribuir efetivamente. Divirta-se codificando e construindo recursos incríveis!

Sinta-se à vontade para entrar em contato se tiver alguma dúvida ou precisar de mais assistência. Boa codificação! 🚀