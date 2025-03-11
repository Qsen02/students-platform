import { StyleSheet } from "react-native";

export const assessmentItemStyles=StyleSheet.create({
    wrapper:{
        marginBottom:10,
        marginLeft:"auto",
        marginRight:"auto",
        width:"95%",
        borderRadius:10,
        padding:10,
        backgroundColor:"rgb(0, 157, 255)",
        display:"flex",
        flexDirection:"row",
        gap:20,
        justifyContent:"space-around",
        alignItems:"center"
    },
    text:{
        flexBasis:100,
        fontSize:16,
        color:"white",
        textAlign:"center"
    }
})