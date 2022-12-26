import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    rateCont:{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        marginLeft: "auto",
        marginRight: "auto",
        // backgroundColor: "#0a226e"
    },
    logoCont:{
        display: 'flex',
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        height: "30%",
        // paddingBottom: '15%'
    },
    logo:{
        width: "50%",
        height: "50%",
        resizeMode: "contain"
    },
    textCont:{
        height: "55%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: '15%'
    },
    botCont:{
        height: "15%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    touchBot:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
})
export default styles