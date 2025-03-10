import { StyleSheet } from "react-native";

export const userItemStyles = StyleSheet.create({
    itemWrapper: {
        width: "100%",
        borderRadius: 7,
        padding: 10,
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        gap: 10,
        backgroundColor: "rgb(0, 157, 255)",
        marginTop:10
    },
    itemHeader: {
        paddingBottom: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        borderBottomWidth: 1.5,
        borderStyle: "solid",
        borderBottomColor: "white",
    },
    buttonWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
    },
    text: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
    },
    button: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "red",
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
    },
});
