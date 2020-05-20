"@ngrx/core": "1.2.0",
 1. Provide the core Object Model of NGRX for the application
    1. Store, Reducres, Actions, Events for Reducers 
"@ngrx/effects": "8.6.0",
1. Provides Effects for managing all external / internal Async execution for the application
   1. Effects accepts and monotor Action Execution and returns Action as a result 
"@ngrx/router-store": "8.6.0",
1. Manage the store subscription across all components those are having navigation using Angular Routing
   1. RouterModule to make the store available across routing
"@ngrx/store": "8.6.0",
1. Provides a 'Store' object that contains application state
2. Provides StoreModule, that defines a singleton instance of store
3. Manage the Store updates using reducres
4. Allows to select data from store using 'selector'  
"@ngrx/store-devtools"
 1. Provis the UI as a plugin in browser for NGRX Store Simulation

======================================================================================
NGRX Folder Structure
1. container
   1. component
      1. Folder for Each NG Component
   2. Container will contain the MainComponent that will be bootstraped when the app is loaded
2. actions folder 
   1. File where all actions are defined as exportable actions
   2. index.ts file will import all actions as * and it will be exported (optional)
      1. import * as actions from './actions.ts'
      2. export default actions;
3. reducers
   1. Contain alll reducers 
   2. These functions will accept 'state' as input parameter and retunr modified state.
   3. Reducers will monitor the action being dispatched wither from View (component) or from effects
4. effects
   1. Will define all effeccts for async operations
   2. Effects will be executed based on action that is dispatched and it will return the resultant action
5. selectors
   1. Folder that will define the object schema for selecting / querying data from the store








