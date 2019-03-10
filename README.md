Este projeto foi criando com o [Create React App](https://github.com/facebook/create-react-app).

# Readable Frontend

Este é o projeto web de conteúdo e comentários para o projeto de avaliação final do curso Redux da Udacity. Os usuários poderão postar conteúdo em categorias predefinidas, comentar suas postagens e postagens de outros usuários e votar em postagens e comentários. Os usuários também poderão editar e excluir postagens e comentários.

Esse repositório inclui somente o código do frontend com os frameworks reactstrap, react-router-dom, react-redux e react-icon.

É necessário executar a aplicação servidora, conforme descrito no item "Comece a desenvolver".

## Comece a desenvolver

* Primeiro, execute a aplicação servidora [https://github.com/tarley/readable-api-server]:
	- git clone https://github.com/tarley/readable-api-server.git

* Instale e inicie o servidor conforme README:
	- npm install
	- node server

`IMPORTANTE`: 
O servidor executa na porta 3001, caso deseje alterar essa porta, altere também o apontamento do frontend 
	- readable-frontend/src/utils/Config.js constante "api".

* Para iniciar o desenvolvimento do frontend, neste diretório, instale as dependências e inicie o servidor:
	- `npm install`
	- `npm start`

## Estrutura do projeto

* readable-frontend/src
	- actions: Eventos do Redux
	- components: Componentes do React
		- Comment: Compomentes para o CRUD de comentários.
		- Common: Componentes comuns para todas as funcionalidades da aplicação. Ex: Componente VoteScore utilizado na listagem de postagens, detalhes da postagem, listagem de comentários, edição de comentários.
		- Post: Componentes para o CRUD de Posts.
		- App.js: Layout principal da aplicação, possui as rotas e agrupa todos os demais componentes.
		- Menu.js: Menu principal da aplicação. Aqui estão as funcionalidades de Filtro de post por categoria e ordenação dos posts.
	- reducers: Manipuladores de estado do Redux
	- utils: métodos utilitários, desde auxiliares para as API's de serviços, como Helpers para formatação de data.
		- Config.js: `IMPORTANTE:` Alterar a constante "api" apontando para o servidor correto. [http://localhost:3001] 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
