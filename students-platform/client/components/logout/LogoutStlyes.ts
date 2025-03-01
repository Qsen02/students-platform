import { StyleSheet } from "react-native";

export const logoutStyles=StyleSheet.create({
    logoutWrapper:{
        marginTop:30,
        marginLeft:"auto",
        marginRight:"auto",
        padding:20,
        backgroundColor:"rgb(0, 157, 255)",
        width:"70%",
        borderRadius:5,
        display:"flex",
        flexDirection:"column",
        gap:15,
        alignItems:"center"
    },
    title:{
        color:"white",
        fontSize:18,
        fontWeight:"bold",
        textAlign:"center"
    },
    buttonsWrapper:{
        display:"flex",
        flexDirection:"row",
        gap:50,
        justifyContent:"center"
    },
    buttons:{
        backgroundColor:"red",
        paddingTop:5,
        paddingBottom:5,
        paddingRight:15,
        paddingLeft:15,
        borderRadius:10
    },
    buttonText:{
        fontWeight:"bold",
        color:"white",
        fontSize:16
    }
})