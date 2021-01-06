import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        flexDirection: 'row',
        height: 80,
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#000'
    },
    cardIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
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
    }
})

export default styles;