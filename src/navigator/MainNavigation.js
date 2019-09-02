import {
    createAppContainer,
} from 'react-navigation'

import {createDrawerNavigator}  from 'react-navigation-drawer'
import createStackNavigator from 'react-navigation-stack'
import Drawer from '../components/Drawer'
import Home from '../screens/Home'
import Note from '../screens/Note'

const AppNavigator = createDrawerNavigator({
    Home,
    Note

}, {
    headerMode: 'none',
    contentComponent: Drawer,
    drawerWidth: 245
})

export default createAppContainer(AppNavigator)