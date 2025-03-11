import { StyleSheet } from "react-native";

export const assessmentSyles=StyleSheet.create({
    wrapper:{
        width:"100%",
        paddingTop:20,
        display:"flex",
        flexDirection:"column",
        gap:20,
        alignItems:"center"
    },
    title:{
        fontSize:18,
        fontWeight:"bold",
        textAlign:"center",
        width:"90%"
    },
    assessmentContainer:{
        width:"90%",
        borderRadius:5,
        padding:10,
        height:"90%",
        boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"
    },
    text:{
        fontSize:16,
        textAlign:"center"
    }
})