import { StyleSheet } from 'react-native';
import { blob } from 'stream/consumers';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    imgLogo:{
        width: '50%',
        minHeight: '10%',
        resizeMode: 'contain'
    },
    headerInner: {
        width: '90%',
        height: '30%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20
    },
    centerInner:{
        // backgroundColor: 'salmon',
        width: '90%',
        height: '55%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formView:{
        width: '100%'
    },  
    footerInner: {
        width: '90%',
        height: '15%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        fontSize: 20,
        paddingTop: 20,
    },
    inputLabel: {
        fontSize: 20
    },
    // inputStyle:{
    //     borderBottomColor: 'grey',
    //     borderBottom: '1px'
    // },
    buttonContainer: {
        marginLeft: 'auto',
    },
    createLabel:{
        fontSize: 17,
    },
    createButton:{
        backgroundColor: '#2ba750',
        width: 120,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
    },
    buttonStyle: {
        backgroundColor: '#f194ff',
    },
    buttonLabel: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
    },
    loginButton: {
        fontSize: 20,
    },
    loginButtonSection:{
        width: '100%',
    },
    centerLink:{
        display: 'flex',
        alignItems: 'center'
    },
    InputCont:{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 55,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: 'lightgray',
        paddingLeft: 10,
    },
    InputPass:{
        width: '85%'
    },
    ShowIcon:{
        width: '15%',
        height: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftColor: 'lightgray',
        borderLeftWidth: 1,
    },
});

export default styles;
