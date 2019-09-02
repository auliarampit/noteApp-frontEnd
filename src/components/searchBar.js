import React,{Component} from 'react';
import {View,StyleSheet,TouchableOpacity,Image} from 'react-native';
import {SearchBar} from 'react-native-elements';

const searchBars=({ navigation}) =>{

    return(
        <SearchBar
        placeholder="Search..."
        containerStyle={{marginBottom:10,marginStart:23,marginEnd:23,backgroundColor:'white',borderColor:'white',borderTopColor: 'transparent',borderBottomColor:'transparent',shadowColor:'#000',shadowRadius:15,shadowOffset: { width: 4, height: 13 }, shadowOpacity: 0.8,elevation:6,borderRadius:20,height:45}}
        inputContainerStyle={{backgroundColor:'white',maxHeight:35,marginTop:-3}}
        onChangeText={this.updateSearch}
        onSubmitEditing={this.searchHandle}
        inputStyle={{fontSize:14}}
        placeholderTextColor='#C4C4C4'
        value={search}
        lightTheme={true}
        searchIcon={null}
        
        
      />
    )
}
export default searchBars;