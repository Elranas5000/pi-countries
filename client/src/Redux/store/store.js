import {createStore, applyMiddleware} from "redux" //createStore para crear la store. applyMiddleware para permitir el uso de thunk en este caso
import thunk from "redux-thunk" //thunk para permitir retornar funciones en las actions logrando asincronia
import rootReducer from "../reducers"

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);