
import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    SafeAreaView,
    ActivityIndicator,
    Platform,
    FlatList,
    Button,
    View,
    TextInput
} from "react-native";


const SearchBookScreen = props => {
    const [filterBooks, setFilteredBooks] = useState([])
    const [masterBooks, setMasterBooks] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchBooks()
    }, [])
    const fetchBooks = () => {
        const apiURL = 'https://rn-library-application-ddbea-default-rtdb.europe-west1.firebasedatabase.app/books.json'
        fetch(apiURL)
            .then((response) => response.json())
            .then((responseJson) => {
                setFilteredBooks(responseJson)
                setMasterBooks(responseJson)
            }).catch((error) => {
                console.error(error)
            })
    }

    const searchFilter = (text) => {
        if (text) {
            const newData = masterBooks.filter((item) => {
                const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase()

                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1;
            })
            setFilteredBooks(newData)
            setSearch(text)
        } else {
            setFilteredBooks(masterBooks)
            setSearch(text)
        }
    }

    const ItemView = ({ item }) => {
        return (
            <Text style={styles.itemStyle}>
                {item.id}{'. '}{item.title.toUpperCase()}
            </Text>
        )
    }

    const ItemSeparatorView = () => {
        return (
            <View
                style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8' }}
            />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    value={search}
                    placeholder='Enter Book Name'
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => searchFilter(text)}
                />
                <FlatList
                    data={filterBooks}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    itemStyle: {
        padding: 15
    },
    textInput: {
        height: 50,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009',
        backgroundColor: 'white'
    }
})

export default SearchBookScreen;
