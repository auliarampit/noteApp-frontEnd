import React from 'react';
import {
View,
Text,
Platform,
Dimensions,
StyleSheet,
Image,
TouchableOpacity,
ScrollView,
Alert
}
from 'react-native';

import ModalView from '../components/Modal';
import {getCategory,removeCategory,getNotes} from '../public/actions/notes'
import {connect} from 'react-redux';


const WIDTH = Dimensions.get('window').width;
const HEIGHT= Dimensions.get('window').height;

class MenuDrawer extends React.Component{

    state = {
        category:this.props.category.category
      };
    navLink(nav,text,path,key){
        return(
        <TouchableOpacity key={key}
        delayLongPress={300}
        onLongPress={() => this.deleteCategory(key)}
        
        onPress={() => this.props.dispatch(getNotes('',1,this.props.notes.sorted,text))}
        style={styles.FacebookStyle} activeOpacity={0.5}>
         <Image 
          source={{uri:path}} 
          style={styles.ImageIconStyle} 
          />
         <View style={styles.SeparatorLine} />
         <Text style={styles.TextStyle}>{text}</Text>
       </TouchableOpacity>
        )
    }
    getDataCategory = () => {
        this.props.dispatch(getCategory())
        this.setState({
            category:this.props.category.category
        })
      }

      deleteCategory = (id) => {
        Alert.alert(
          "Delete Category",
          "Are you sure want to delete this category?",
          [{
                  text: "NO", onPress: () => {}
              },
              {
                  text: "YES", onPress: () => {
                    if(id !== ''){
                      //  console.log(ids);
                      this.props.dispatch(removeCategory(id))
                      }
                  }
              }
          ],
          { cancelable: false }
      )
      }

    componentDidMount(){
        this.getDataCategory()
        this.setState({
            category:this.props.notes.category
          })
    }

    render(){
    return(
        <ScrollView>
        <View style={styles.container}>
        <View style={styles.topLink}>
         <Image
        source={require('../Assets/images/profile.jpg')}
        style={{height:100,width:100, borderRadius: 50,alignSelf:'center'}}
        />
         <Text
        style={{fontWeight:'bold',fontSize:18,alignSelf:'center',color:'black',paddingTop:8}}
        >Aulia Rahmat</Text>
        </View>
        <View style={styles.bottomLink}>
        {
    this.props.category.category.map((item, index) => {
        //console.log(item.name);
       return (
        this.navLink('',item.name,item.image,item.id)
       )
     })
   }
        <ModalView/>
        </View>
        </View>
        </ScrollView>
    )
    }
}

const styles=StyleSheet.create ({

    container:{
        flex:1,
        backgroundColor:'white',

    },
    link:{
        flex:1,
        fontSize:20,
        padding:6,
        paddingLeft:14,
        margin:5,
        

    },
    topLink:{
        paddingTop:45,
        height:200,
    },
    bottomLink:{
        flex:1,
        paddingTop:20,
    },
    GooglePlusStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dc4e41',
        borderWidth: .5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 5 ,
        margin: 5,
     },
     FacebookStyle: {
       flexDirection: 'row',
       alignItems: 'center',
       borderWidth: .5,
       borderColor: '#fff',
       height: 40,
       borderRadius: 5 ,
       margin: 5,
     },
     ImageIconStyle: {
        padding: 10,
        margin: 5,
        marginLeft:18,
        height: 25,
        width: 25,
        resizeMode : 'stretch',
     },
     TextStyle :{
       color: "#000",
       marginBottom : 4,
       marginRight :20,
       fontWeight:'bold',
       fontSize:17
     },      
     SeparatorLine :{
     backgroundColor : '#fff',
     width: 1,
     height: 40
     }
})

//export default withNavigation(MenuDrawer);
const mapStateToProps = ( state ) => {
    return{
        notes:state.notes,
        category:state.category
    }
  }
  export default connect(mapStateToProps)(MenuDrawer)