export const SET_PRICES = 'SET_PRICES'

export const Actions = {
  setPrices: (prices) => ({ type: SET_PRICES, payload: { prices } }),
}

export default Actions