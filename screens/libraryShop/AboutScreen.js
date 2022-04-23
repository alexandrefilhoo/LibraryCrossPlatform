import React, { useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import { Text, StyleSheet, View, Image, Platform, Linking, Button } from 'react-native';
import Colors from '../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';

const studentLinkedInURL = 'https://www.linkedin.com/in/alexandro-filho-850b91184/'
const SupervisorLinkedInURL = 'https://www.linkedin.com/in/habougrad/'

const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Invalid URL: ${url}`);
        }
    }, [url]);
    return <AntDesign
        title={children}
        onPress={handlePress}
        name={Platform.OS === 'android' ? 'linkedin-square' : 'linkedin-square'}
        size={40}
        color={Colors.primary}

    />;
};

const AboutScreen = () => {
    return (
        <LinearGradient colors={['#c8e6c9', '#fff9c4']} style={styles.gradient}>

            <View style={styles.centered}>
                <View style={styles.container}>
                    <Text style={styles.text}>Student: Alexandro Filho </Text>
                    <Image
                        source={require('../../assets/Alex.jpg')}
                        style={styles.picture}
                    />
                </View>
                <View style={styles.container}>
                    <Text style={styles.text}>Connect with Alexandro on</Text>
                    <OpenURLButton url={studentLinkedInURL}/>
                </View>
            </View>
            <View style={styles.centered}>
                <View style={styles.container}>
                    <Text style={styles.text}>Supervisor: Dr. Hisham AbouGrad </Text>
                    <Image
                        source={require('../../assets/DrHisham.jpg')}
                        style={styles.picture}
                    />
                </View>
                <View style={styles.container}>
                    <Text style={styles.text}>Connect with Dr. Hisham on</Text>
                    <OpenURLButton url={SupervisorLinkedInURL} />
                </View>
            </View>
        </LinearGradient>
    )
}

AboutScreen.navigationOptions = navData => {
    return {
        headerTitle: 'About the App',
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
    },
    container: {
        marginTop: 1,
        justifyContent: 'center',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 20,
        borderRadius: 10,
        backgroundColor: Colors.boxBackground,
        alignItems: 'center',
        backgroundColor: '#f1f8e9',
        paddingLeft: 30,
        paddingRight: 30

    },
    picture: {
        width: 130,
        height: 130,
        borderRadius: 65,
        margin: 10
    },
    imageContainer: {
        height: 20,
        justifyContent: 'center',
    },
    text:{
        fontFamily:'open-sans-bold',
        fontSize: 14
    }

})

export default AboutScreen;