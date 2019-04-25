import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '../imports/redux/store'

import App from '/imports/ui/App'

Meteor.startup(() => {
  render(
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>
        <App />
      </PersistGate>
    </Provider>, 
    document.getElementById('react-target'))
})
