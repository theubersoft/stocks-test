export const FILTER_SET_PRICE = 'FILTER_SET_PRICE'
export const FILTER_SET_CURRENCY = 'FILTER_SET_CURRENCY'
export const FILTER_ADD_TO_LIST = 'FILTER_ADD_TO_LIST'
export const FILTER_REMOVE_FROM_LIST = 'FILTER_REMOVE_FROM_LIST'

export const Actions = {
  setPrice: (price) => ({ type: FILTER_SET_PRICE, payload: price }),
  setCurrency: (currency) => ({ type: FILTER_SET_CURRENCY, payload: currency }),
  addToList: (key) => ({ type: FILTER_ADD_TO_LIST, payload: key }),
  removeFromList: (key) => ({ type: FILTER_REMOVE_FROM_LIST, payload: key }),
}

export default Actions