import { StyleSheet } from "react-native";

export const lectionEditStyles=StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer:{
        width:"90%",
        backgroundColor:"rgb(0, 157, 255)",
        borderRadius:5,
        marginLeft:"auto",
        marginRight:"auto",
        display:"flex",
        flexDirection:"column",
        gap:20,
        alignItems:"center",
        padding:20
    },
    text:{
        textAlign:"center",
        color:"white",
        fontSize:16,
        lineHeight:20
    },
    button:{
        paddingLeft:15,
        paddingRight:15,
        paddingTop:5,
        paddingBottom:5,
        backgroundColor:"red",
        borderRadius:10
    },
    buttonText:{
        color:"white",
        fontWeight:"bold",
        fontSize:16
    },
    buttonWrapper:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        gap:30
    }
})