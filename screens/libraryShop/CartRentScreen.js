//A screen when we add a book to be rent

import React, { useState } from 'react'
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import CartRentItem from '../../components/libraryShop/CartRentItem'
import Colors from '../../constants/Colors'
import * as rentActions from '../../store/actions/rent'
import * as reservationsActions from '../../store/actions/reservations'
import { LinearGradient } from 'expo-linear-gradient'

const CartRentScreen = props => {

    const [isLoading, setIsLoading] = useState(false)

    const cartRentTotalAmount = useSelector(state => state.rent.totalAmount)
    const cartRentItems = useSelector(state => {
        const transformedCartRentItems = [];
        for (const key in state.rent.items) {
            transformedCartRentItems.push({
                bookId: key,
                bookTitle: state.rent.items[key].bookTitle,
                bookRentPrice: state.rent.items[key].bookRentPrice,
                quantity: state.rent.items[key].quantity,
                sum: state.rent.items[key].sum
            })
        }
        return transformedCartRentItems.sort((a, b) => a.bookId > b.bookId ? 1 : -1)
    })
    const dispatch = useDispatch()

    const sendBookReservationHandler = async () => {
        setIsLoading(true)
        await dispatch(reservationsActions.addReservation(cartRentItems, cartRentTotalAmount))
        setIsLoading(false)
    }

    return (
        <LinearGradient colors={['#c8e6c9', '#fff9c4']} style={styles.gradient}>

            <View style={styles.screen}>
                <View style={styles.summary}>
                    <Text style={styles.summaryText}>
                        Total:{' '}
                        {/* <Text style={styles.amount}>£ {Math.round(cartRentTotalAmount.toFixed(2) * 100) / 100}</Text> */}
                        <Text style={styles.amount}>£ {cartRentTotalAmount.toFixed(2)}</Text>

                    </Text>
                    {isLoading ? (<ActivityIndicator size='small' color={Colors.primary} />) : (
                        <Button title='Rent now'
                            color={Colors.accent}
                            disabled={cartRentItems.length === 0}
                            onPress={sendBookReservationHandler}
                        />
                    )}

                </View>
                <FlatList
                    data={cartRentItems}
                    keyExtractor={item => item.bookId}
                    renderItem={itemData => <CartRentItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.bookTitle}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={() => {
                            dispatch(rentActions.removeFromRent(itemData.item.bookId))
                        }}
                    />}
                />
            </View>
        </LinearGradient>
    )
}

CartRentScreen.navigationOptions = {
    headerTitle: 'Book Rent Charge'
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    amount: {
        color: Colors.primary
    }
})

export default CartRentScreen