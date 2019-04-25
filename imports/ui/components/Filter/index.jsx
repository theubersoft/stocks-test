import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import './styles.less'

const mapStateToProps = (state) => {
  const { prices, filter: { price, currency } } = state

  return { 
    prices,
    price,
    currency,
  }
}

import filterActions from '../../../redux/filter/actions'

const mapDispatchToProps = dispatch => {
  const { setPrice, setCurrency } = filterActions
  
  return {
    setPrice: (price) => {
      return dispatch(setPrice(price))
    },
    setCurrency: (currency) => {
      return dispatch(setCurrency(currency.value))
    },
  }
}

class Filter extends PureComponent {
  state = {
    prices: [],
  }

  componentDidMount() {
    this.updatePrices()
  }
  
  componentDidUpdate(prevProps) {
    const { prices } = this.props
    const { prices: _prices } = prevProps

    if (prices !== _prices) {
      this.updatePrices()
    }
  }

  updatePrices() {
    const { prices } = this.props
    const keys = Object.keys(prices)

    this.setState({
      prices: [...keys.map(key => ({ 
        value: key, 
        label: key,
      }))]
    })
  }

  priceChange = () => {
    const { setPrice } = this.props
    let value = +this.priceInput.value

    if (value < 0) {
      value = 0
    }

    setPrice(value)
  }

  currencySelect = (option) => {
    const { setCurrency } = this.props

    setCurrency(option)
  }

  render() {
    const { price, currency } = this.props
    const { prices } = this.state

    return (
      <div className="Filter__cont">
        <input 
          ref={ ref => this.priceInput = ref }
          className="Filter__input"
          type="number" 
          defaultValue={ price } 
          onChange={ this.priceChange }
          onBlur={ () => this.priceInput.value = price }
        />
        <Select 
          className="Filter__select"
          options={ prices } 
          defaultValue={ { value: currency, label: currency } } 
          onChange={ this.currencySelect }
        />
      </div>
    )
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Filter)