import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        height: 60.67,
        borderWidth: 1,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 30, 
        backgroundColor: '#211527',
    },
    containerWithoutIcon:{
        height: 60.67,
        borderColor: '#FF9A3E',
        borderWidth: 1,
        flex: 1,
        alignItems: 'center',
        padding: 16,
        borderRadius: 30, 
        backgroundColor: '#211527',
    },
    icon: {
        color: 'white',
        marginRight: 20

    },
    numericInput: {},
    input: {
        color: '#FFFFFF',
        fontSize: 24,
    },
    inputWithoutIcon:{
        color: '#FFFFFF',
        fontSize: 24,
        textAlign: 'center',
    },
    textViewError: {
        position: 'absolute',
        bottom: 13,
        left: 60,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    textError:{
        color: 'red',
        fontSize: 12,
    },
    errorIcon:{
        color: 'red',       
    }
})