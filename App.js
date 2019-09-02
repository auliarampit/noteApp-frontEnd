import React,{Component} from 'react';
import MainNavigator from './src/navigator/MainNavigation'

import { Provider } from 'react-redux'
import store from './src/public/store'

class App extends Component {

  render () {
    return (
      <Provider store = {store}>
        <MainNavigator screenProps={this.state} />
     </Provider>
    )
  }
}

export default App