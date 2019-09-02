import React, { Component } from 'react';
import { Picker,StyleSheet,Image,Text, View, TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {addNote,getCategory,editNote} from '../public/actions/notes'



 class Note extends Component {

  constructor(props){
    super(props);
    this.state={
      header: this.props.navigation.state.params.header,
      title: this.props.navigation.state.params.title,
      note : this.props.navigation.state.params.note,
      categoryId: this.props.navigation.state.params.categoryId || 1,
      id : this.props.navigation.state.params.id
      
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { state: { params = {} } } = navigation;
    console.log(navigation.getParam('saveNote'));
    return{
        title:   params.header || '',
        headerTitleStyle: {
            textAlign: 'center',
            flexGrow:1,
            alignSelf:'center',
            fontSize:14,
            
        },
        headerRight: (

         <TouchableOpacity
         onPress={() => 
         params.header=='ADD NOTE'  ? params.addNote() : 
         params.header=='EDIT NOTE' ? navigation.getParam('saveNote')() : alert('nothing')} >
             <Image
             source={require('../Assets/images/checked.png')}
             style={{height:25,width:25,marginRight:17}}/>
           </TouchableOpacity> 
          )}
        }
  
  handleGoBack = () => {
    const {navigation}= this.props; //es6
    navigation.goBack();
  }

  updateNoteTitle = titleNote => {
    this.setState({ titleNote });
  };

  componentDidMount(){
    this.getDataCategory()
    if(this.state.header=='ADD NOTE'){

    this.props.navigation.setParams({
      addNote: this.addNote
    });
    }else{

      this.props.navigation.setParams({
        saveNote: this.saveNote
    });
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    const note = navigation.getParam('note');
    this.setState({ id, note })
    }
  
  }

  addNote = () => {
    const title = this.state.title;
    const note = this.state.note;
    const category= this.state.categoryId;

    if (this.state.text !== '' || category !== '') {
        this.props.dispatch(addNote({ title, note, category }))
        this.props.navigation.pop();
    } else {
      alert(category);
        this.props.navigation.pop()
    }
}

saveNote = () => {
  const note = this.state.note;
  const id = this.state.id;
  const category = this.state.categoryId;
  const title = this.state.title;

      this.props.dispatch(editNote(id, { title,note,category  }));
      this.props.navigation.pop();
}

getDataCategory = () => {
  this.props.dispatch(getCategory())
  
}

 
 
  render() {
    
    return (
      <ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Add Title"
          value={ this.state.title}
          multiline={true}
          onChangeText={(title) => this.setState({title})}
          
        />

        <TextInput
          style={styles.textInput1}
          placeholder="Add Description"
          value={this.state.note}
          multiline={true}
          onChangeText={(note) => this.setState({note})}
          
        />
      </View>
      <View 
      style={{marginLeft:20,marginTop:10}}
      >
        <Text
        style={{fontSize:20,fontWeight:'bold',color:'black'}}
        >CATEGORY</Text>
        <Picker
            selectedValue={this.state.categoryId}
            onValueChange={(categoryId) =>
              this.setState({ categoryId })
          }
  
          style={{height: 50, width: 150}}
        >
     {
       this.props.category.category.map((item, index) => {
         return (
          <Picker.Item label={item.name} value={item.id} key={item.id} />
           //this.navLink('Note', item.name, item.image, item.id)
         )
       })
     }
</Picker>
</View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1, //flexBox CSS
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    inputContainer: {
      paddingTop: 15
    },
    textInput: {
      borderColor: '#CCCCCC',
      height: 141,
      fontSize: 18,
      fontWeight:'bold',
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 40,
    },
    textInput1: {
      borderColor: '#CCCCCC',
      height: 141,
      fontSize: 16,
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 50,
    }
  })

const mapStateToProps = ( state ) => {
  return{
      notes:state.notes,
      category:state.category,
      
  }
}

export default connect(mapStateToProps)(Note)