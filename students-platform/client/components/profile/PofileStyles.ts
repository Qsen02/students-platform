import { StyleSheet } from "react-native";

export const profileStyles=StyleSheet.create({
    profileHeader:{
        padding:20,
        marginTop:10,
        marginRight:"auto",
        marginLeft:"auto",
        width:"90%",
        backgroundColor:"rgb(0, 157, 255)",
        borderRadius:5,
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        gap:10
    },
    profileHeaderText:{
        fontSize:16,
        color:"white",
        textAlign:"center"
    },
    buttonWrapper:{
        width:"100%",
        borderTopWidth:1.5,
        borderTopColor:"white",
        borderStyle:"solid",
        padding:10,
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        gap:30
    },
    button:{
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:"red",
        borderRadius:10
    },
    buttonText:{
        fontSize:14,
        color:"white",
        fontWeight:"bold"
    }
})