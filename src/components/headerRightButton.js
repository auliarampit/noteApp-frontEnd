import React from 'react';
import { Image,StyleSheet, TouchableOpacity} from "react-native";
import {withNavigation} from 'react-navigation';
import Menu, {MenuItem} from "react-native-material-menu";
import {connect} from 'react-redux';
import {getSearchNotes,changeSort,getNotes} from '../public/actions/notes';

class HeaderRButton extends React.Component {
  _menu = null;

  setMenuRef = ref => {
      this._menu = ref;
  };

  hideMenu = (sort) => {
    this.props.dispatch(changeSort(sort))
    this.props.notes.searchKeyword!=="" ? 
    this.props.dispatch(getSearchNotes(this.props.notes.searchKeyword,1,sort)) :
    this.props.dispatch(getNotes(this.props.notes.searchKeyword,1,sort,this.props.notes.selectedCategory))
      this._menu.hide();
      
  };

  showMenu = () => {
      this._menu.show();
  };


 render(){
  return(
    <Menu
        ref={(ref) => this._menu = ref}
        button={
        <TouchableOpacity onPress={() => this._menu.show()} style={{paddingHorizontal:16, height: '100%', alignItems:'center', justifyContent: 'center'}}>
          <Image source={require('../Assets/images/sort.png')} style={{width: 20, height: 20, alignSelf:'center'}} resizeMode='contain'/>
        </TouchableOpacity>
      }>
       {/* <MenuItem onPress={() => this.hideMenu('ASC')} hidemenu={this.hideMenu} textStyle={styles.MenuItems}>ASCENDING</MenuItem> */}
       <MenuItem onPress={() => this.hideMenu('ASC')} textStyle={styles.MenuItems}>ASCENDING</MenuItem>
       <MenuItem onPress={() => this.hideMenu('DESC')} textStyle={styles.MenuItems}>DESCENDING</MenuItem>
    </Menu>
    
  )
  }
}

const styles= StyleSheet.create({
  MenuItems:{
    color:'#000',
    fontSize:16,
    fontWeight:'bold'
  }
});

const mapStateToProps = ( state ) => {
  return{
      notes:state.notes
  }
}
export default connect(mapStateToProps)(HeaderRButton)