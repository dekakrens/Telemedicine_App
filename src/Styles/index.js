import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'mbold'
    },
    card: {
        flexDirection: 'row',
        height: 80,
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#000',
        fontFamily: 'mbold'
    },
    cardIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily: 'mbold'
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        fontFamily: 'mbold'
    },
     buttonText: {
    alignSelf: "center",
    textAlign:"center",
    padding: 20,
    fontSize: 25,
    color: "#ff00ff",
    fontWeight: "bold",
    fontFamily: 'mbold'
  },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        fontFamily: 'mbold'
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
        fontFamily: 'mbold'
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        fontFamily: 'mbold'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
        fontFamily: 'mbold'
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
        fontFamily: 'mbold'
    },

    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'mbold'
    },
    iconConnect: {
        marginBottom: 20,
        marginRight: 20,
        height: 65,
        width: 65,
        borderRadius: 32.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0e49b5',
        position: 'absolute',
        right: 0,
        bottom: 0,
        fontFamily: 'mbold'
    }
})

export default styles;