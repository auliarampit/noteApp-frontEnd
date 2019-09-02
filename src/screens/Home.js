import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native'
import {
    SearchBar,
    Card,
    
} from 'react-native-elements'
import { FloatingAction } from 'react-native-floating-action'
import { connect } from 'react-redux'
import {getNotes,removeNote,getSearchNotes,getMoreNotes} from '../public/actions/notes'
import Note from './Note';
import HeaderLeftButton from '../components/headerLeftButton'
import HeaderRightButton from '../components/headerRightButton'
import Search  from '../components/searchBar'
import moment from 'moment'
import { debounce, throttle } from 'throttle-debounce'


class Home extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            title: 'ADD NOTE',
            noteTitle: '',
            Description: '',
            category: '',
            page: 1,
            id: 0
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
            return {
                title: 'NOTE APP',
                headerTitleStyle: {
                    textAlign: 'center',
                    flexGrow: 1,
                    alignSelf: 'center',
                    fontSize: 14,
                },
                headerRight: (
                    <HeaderRightButton />
                ),
                headerLeft: (
                    <HeaderLeftButton />
                )
            }
    }
    updateSearch = (search) => {
        this.setState({search:search})
        this.getSearchData(search)
    }
    updateTitle = titles => {
        state = {title: titles}
    }

    componentDidMount() {
        this.getData()
    }
    getData = (search, sort) => {
        this.setState({
            page: 1
        })
        search = search == undefined ? '' : search
        this.props.dispatch(getNotes(search, 1, sort))
    }
    getMoreData = (search, page, sort, category) => {
        search = search == undefined ? '' : search
        this.props.dispatch(getMoreNotes(search, page, this.props.notes.sorted, category))
    }
    getSearchData = (search,page) => {
        search = search==undefined ? '' : search
      this.props.dispatch(getSearchNotes(search,page,this.props.notes.sorted))
    }
    handleLoadMore = (sort) => {
        if(this.props.notes.currentPage < this.props.notes.totalPage) {
            this.getMoreData(this.props.notes.searchKeyword, this.props.notes.currentPage + 1, sort, this.props.notes.selectedCategory)
        }
    }
    deleteNote = (id) => {
        Alert.alert(
          "Delete Note",
          "Are you sure want to delete note?",
          [
              {
                  text: "NO", onPress: () => {
                      
                  }
              },
              {
                  text: "YES", onPress: () => {
                    if(id!==''){
                      //  console.log(ids);
                      this.props.dispatch(removeNote(id))
                      }
                  }
              }
          ],
          { cancelable: false }
      )
      }

    renderItem = ({ item, index }) => (
        <View>
            <TouchableOpacity
                delayLongPress= {300}
                onPress = {() => this.props.navigation.navigate('Note', {header: 'EDIT NOTE', title: item.title, note: item.note,
                categoryId: item.idCategory, id: item.noteId})}
                onLongPress = {() => this.deleteNote(item.noteId)}
            >
                <Card
                    containerStyle={{backgroundColor: 
                        item.idCategory == 1 ? '#2FC2DF' : 
                        item.idCategory == 2 ? '#C0EB6A' :
                        item.idCategory == 3 ? '#FAD06C' :
                        item.idCategory == 4 ? '#FF92A9' : 
                        item.idCategory == 5 ? '#D64ED9' : '#D64ED9',
                        borderRadius: 8, width: 138, height: 136, alignSelf: 'flex-start'}}
                    dividerStyle = {styles.cardDivider}
                    titleStyle = {styles.cardTitle}
                    title = {moment(item.datetime, 'DD-MM-YYYY').format('DD-MM')}
                >
                    <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white', marginTop: -20}}
                        numberOfLines= {1}> {item.title} </Text>
                    <Text style={{fontSize:8,color:'white'}}> {item.category} </Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{flex: 1, flexWrap: 'wrap',color:'white'}} numberOfLines={3}> {item.note} </Text>
                    </View>
                </Card>
            </TouchableOpacity>
        </View>
    )
    _keyExtractor = (item, index) => item.noteId

    render() {
        const { search } = this.state
        // const { navigate } = this.props.navigation
        return (
            <View>
                <SearchBar 
                    placeholder= 'Search...'
                    containerStyle= {styles.searchBarContainer}
                    inputContainerStyle = {{backgroundColor: 'white', maxHeight: 35, marginTop: -3}}
                    onChangeText= {debounce(300, true, this.updateSearch)}
                    searchWithSort= {this._onMenuItemPressed}
                    showLoading = {this.props.notes.isSearch}
                    inputStyle = {{fontSize: 14}}
                    placeholderTextColor = '#C4C4C4'
                    value = {search}
                    lightTheme = {true}
                    searchIcon = {null}
                />
                <FlatList 
                    containerStyle = {styles.MainContainer}
                    contentContainerStyle = {{ alignItems: 'center', backgroundColor: 'white' }}
                    data = {this.state.search== '' ? this.props.notes.notes : this.props.notes.searchNotes}
                    renderItem = {this.renderItem}
                    refreshing = {this.props.notes.isLoading}
                    onRefresh = {() => this.getData(search, this.props.notes.sorted)}
                    numColumns = {2}
                    keyExtractor = {this._keyExtractor}
                    onEndReachedThreshold = {0.1}
                    onEndReached = {() => this.handleLoadMore(this.props.notes.sorted)}
                />
                <FloatingAction 
                    onPressMain = {() => this.props.navigation.navigate('Note',{header: 'ADD NOTE'})}
                    showBackground = {false}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    MainContainer: {
      justifyContent: 'center',
      flex: 1,
      paddingTop: 15,
      paddingBottom:5,
      flexDirection:'column',
      fontFamily:'openSans',
      backgroundColor:'white'
    },
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      paddingLeft:10
      
    },
    noteText:{
    flex: 0.3, 
    flexDirection: 'column',  
    alignItems: 'center', 
    justifyContent: 'center',
    flexWrap: 'wrap'
    },
    button:{
      height:40,
      width:40,
      
    },
    searchBarContainer:{
      marginBottom:10,
      marginStart:23,
      marginEnd:23,
      backgroundColor:'white',
      borderColor:'white',
      borderTopColor: 'transparent',
      borderBottomColor:'transparent',
      shadowColor:'#000',
      shadowRadius:15,
      shadowOffset: { width: 4, height: 13 },
      shadowOpacity: 0.8,
      elevation:6,
      borderRadius:20,
      height:45

    },
    cardDivider:{
      borderTopStartRadius:0,
      display:'none'
    },
    cardTitle:{
      alignSelf:'flex-end',
      fontSize:10,
      flexWrap:'wrap',
      color:'white'
    }
  })

  const mapStateToProps = (state) => {
      return {
          notes: state.notes
      }
  }

  export default connect(mapStateToProps)(Home)
