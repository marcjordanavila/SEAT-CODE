# SEAT-CODE challenge

I have used React with Typescript to resolve the challange. I also have used Bootstrap as a CSS library and some custom css styles to improve the UI.

I have done a table, that contains information about cities. The user can create, remove, sort or search cities.

The solution includes:

- JSON server.
- Redux as a state manager.

The structure of the project is:

- /backend -> contains DB information.
- /src -> contains al the front-end project.
- /src/components -> contains the components the user can interact with.
- /src/core -> contains all http request (I put all the request in the same file because it's easier to find and change configuration, for exemple change the url)
- /src/model -> contains all data models of the project.
- /src/redux -> this folder contain all redux configurations (I follow this structure because I think it's easier to find the actions, the reducers and the store if all of them are in the same folder).
- /src/redux/actions -> contains all actions that dispatch the reducers and a template of the diferents types of actions.
- /src/redux/reducer -> contains the reducers.
- /src/redux/store -> contains the store

The principal finalty of this project structure is to make easier to mantain and to find all the functionalities.

How to start the project once you have downloaded the code from git:

1. Open a terminal.
2. Run -> npm install
3. Run -> npm run start-db
4. Run -> npm start
