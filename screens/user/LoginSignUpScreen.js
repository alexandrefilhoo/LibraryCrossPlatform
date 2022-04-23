import React, { useReducer, useCallback, useState, useEffect } from 'react'
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, Button, ActivityIndicator, Alert, Text, Image } from 'react-native'
import Input from '../../components/UI/Input'
import Card from '../../components/UI/Card'
import Colors from '../../constants/Colors'
import { useDispatch } from 'react-redux'
import * as loginSignUpActions from '../../store/actions/loginsignup'

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

const LoginSignUpScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [isSignup, setIsSignup] = useState(false)
    const dispatch = useDispatch()

    const [formState, formStateDispatch] = useReducer(formReducer,
        {
            inputValues: {
                email: '',
                password: ''
            },
            inputValidities: {
                email: false,
                password: false
            },
            formIsValid: false
        })

    useEffect(() => {
        if (error) {
            Alert.alert('Error in the application!', error, [{ text: 'Got it' }])
        }
    }, [error])

    const loginSignUpHandler = async () => {
        let action;
        if (isSignup) {
            action = loginSignUpActions.signup(formState.inputValues.email, formState.inputValues.password)
        } else {
            action = loginSignUpActions.login(formState.inputValues.email, formState.inputValues.password)
        }
        setError(null)
        setIsLoading(true)

        try {
            await dispatch(action)
            props.navigation.navigate('Library')

        } catch (err) {
            setError(err.message)
            setIsLoading(false)
        }
    }

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {

        formStateDispatch({
            type: FORM_REDUCER_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [formStateDispatch]
    )
    return (
        <KeyboardAvoidingView style={styles.screen}>
            <View style={styles.imageContainer}>
                <Text>Welcome  </Text>
                <Image
                    style={styles.image}
                    source={require('../../assets/books.jpg')}
                />
            </View>


            <Card style={styles.loginSignUpContainer}>
                <ScrollView >
                    <Input
                        id='email'
                        label='Student e-mail'
                        keyboardType='email-address'
                        required
                        email
                        autoCapitalize='none'
                        errorTextMsg='Please make sure you enter a valid email address.'
                        onInputChange={inputChangeHandler}
                        initialValue=''
                    />
                    <Input
                        id='password'
                        label='Password'
                        keyboardType='default'
                        secureTextEntry
                        required
                        minLength={5}
                        autoCapitalize='none'
                        errorTextMsg='Please make sure your password is at least 6 characters.'
                        onInputChange={inputChangeHandler}
                        initialValue=''
                    />
                    <View style={styles.btnContainer}>
                        {isLoading ? (<ActivityIndicator size='large' color={Colors.primary} />) : (
                            <Button
                                title={isSignup ? 'Sign Up' : 'Login'}
                                color={Colors.primary}
                                onPress={loginSignUpHandler}
                            />)}
                    </View>

                    <View style={styles.btnContainer}>
                        <Button
                            title={`Press to ${isSignup ? 'Login' : 'Sign Up'}`}
                            color={Colors.accent}
                            onPress={() => {
                                setIsSignup(prevState => !prevState)
                            }}
                        />
                    </View>

                </ScrollView>
            </Card>
        </KeyboardAvoidingView>

    )
}

LoginSignUpScreen.navigationOptions = {
    headerTitle: 'Welcome to WK Library',

}

const styles = StyleSheet.create({
    imageContainer: {
        height: 20,
        justifyContent: 'center',
    },
    image: {
        height: 1100,
        width: 415,
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // gradient: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    loginSignUpContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
        backgroundColor: '#f1f8e9'
    },
    btnContainer: {
        marginTop: 10
    }
})

export default LoginSignUpScreen