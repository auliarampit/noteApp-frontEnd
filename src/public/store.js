import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import promisemiddleware from 'redux-promise-middleware'

import reducers from './reducers/index'

const logger = createLogger();

const store = createStore(reducers, applyMiddleware(logger, promisemiddleware))

export default store