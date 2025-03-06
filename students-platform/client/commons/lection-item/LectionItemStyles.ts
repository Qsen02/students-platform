import { StyleSheet } from "react-native";

export const lectionItemStyles=StyleSheet.create({
    lectionWrapper:{
        borderRadius:7,
        backgroundColor:"rgb(0, 157, 255)",
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        padding:10,
        gap:20,
        marginBottom:10,
        alignItems:"center"
    },
    lectionText:{
        flexBasis:"40%",
        fontSize:16,
        color:"white",
        textAlign:"center"
    },
    lectionButton:{
        backgroundColor:"red",
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:15,
        paddingRight:15,
        borderRadius:10,
    },
    lectionButtonText:{
        fontSize:16,
        color:"white",
    }
})