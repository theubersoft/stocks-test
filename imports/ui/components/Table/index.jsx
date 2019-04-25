import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import './styles.less'

const mapStateToProps = (state) => {
  const { prices, filter } = state

  return { 
    prices,
    filter,
  }
}

import filterActions from '../../../redux/filter/actions'

const mapDispatchToProps = dispatch => {
  const { addToList, removeFromList } = filterActions
  
  return {
    addToList: (key) => {
      return dispatch(addToList(key))
    },
    removeFromList: (key) => {
      return dispatch(removeFromList(key))
    },
  }
}

class Table extends PureComponent {
  state = {
    prices: [],
    selectPrices: [],
    selectValue: undefined,
  }

  componentDidMount() {
    this.updatePrices()
  }

  componentDidUpdate(prevProps) {
    const { prices, filter } = this.props
    const { prices: _prices, filter: _filter } = prevProps

    if (prices !== _prices || filter !== _filter) {
      this.updatePrices()
    }
  }

  updatePrices() {
    const { prices, filter: { list } } = this.props
    const keys = Object.keys(prices)

    const selectPrices = [...keys.filter(key => !list.includes(key)).map(key => ({
      value: key,
      label: key,
    }))]

    this.setState({
      prices: [...keys.filter(key => list.includes(key)).map(key => this.calcPrice(key))],
      selectPrices,
      selectValue: selectPrices[0],
    })
  }

  removePrice = (key) => {
    const { removeFromList } = this.props
    
    removeFromList(key)
  }

  addPrice = () => {
    const { addToList } = this.props
    const { selectValue } = this.state
    
    addToList(selectValue.value)
  }

  calcPrice(key) {
    const { prices, filter: { price, currency } } = this.props

    let value

    if (currency !== key) {
      value = price * prices[key] / prices[currency]
    } else {
      value = price
    }

    return {
      name: key,
      price: isNaN(value) ? 0 : value.toFixed(2),
    }
  }

  priceForSelect() {
    const { selectValue } = this.state

    return selectValue ? this.calcPrice(selectValue.value).price : 0
  }

  render() {
    const { prices, selectPrices, selectValue } = this.state

    return (
      <Fragment>
        <div className="Table__cont">
          <div className="Table__row Table__row_select">
            <div className="Table__price">{ this.priceForSelect() }</div>
            <div className="Table__name Table__name_select">
              <Select 
                className="Table__select" 
                options={ selectPrices }
                value={ selectValue }
                onChange={ (option) => this.setState({
                  selectValue: option
                }) }
              />
            </div>
            <button 
              className="Table__button"
              onClick={ this.addPrice }
            >+</button>
          </div>
          { prices.map(({ name, price }, index) => (
            <div 
              key={ index }
              className="Table__row"
            >
              <div className="Table__price">{ price }</div>
              <div className="Table__name">{ name }</div>
              <button 
                className="Table__button Table__button_remove"
                onClick={ () => this.removePrice(name) }
              >+</button>
            </div>
          )) }
        </div>
      </Fragment>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Table)