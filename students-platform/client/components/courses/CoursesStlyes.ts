import { StyleSheet } from "react-native";

export const coursesStyles=StyleSheet.create({
    searchForm:{
        width:"100%",
        display:"flex",
        flexDirection:"column",
        gap:10,
        alignItems:"center"
    },
    searchTitle:{
        fontSize:16,
        fontWeight:"bold",
        textAlign:"center",
        marginTop:20
    },
    searchWrapper:{
        width:"70%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    searchButton:{
        backgroundColor:"rgb(0, 157, 255)",
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
    }
})