//First screen shown when the app loads
import React, { useEffect, useState, useCallback } from 'react'
import { FlatList, Platform, Button, ActivityIndicator, View, StyleSheet, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import BookItem from '../../components/libraryShop/BookItem'
import * as rentActions from '../../store/actions/rent'
import * as booksActions from '../../store/actions/books'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'

const BooksOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] = useState()
    const books = useSelector(state => state.books.availableBooks);
    const dispatch = useDispatch()

    const loadBooks = useCallback(async () => {
        console.log('Load Books')
        setError(null)
        setIsRefreshing(true)
        try {
            await dispatch(booksActions.fetchBooks())

        } catch (error) {
            setError(error.message)
        }
        setIsRefreshing(false)
    }, [dispatch, setIsLoading, setError])

    useEffect(() => {
        const willFocusSubscription = props.navigation.addListener('willFocus', loadBooks)

        return () => {
            willFocusSubscription.remove()
        }
    }, [loadBooks])

    useEffect(() => {
        setIsLoading(true)

        loadBooks().then(() => {
            setIsLoading(false)
        })
    }, [dispatch, loadBooks])

    const selectBookHandler = (id, title) => {
        props.navigation.navigate('BookDetail', {
            bookId: id,
            bookTitle: title
        })
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occurred!</Text>
                <Button
                    title='Try again'
                    color={Colors.primary}
                    onPress={loadBooks}
                />
            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator
                    size='large'
                    color={Colors.primary}
                />
            </View>
        )
    }

    if (!isLoading && books.length === 0) {

        return (
            <View style={styles.centered}>
                <Text>Error: There are no registered books! Add some!</Text>
            </View>
        )

    }

    return (
        <LinearGradient colors={['#c8e6c9', '#fff9c4']} style={styles.gradient}>

        <FlatList
            onRefresh={loadBooks}
            refreshing={isRefreshing}
            data={books}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <BookItem
                    image={itemData.item.imageUrl}
                    title = {itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectBookHandler(itemData.item.id, itemData.item.title)
                    }}
                >
                    <Button
                        color={Colors.primary}
                        title='View Book details'
                        onPress={() => {
                            selectBookHandler(itemData.item.id, itemData.item.title)
                        }}
                    />
                    <Button
                        color={Colors.primary}
                        title='Rent this Book'
                        onPress={() => {
                            dispatch(rentActions.addToRent(itemData.item))
                        }}
                    />
                </BookItem>
            }
        />
        </LinearGradient>
    )
}

BooksOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Home Books',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>,
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='CartRent'
                    iconName={Platform.OS === 'android' ? 'book' : 'ios-book'}
                    onPress={() => {
                        navData.navigation.navigate('BookCartRent')
                    }}
                />
                {/* <Item
                    title='BookCartRent'
                    iconName={Platform.OS === 'android' ? 'search' : 'ios-search'}
                    onPress={() => {
                        navData.navigation.navigate('SearchBook')
                    }}
                /> */}
            </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gradient: {
        flex: 1
    }
})

export default BooksOverviewScreen;