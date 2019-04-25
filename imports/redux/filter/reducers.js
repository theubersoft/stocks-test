import defaultState from './defaults'
import {
  FILTER_SET_CURRENCY,
  FILTER_SET_PRICE,
  FILTER_ADD_TO_LIST,
  FILTER_REMOVE_FROM_LIST,
} from './actions'

const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case FILTER_SET_CURRENCY:
      return { ...state, currency: action.payload }
    case FILTER_SET_PRICE:
      return { ...state, price: action.payload }
    case FILTER_ADD_TO_LIST:
      if (state.list.includes(action.payload)) {
        return state
      } else {
        return { ...state, list: [...state.list, action.payload] }
      }
    case FILTER_REMOVE_FROM_LIST:
      if (!state.list.includes(action.payload)) {
        return state
      } else {
        return { ...state, list: [...state.list.filter(key => key !== action.payload)] }
      }
    default:
      return state
  }
}

export default reducers