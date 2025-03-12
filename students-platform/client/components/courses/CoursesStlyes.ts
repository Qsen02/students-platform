import { pagination } from "@/api/courseService";
import { StyleSheet } from "react-native";

export const coursesStyles = StyleSheet.create({
    searchForm: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
    },
    searchTitle: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
    },
    searchWrapper: {
        width: "70%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    searchButton: {
        backgroundColor: "rgb(0, 157, 255)",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    text: {
        textAlign: "center",
        fontSize:16,
        marginTop:20
    },
    paginationWrapper:{
        marginLeft:"auto",
        marginRight:"auto",
        height:75,
        width:300,
        display:"flex",
        flexDirection:"row",
        gap:10,
        justifyContent:"center",
        alignItems:"center"
    },
    paginationButton:{
        backgroundColor:"red",
        height:30,
        width:40,
        borderRadius:"50%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        paddingBottom:3
    },
    paginationText:{
        color:"white",
        fontSize:18,
        fontWeight:"bold"
    }
});
