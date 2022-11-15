import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import InvalidNoScreen from '../screens/InvalidNoScreen/InvalidNoScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import NumberSignUp from '../screens/SignUp Screen/NumberSignup';
import OtpScreen from '../screens/SignUp Screen/OtpScreen';
import SignUpScreen from '../screens/SignUp Screen/SignUp';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import VerificationCodeScreen from '../screens/VerificationCodeScreen/VerificationCodeScreen';
import DrawerNav from './DrawerNavigation';

const Stack = createStackNavigator();
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode={'none'} initialRouteName={'SplashScreen'}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="NumberSignUp" component={NumberSignUp}/>
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                <Stack.Screen name="OtpScreen" component={OtpScreen} />
                <Stack.Screen name="VerificationCodeScreen" component={VerificationCodeScreen} />
                <Stack.Screen name="InvalidNoScreen" component={InvalidNoScreen} />
                <Stack.Screen name="DrawerNaviation" component={DrawerNav} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default Navigation;
