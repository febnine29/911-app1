import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    languageCont:{
        width: '90%',
        height: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'center',
    },
    callIcon:{
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 'auto',
        letterSpacing: 10,
        // justifyContent: 'space-between'
    },
    liItem:{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10
    }, 
    spaceIcon:{
        marginLeft: 10,
    },
    screenTitle:{
        fontSize: 18,
        textAlign: 'center'
    },
    containerTitle:{
        marginTop: 20,
        marginBottom: 10,
        // display: 'flex',
        // alignItems: 'center'
    }
})
export default styles