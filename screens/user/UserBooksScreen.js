import React from 'react'
import { FlatList, Button, Platform, Alert, View, Text, StyleSheet } from 'react-native'
import BookItem from '../../components/libraryShop/BookItem'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import * as booksActions from '../../store/actions/books'
import { LinearGradient } from 'expo-linear-gradient'

const UserBooksScreen = props => {
    const userBooks = useSelector(state => state.books.userBooks)
    const dispatch = useDispatch()

    const updateBookHandler = (id) => {
        props.navigation.navigate('UpdateBook', { bookId: id })
    }

    const deleteHandler = (id) => {
        Alert.alert('Are you sure of this?', 'This book will be permanetely deleted!', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(booksActions.deleteBook(id))
                }
            }
        ])
    }

    if (userBooks.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No books found. Your books will appear here.</Text>
            </View>
        )
    }
    return (
        <LinearGradient colors={['#c8e6c9', '#fff9c4']} style={{flex:1}}>
            <FlatList
                data={userBooks}
                keyExtractor={item => item.id}
                renderItem={itemData =>
                    <BookItem
                        image={itemData.item.imageUrl}
                        title={itemData.item.title}
                        price={itemData.item.price}
                        onSelect={() => {
                            updateBookHandler(itemData.item.id)
                        }}
                    >
                        <Button
                            color={Colors.primary}
                            title='Update Book'
                            onPress={() => {
                                updateBookHandler(itemData.item.id)
                            }}
                        />
                        <Button
                            color={Colors.primary}
                            title='Delete Book'
                            onPress={deleteHandler.bind(this, itemData.item.id)}
                        />
                    </BookItem>
                }
            />
        </LinearGradient>
    )
}

UserBooksScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Books',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Add'
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={() => {
                        navData.navigation.navigate('UpdateBook');
                    }}
                />
            </HeaderButtons>
        )
    }
}



export default UserBooksScreen


