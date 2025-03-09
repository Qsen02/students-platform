import { StyleSheet } from "react-native";

export const studentsListStyles=StyleSheet.create({
    container:{
        width:"100%",
        marginTop:10,
        display:"flex",
        flexDirection:"column",
        gap:20,
        alignItems:"center"
    },
    title:{
        width:"95%",
        fontSize:18,
        fontWeight:"bold",
        textAlign:"center"
    },
    listContainer:{
        width:"90%",
        height:"90%",
        borderRadius:10,
        padding:20,
        display:"flex",
        flexDirection:"column",
        gap:10,
        alignItems:"center",
        boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px",
    }
})