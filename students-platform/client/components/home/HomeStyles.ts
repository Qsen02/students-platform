import { StyleSheet } from "react-native";

export const homeStyles=StyleSheet.create({
    container:{
        marginTop:20,
        borderRadius:5,
        marginLeft:'auto',
        marginRight:'auto',
        padding:20,
        backgroundColor:"rgb(0, 157, 255)",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        gap:5
    },
    title:{
        textAlign:"center",
        fontWeight:"bold",
        fontSize:18,
        color:"white"
    },
    text:{
        textAlign:"center",
        fontSize:14,
        color:"white"
    },
    latest:{
        marginTop:20,
        textAlign:"center",
        fontWeight:"bold",
        fontSize:18,
        color:"black"
    }
})