import { StyleSheet } from "react-native";

export const LectionDetailsStyles = StyleSheet.create({
    buttonWrapper: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems:"center",
        gap: 20,
        marginTop:10
    },
    button:{
        backgroundColor:"red",
        paddingLeft:15,
        paddingRight:15,
        paddingTop:5,
        paddingBottom:5,
        borderRadius:10,
    },
    buttonText:{
        fontSize:16,
        color:"white",
        fontWeight:"bold"
    },
    pickerButton: {
        width: 100,
        height: 45,
        borderWidth: 1,
        borderColor: "darkgrey",
        borderRadius: 10,
        padding: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems:"center"
    },
    lectionWrapper: {
        width: "90%",
        borderRadius: 5,
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 20,
        padding: 20,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    },
    lectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    smallContent: {
        textAlign: "center",
        fontSize: 14,
        marginBottom: 40
    },
    normalContent: {
        textAlign: "center",
        marginBottom: 40,
        fontSize: 16,
    },
    bigContent: {
        textAlign: "center",
        marginBottom: 40,
        fontSize: 18,
    },
});
