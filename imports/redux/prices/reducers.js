import defaultState from './defaults'
import {
  SET_PRICES,
} from './actions'

const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PRICES:
      return { ...state, ...action.payload.prices }
    default:
      return state
  }
}

export default reducers