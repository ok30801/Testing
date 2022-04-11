import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {combineReducers, createStore, applyMiddleware} from 'redux'
import questionsReducer from './redux/Reducers/questionsReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {PersistGate} from 'redux-persist/integration/react'
import './index.css'

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['questions']
}

let rootReducer = combineReducers({
  questions: questionsReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
export let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
export let persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,

  document.getElementById('root')
)
reportWebVitals();
