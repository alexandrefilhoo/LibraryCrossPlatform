// Screen shown when we select a book

import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Button, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import * as rentActions from '../../store/actions/rent'
import { LinearGradient } from 'expo-linear-gradient'

const BookDetailScreen = props => {
    const bookId = props.navigation.getParam('bookId')
    const selectedBook = useSelector(state => state.books.availableBooks.find(book => book.id === bookId))

    const dispatch = useDispatch()
    const [showMoreDetails, setShowMoreDetails] = useState(false)


    return (
        <LinearGradient colors={['#c8e6c9', '#fff9c4']} style={styles.gradient}>

            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: selectedBook.imageUrl }}
                    />
                </View>
                <View style={styles.rentAndButton}>
                    <Text style={styles.rentCharge}>Rent Charge:<Text style={styles.info}> £ {selectedBook.price.toFixed(2)}</Text></Text>
                    <View style={styles.actions}>
                        <Button
                            color={Colors.primary}
                            title='Rent  Book'
                            onPress={() => {
                                dispatch(rentActions.addToRent(selectedBook))
                            }}
                        />
                    </View>
                </View>
                <View style={styles.moreDetails}>
                    <Text style={styles.details}>Description:</Text>
                    <Text style={styles.description}>{selectedBook.description}</Text>
                </View>
                <View style ={styles.moreDetails}>
                    <Button color={Colors.primary} title={showMoreDetails ? 'Less Details' : 'More Details'}
                        onPress={() => {
                            setShowMoreDetails(prevState => !prevState)
                        }}
                    />
                    {showMoreDetails &&

                        <View >
                            <Text style={styles.details}>Category: <Text style={styles.info}>{selectedBook.category}</Text></Text>
                            <Text style={styles.details}>Title: <Text style={styles.info}>{selectedBook.title}</Text></Text>
                            <Text style={styles.details}>Author: <Text style={styles.info}>{selectedBook.author}</Text></Text>
                            <Text style={styles.details}>Year: <Text style={styles.info}>{selectedBook.year}</Text> </Text>
                            <Text style={styles.details}>Edition: <Text style={styles.info}>{selectedBook.edition}</Text> </Text>
                            <Text style={styles.details} >Paperback: <Text style={styles.info}> {selectedBook.pages}</Text> </Text>
                            <Text style={styles.details}>ISBN: <Text style={styles.info}> {selectedBook.isbn}</Text></Text>
                            <Text style={styles.details}>Publisher: <Text style={styles.info}> {selectedBook.publisher}</Text></Text>
                        </View>
                    }
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

BookDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('bookTitle')
    }
}
const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
        alignItems: 'center'
    },
    image: {
        marginTop: 20,
        width: '70%',
        height: 350,
    },
    rentAndButton: {
        marginTop: 10,
        marginHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: Colors.boxBackground
    },
    actions: {
        marginTop: 5
    },
    rentCharge: {
        fontSize: 16,
        fontFamily: 'open-sans-bold',
        padding: 10,

    },
    details: {
        fontSize: 16,
        color: '#424242',
        textAlign: 'center',
        fontFamily: 'open-sans-bold',
    },
    info: {
        fontFamily: 'open-sans',
        fontWeight: '100',
    },
    description: {
        fontFamily: 'open-sans',
        fontWeight: '100',
        fontSize: 16,
        textAlign: 'center'
    },
    moreDetails: {
        textAlign: 'center',
        marginHorizontal: 10,
        fontFamily: 'open-sans',
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
        backgroundColor: Colors.boxBackground
    },
})

export default BookDetailScreen;