import React, { Fragment, useRef, useState } from 'react';
import Toast from 'react-native-simple-toast';
import { Text, View, Dimensions, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Api from '../../util/api';
import AuthApi from '../../util/authApi';
import defaultText from '../../helper/defaultText';
import globalStyles from '../../helper/globalStyles';

const OtpScreen = props => {

    const userOtp = props.route.params.otp;
    const userNum = props.route.params.mobile;
    const userToken = props.route.params.token;
    const pre = props.route.params.pre;
    console.log("first",pre)
    const [otp, setOtp] = useState('');
    const [loader,setLoader] = useState(false)
    const onSubmit = () => {
        console.log('otp is ', otp);
        if (otp == userOtp) {
            // let payload = {
            //     token: props.route.params.token,
            //     otp: otp,
            // };
            // const { data, message } = await AuthApi.postDataToServer(Api.verifyUser, payload);
            // if (data && data.code == 200) {
            Toast.show('User Verified');
            props.navigation.navigate('SignUpScreen', {
                mobile: userNum,
                pre:pre,
                token: userToken,
                otp: userOtp
            });
            // }
        }
        else if (otp == '') {
            Toast.show('Enter mobile otp');
        }
        else {
            Toast.show('Enter corect otp please');
        }
    };

    const onLogin = async () => {

        setLoader(true);
        const payload = {
            mobile: userNum,
            loginflag: false,
        };
        const { data, message } = await AuthApi.postDataToServer(Api.sendOtp, payload);
        console.log('login response data is as follwos ', data);
        setLoader(false);

        if (!data) {
            setModal(true);
            return;
        }
        let msg = data && data.message[0] && data.message[0];
        setTimeout(() => {
            Toast.show(msg);
        }, 100);
    };

    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <Image style={styles.logo} source={require('../../assets/Clock.png')} resizeMode="contain" />
                <Text style={styles.verifyText}>Verification !</Text>
            </View>
            <View style={styles.footer}>
                <Text style={globalStyles.loginTextScreen}>
                    Enter your one time password
                </Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Enter One-Time Password"
                        placeholderTextColor={'#00000070'}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={text => setOtp(text)}
                    />
                </View>
                <TouchableOpacity onPress={()=>{onLogin()}}>
                    <Text style={styles.resend}>Resend Otp ?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
                    <Text style={styles.button_text}>Submit</Text>
                </TouchableOpacity>
                <View style={globalStyles.mt_10per}>
                    <Text
                        onPress={() => {
                            props.navigation.replace('NumberSignUp');
                        }}
                        style={globalStyles.textAlignCenter}
                    >
                        {defaultText.back}
                    </Text>
                </View>
            </View>
        </View>
    );
};
export default OtpScreen;
const { height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3d95ff',
    },
    Header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 30,
    },
    text_header: {
        color: '#fff',
        fontSize: 30,
        fontWeight: '600',
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderColor: 'rgb(217,217,214)',
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 10,
        height: 45,
        paddingLeft: 15,
    },
    textInput: {
        flex: 1,
        color: '#00000070',
    },
    button: {
        alignItems: 'center',
        marginTop: 18,
        backgroundColor: '#3d95ff',
        borderRadius: 15,
        width: '100%',
        height: 45,
        justifyContent: 'center',
    },
    button_text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
    },
    logo: {
        height: 110,
        width: '100%',
        tintColor: 'rgba(255, 255, 255,0.8)',
    },
    resend: { fontSize: 16, fontWeight: '500', color: '#3d95ff', margin: 8 },
    // signUp: {
    //     width: '100%',
    //     height: ActualHeight(50),
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: ActualWidth(10),
    // },
    existing: {
        fontSize: 16,
        fontWeight: '500',
        color: '#3d95ff',
        margin: 8,
        marginTop: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    verifyText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '600',
    },
    back: {
        color: '#000',
        fontSize: 16,
        margin: 8,
        marginTop: 25,
        fontWeight: '500',
    },
});
