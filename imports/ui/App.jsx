import React, { PureComponent } from 'react'

import { updatePrices } from '../api/prices'

import Filter from './components/Filter'
import Table from './components/Table'

class App extends PureComponent {
  componentDidMount() {
    updatePrices()
    this.pricesInterval = setInterval(() => {
      updatePrices()
    }, 30000)
  }

  componentWillUnmount() {
    clearInterval(this.pricesInterval)
  }

  render() {
    return (
      <div>
        <Filter />
        <Table />
      </div>
    )
  }
}

export default App
