import React, {Component} from 'react';
import {Text, TouchableHighlight,TextInput,TouchableOpacity , View, Alert,Dimensions,Image} from 'react-native';
import Modal from "react-native-modal";
import { styles } from '../components/styles/DrawerItemStyle' 
import { withNavigation } from 'react-navigation';
import {Button} from 'react-native-elements'
import {addCategory} from '../public/actions/notes'
import {connect} from 'react-redux';


 class CategoryModal extends Component{

  state = {
    isModalVisible: false,
    categoryName:'',
    categoryImageUrl:''
  };
 
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  addCategory = () => {
    const name = this.state.categoryName;
    const image = this.state.categoryImageUrl;
    

    if (name !== '' && image !== '') {
        this.props.dispatch(addCategory({ name,image }));
        //this.toggleModal;
        this.setState({ isModalVisible: !this.state.isModalVisible });
        
    } else {
      alert('fill all required form first!');
        
    }
}
     
  // componentDidMount = () => {
  //   this.toggleModal
  // }
      render() { 
        
        return (
            <View style={{ flex: 1 }}>
            <TouchableOpacity title="Show modal" onPress={this.toggleModal}
            style={styles.FacebookStyle} activeOpacity={0.5}
            >
            <Image
        source={require('../Assets/images/add.png')}
        style={styles.ImageIconStyle}
        /> 
        
            <Modal 
            //animationInTiming={200}
            animationIn='slideInLeft'
            animationOut='slideOutLeft'
            hasBackdrop={true}
            onBackButtonPress={this.toggleModal}
            onBackdropPress={this.toggleModal}

            
            style={{position:'relative',marginLeft:50}}
            isVisible={this.state.isModalVisible}
            >
              <View style={{backgroundColor:'white',height:180,width:285,borderRadius:9}}>
                <TextInput
                
          style={{fontSize:14,borderBottomColor:'#2ED1A2',borderBottomWidth:2,marginLeft:25,marginRight:25,marginBottom:10,marginTop:20}}
          placeholder="Category Name"
          maxLength={50}
          value={ this.state.categoryName}
          onChangeText={(categoryName) => this.setState({categoryName})}
        />

        <TextInput
                
          style={{fontSize:14,borderBottomColor:'#2ED1A2',borderBottomWidth:2,marginLeft:25,marginRight:25}}
          placeholder="Image URL"
          
          value={ this.state.categoryImageUrl}
          onChangeText={(categoryImageUrl) => this.setState({categoryImageUrl})}
        />
        <View style={{flex:1,flexDirection:'row-reverse',paddingTop:15,paddingRight:20,}}>
        <TouchableOpacity style={{marginRight:35}} 
        onPress={this.addCategory} >
        <Text style={{fontSize:18,fontWeight:'bold'}}>Add</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{paddingRight:15}} onPress={this.toggleModal} >
        <Text style={{fontSize:18,fontWeight:'bold'}}>Cancel</Text>
        </TouchableOpacity>
        
        
        </View>
                </View>
            </Modal>
            
            <View style={styles.SeparatorLine} />
        <Text style={styles.TextStyle}>Add Category</Text>
            </TouchableOpacity>
          </View>
        
        );
      }
    }
    const mapStateToProps = ( state ) => {
      return{
          category:state.category
      }
    }
    export default connect(mapStateToProps)(CategoryModal)