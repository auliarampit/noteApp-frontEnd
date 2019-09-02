import { StyleSheet } from 'react-native'

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
export { styles } 