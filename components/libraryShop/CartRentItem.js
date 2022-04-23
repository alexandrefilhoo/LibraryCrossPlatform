import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const CartRentItem = props => {
    return (

        <View style={styles.cartRentItem}>
            <Text style={styles.mainText}>Book Name: <Text style={styles.bookData}>{props.title}</Text> </Text>
            <Text style={styles.mainText}>Copies borrowed: <Text style={styles.bookData}>{props.quantity}</Text>  </Text>
            <Text style={styles.mainText}>Price of Rent: <Text style={styles.bookData}> £ {props.amount.toFixed(2)}</Text></Text>
            {props.deletable && (<TouchableOpacity onPress={props.onRemove} style={styles.deleteBtn}>
                <View style={styles.trashViewBtn}>
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color='red'
                    />
                </View>
            </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    cartRentItem: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 10,
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 15,
        color: 'black'
    },
    deleteBtn: {
        marginLeft: 20
    },
    trashViewBtn: {
        marginTop: 15,
        alignItems: 'center',
    },
    bookData: {
        fontFamily: 'open-sans', fontWeight: '200'
    }
})

export default CartRentItem