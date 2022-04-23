import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import Colors from '../../constants/Colors'
import Card from '../UI/Card'

const BookItem = props => {
    let TouchCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchCmp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.book}>
            <View style={styles.touchable}>
                <TouchCmp onPress={props.onSelect} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: props.image }} />
                        </View>
                        <View style={styles.detailsView}>
                            <Text style={styles.details}>{props.title}</Text>
                            <Text style={styles.details}>Rent for : £{props.price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.actions}>
                            {props.children}
                        </View>
                    </View>
                </TouchCmp>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    book: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 500,
        margin: 20,
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10,
    },
    imageContainer: {
        width: '100%',
        height: '70%',
        overflow: 'hidden',
        alignItems: 'center'
    },
    image: {
        width: '70%',
        height: '90%',
        marginTop: 10,
    },
    detailsView: {
        alignItems: 'center',
    },
    details: {
        fontSize: 15,
        padding: 10,
        color: '#888',
        fontFamily: 'open-sans',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 50
    },
})

export default BookItem