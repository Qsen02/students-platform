import { StyleSheet } from "react-native";

export const registerStyles = StyleSheet.create({
    formWrapper: {
        backgroundColor: "rgb(0, 157, 255)",
        width:"80%",
        borderRadius:10,
        marginTop: 15,
        marginLeft: "auto",
        marginRight: "auto",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
    },
    formTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
        marginBottom:10,
        textAlign:"center"
    },
    formText: {
        color: "white",
        fontSize: 14,
        textAlign:"center"
    },
    formButton:{
        backgroundColor:"red",
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:15,
        paddingRight:15,
        borderRadius:10,
        marginTop:5
    },
    formButtonText:{
        fontSize:16,
        color:"white",
        fontWeight:"bold"
    },
    link:{
        textAlign:"center",
        color:"rgb(255, 55, 55)",
        fontSize:16
    }
});
