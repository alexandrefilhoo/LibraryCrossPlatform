import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import CartRentItem from './CartRentItem'
import Colors from '../../constants/Colors'

const ReservationItem = props => {
    const [showRentDetails, setShowRentDetails] = useState(false)
    return (
        <View style={styles.reservationItem}>
            <View style={styles.summary}>
                <Text style={styles.date}>Reservation Date: {props.date}</Text>
                <Text style={styles.totalRentAmount}> Rent Fee: £ {props.amount.toFixed(2)}</Text>

            </View>
            <Button color={Colors.primary} title={showRentDetails ? 'Less Details' : 'More Details'}
                onPress={() => {
                    setShowRentDetails(prevState => !prevState)
                }}
            />
            {showRentDetails &&
                <View style={styles.reservationDetails}>
                    {props.items.map(cartRentItem => <CartRentItem
                        key={cartRentItem.bookId}
                        quantity={cartRentItem.quantity}
                        amount={cartRentItem.sum}
                        title={cartRentItem.bookTitle}
                    />)}
                </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    reservationItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalRentAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontSize: 16,
        fontFamily: 'open-sans',
        color: '#888'
    },
    reservationDetails: {
        width: '100%'
    }
})

export default ReservationItem;