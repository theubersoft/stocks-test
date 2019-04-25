import { HTTP } from 'meteor/http'
import { store } from '../redux/store'
import { SET_PRICES } from '../redux/prices/actions'

const API_URL = 'https://api.exchangeratesapi.io'
const BASE = 'USD'

export function updatePrices() {
  HTTP.get(`${ API_URL }/latest?base=${ BASE }`, (error, response) => {
    if (error) {
      console.error('ERROR: updatePrices', error)
      return
    }

    const prices = JSON.parse(response.content)

    if (!prices.rates) {
      console.error('ERROR: updatePrices, no rates', prices, response)
      return
    }

    store.dispatch({
      type: SET_PRICES,
      payload: {
        prices: prices.rates,
      }
    })
  })
}