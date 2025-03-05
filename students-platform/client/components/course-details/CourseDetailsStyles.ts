import { StyleSheet } from "react-native";

export const courseDetailsStyles = StyleSheet.create({
    detailsWrapper: {
        width: "100%",
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
    },
    detailsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    titleWrapper: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
    },
    optionsWrapper: {
        width: "90%",
        display: "flex",
        flexDirection: "row",
        gap: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    optionsText: {
        flexBasis: "50%",
        textAlign: "center",
    },
    optionsButton:{
        backgroundColor:"red",
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:15,
        paddingRight:15,
        borderRadius:10,
    },
    optionsButtonText:{
        fontSize:16,
        fontWeight:"bold",
        color:"white"
    },
    lectionWrapper:{
        width:"90%",
        borderRadius:5,
        padding:20,
        boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        gap:20
    },
    lections:{
        height:440,
        width:"95%"
    }
});
