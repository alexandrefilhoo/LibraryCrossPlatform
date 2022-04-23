import React, { useEffect, useCallback, useReducer, useState } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import HeaderButton from '../../components/UI/HeaderButton';
import * as booksActions from '../../store/actions/books';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

const FORM_REDUCER_UPDATE = 'FORM_REDUCER_UPDATE'


const formReducer = (state, action) => {
    if (action.type === FORM_REDUCER_UPDATE) {

        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };

        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        }
    }
    return state;
}

const UpdateBookScreen = props => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const bId = props.navigation.getParam('bookId');
    const updatedBook = useSelector(state =>
        state.books.userBooks.find(book => book.id === bId)
    );
    const dispatch = useDispatch();

    const [formState, formStateDispatch] = useReducer(formReducer,
        {
            inputValues: {
                category: updatedBook ? updatedBook.category : '',
                isbn: updatedBook ? updatedBook.isbn : '',
                title: updatedBook ? updatedBook.title : '',
                imageUrl: updatedBook ? updatedBook.imageUrl : '',
                description: updatedBook ? updatedBook.description : '',
                pages: updatedBook ? updatedBook.pages : '',
                author: updatedBook ? updatedBook.author : '',
                year: updatedBook ? updatedBook.year : '',
                edition: updatedBook ? updatedBook.edition : '',
                publisher: updatedBook ? updatedBook.publisher : '',
                price: ''
            },
            inputValidities: {
                category: updatedBook ? true : false,
                isbn: updatedBook ? true : false,
                title: updatedBook ? true : false,
                imageUrl: updatedBook ? true : false,
                description: updatedBook ? true : false,
                pages: updatedBook ? true : false,
                author: updatedBook ? true : false,
                year: updatedBook ? true : false,
                edition: updatedBook ? true : false,
                publisher: updatedBook ? true : false,
                price: updatedBook ? true : false,

            },
            formIsValid: updatedBook ? true : false
        })

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured!', error, [{ text: 'Got it' }])
        }
    }, [error])

    const submitHandler = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert('Attention! Error input!', 'Please make sure all fields are filled up.', [
                { text: 'Got it' }
            ])
            return;
        }

        setError(null)
        setIsLoading(true)

        try {
            if (updatedBook) {

                await dispatch(
                    booksActions.updateBook(
                        bId,
                        formState.inputValues.category,
                        formState.inputValues.isbn,
                        formState.inputValues.title,
                        formState.inputValues.imageUrl,
                        formState.inputValues.description,
                        formState.inputValues.pages,
                        formState.inputValues.author,
                        formState.inputValues.year,
                        formState.inputValues.edition,
                        formState.inputValues.publisher
                    )
                );
            } else {
                await dispatch(
                    booksActions.createBook(
                        formState.inputValues.category,
                        formState.inputValues.isbn,
                        formState.inputValues.title,
                        formState.inputValues.imageUrl,
                        formState.inputValues.description,
                        formState.inputValues.pages,
                        formState.inputValues.author,
                        formState.inputValues.year,
                        formState.inputValues.edition,
                        formState.inputValues.publisher,
                        +formState.inputValues.price
                    )
                );
            }
            props.navigation.goBack();

        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false)
    }, [dispatch, bId, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {

            formStateDispatch({
                type: FORM_REDUCER_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            })
        }, [formStateDispatch])

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

    return (
        <LinearGradient colors={['#c8e6c9', '#fff9c4']} style={styles.gradient}>
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id='category'
                        label='Category'
                        errorTextMsg='Please enter a valid category'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={updatedBook ? updatedBook.category : ''}
                        initiallyValid={!!updatedBook}
                        required
                    />

                    <Input
                        id='isbn'
                        label='ISBN'
                        errorTextMsg='Please enter a valid  isbn'
                        keyboardType='decimal-pad'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={updatedBook ? updatedBook.isbn : ''}
                        initiallyValid={!!updatedBook}
                        required
                    />

                    <Input
                        id='title'
                        label='Title'
                        errorTextMsg='Please enter a valid title'
                        keyboardType='default'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={updatedBook ? updatedBook.title : ''}
                        initiallyValid={!!updatedBook}
                        required
                    />
                    <Input
                        id='imageUrl'
                        label='Image URL'
                        errorTextMsg='Please enter a valid image url'
                        keyboardType='default'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={updatedBook ? updatedBook.imageUrl : ''}
                        initiallyValid={!!updatedBook}
                        required
                    />
                    <Input
                        id='description'
                        label='Description'
                        errorTextMsg='Please enter a valid description'
                        keyboardType='default'
                        returnKeyType='next'
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={updatedBook ? updatedBook.description : ''}
                        initiallyValid={!!updatedBook}
                        required
                        minLength={5}
                    />
                    <Input
                        id='pages'
                        label='Pages'
                        errorTextMsg='Please enter the correct number of pages'
                        keyboardType='decimal-pad'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={updatedBook ? updatedBook.pages : ''}
                        initiallyValid={!!updatedBook}
                        required
                    />
                    <Input
                        id='author'
                        label='Author'
                        errorTextMsg='Please enter a valid author'
                        keyboardType='default'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={updatedBook ? updatedBook.author : ''}
                        initiallyValid={!!updatedBook}
                        required
                    />
                    <Input
                        id='year'
                        label='Year'
                        errorTextMsg='Please enter a valid year'
                        keyboardType='decimal-pad'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={updatedBook ? updatedBook.year : ''}
                        initiallyValid={!!updatedBook}
                        required
                    />
                    <Input
                        id='edition'
                        label='Edition'
                        errorTextMsg='Please enter a valid edition'
                        keyboardType='default'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={updatedBook ? updatedBook.edition : ''}
                        initiallyValid={!!updatedBook}
                        required
                    />
                    <Input
                        id='publisher'
                        label='Publisher'
                        errorTextMsg='Please enter a valid publisher'
                        keyboardType='default'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={updatedBook ? updatedBook.publisher : ''}
                        initiallyValid={!!updatedBook}
                        required
                    />
                    {updatedBook ? null : (
                        <Input
                            id='price'
                            label='Rent Fee'
                            errorTextMsg='Please enter a valid price'
                            keyboardType='decimal-pad'
                            onInputChange={inputChangeHandler}
                            // initialValue={updatedBook ? updatedBook.price : ''}
                            // initiallyValid={!!updatedBook}
                            required
                            min={0.1}
                        />
                    )}
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

UpdateBookScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('bookId')
            ? 'Edit Book'
            : 'Add Book',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName={
                        Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
                    }
                    onPress={submitFn}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({

    form: {
        marginBottom: 50,
        marginTop: 50,
        margin: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, gradient: {
        flex: 1
    }

});

export default UpdateBookScreen;




