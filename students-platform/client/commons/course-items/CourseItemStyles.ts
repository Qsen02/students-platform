import { StyleSheet } from "react-native";

export const courseItemStyles=StyleSheet.create({
    wrapper:{
        marginTop:30,
        marginLeft:"auto",
        marginRight:"auto",
        width:"90%",
        backgroundColor:"rgb(0, 157, 255)",
        borderRadius:5,
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        gap:15,
        overflow:"hidden",
        paddingBottom:20
    },
    image:{
        width:"100%",
        height:150,
        objectFit:"cover"
    },
    text:{
        color:"white",
        fontSize:16
    },
    button:{
        backgroundColor:"red",
        paddingLeft:15,
        paddingRight:15,
        paddingTop:7,
        paddingBottom:7,
        borderRadius:10,
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    },
    buttonText:{
        color:"white",
        fontSize:16,
        fontWeight:"bold"
    }
})