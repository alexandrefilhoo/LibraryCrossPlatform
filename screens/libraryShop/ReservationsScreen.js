//A screen to view our rents
import React, { useEffect, useState } from 'react'
import { FlatList, Text, Platform, ActivityIndicator, View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import ReservationItem from '../../components/libraryShop/ReservationItem';
import * as reservationsActions from '../../store/actions/reservations'
import Colors from '../../constants/Colors';

const ReservationsScreen = props => {

    const [isLoading, setIsLoading] = useState(false)
    const reservations = useSelector(state => state.reservations.reservations)

    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true)
        dispatch(reservationsActions.fetchReservations()).then(() => {
            setIsLoading(false)
        })
    }, [useDispatch])

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    if (reservations.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No reservations found. Your reservations will appear here</Text>
            </View>
        )
    }
    return (
        <LinearGradient colors={['#c8e6c9', '#fff9c4']} style={styles.gradient}>

            <FlatList
                data={reservations}
                keyExtractor={item => item.id}
                renderItem={itemData => <ReservationItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                />}
            />
        </LinearGradient>
    )
}
ReservationsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Reservations',
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

export default ReservationsScreen;