import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import pricesReducers from './prices/reducers'
import filterReducers from './filter/reducers'

const rootReducer = combineReducers({ 
  prices: pricesReducers,
  filter: filterReducers,
})

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: []
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)
