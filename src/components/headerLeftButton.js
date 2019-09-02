import React from 'react';
import {View,StyleSheet,TouchableOpacity,Image} from 'react-native';
import { withNavigation, DrawerActions,NavigationAction } from 'react-navigation'

class HeaderLeftButton extends React.Component {
    toggleDrawer = () => {
        this.props.navigation.toggleDrawer()
      }

   render(){
    return(
        <TouchableOpacity 
    onPress={this.toggleDrawer}
    >
      <Image
        source={require('../Assets/images/profile.jpg')}
        style={{height:32,width:31,marginLeft:17}}
        />
    </TouchableOpacity>
    )
    }
}

export default withNavigation(HeaderLeftButton);