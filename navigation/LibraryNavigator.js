import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { Platform, SafeAreaView, Button, View } from 'react-native'
import BooksOverviewScreen from '../screens/libraryShop/BooksOverviewScreen'
import BookDetailScreen from '../screens/libraryShop/BookDetailScreen'
import CartRentScreen from '../screens/libraryShop/CartRentScreen'
import ReservationsScreen from '../screens/libraryShop/ReservationsScreen'
import UserBooksScreen from '../screens/user/UserBooksScreen';
import UpdateBookScreen from '../screens/user/UpdateBookScreen';
import LoginSignUpScreen from '../screens/user/LoginSignUpScreen';
import SearchBookScreen from '../screens/libraryShop/SearchBookScreen';
import AboutScreen from '../screens/libraryShop/AboutScreen';
import BeginningScreen from '../screens/BeginningScreen';
import Colors from '../constants/Colors'
import { useDispatch } from 'react-redux';
import * as loginSignUpActions from '../store/actions/loginsignup'
import { Ionicons } from '@expo/vector-icons'

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const BooksNavigator = createStackNavigator({
    BooksOverview: BooksOverviewScreen,
    BookDetail: BookDetailScreen,
    BookCartRent: CartRentScreen,
    // SearchBook: SearchBookScreen,
}, {
    navigationOptions: {
        drawerIcon: drawerConfig =>
            <Ionicons
                name={Platform.OS === 'android' ? 'md-book' : 'ios-book'}
                size={23}
                color={drawerConfig.tintColor}
            />
    },
    defaultNavigationOptions: defaultNavOptions
});

const ReservationsNavigator = createStackNavigator({
    Reservations: ReservationsScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig =>
            <Ionicons
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={23}
                color={drawerConfig.tintColor}
            />
    },
    defaultNavigationOptions: defaultNavOptions
})

const AdminNavigator = createStackNavigator({
    UserBooks: UserBooksScreen,
    UpdateBook: UpdateBookScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig =>
            <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={drawerConfig.tintColor}

            />
    },
    defaultNavigationOptions: defaultNavOptions
})
const AboutNavigator = createStackNavigator({
    About: AboutScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig =>
            <Ionicons
                name={Platform.OS === 'android' ? 'md-body-outline' : 'ios-list'}
                size={23}
                color={drawerConfig.tintColor}
            />
    },
    defaultNavigationOptions: defaultNavOptions
})

const LibraryNavigator = createDrawerNavigator({
    Books: BooksNavigator,
    History: ReservationsNavigator,
    About: AboutNavigator,
    Admin: AdminNavigator

}, {
    contentOptions: {
        activeTintColor: Colors.primary
    },
    contentComponent: props => {
        const dispatch = useDispatch()
        return (
            <View style={{ flex: 1, padding: 20, paddingTop: 50 }}>
                <SafeAreaView
                    forceInset={{ top: 'always', horizontal: 'never' }}
                >
                    <DrawerNavigatorItems {...props} />
                    <Button title='Sign Out' color={Colors.primary}
                        onPress={() => {
                            dispatch(loginSignUpActions.logout())
                            props.navigation.navigate('LoginSignUp')
                        }}
                    />
                </SafeAreaView>
            </View>
        )
    }
})

const LoginSignUpNavigator = createStackNavigator({
    LoginSignUp: LoginSignUpScreen
}, {
    defaultNavigationOptions: defaultNavOptions
})

const MainNavigator = createSwitchNavigator({
    Beginning: BeginningScreen,
    LoginSignUp: LoginSignUpNavigator,
    Library: LibraryNavigator
})

export default createAppContainer(MainNavigator)