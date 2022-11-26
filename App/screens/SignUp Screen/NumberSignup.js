import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Alert, Image, Linking, SafeAreaView, Text, ToastAndroid, ScrollView, View, TextInput, TouchableOpacity } from 'react-native';
import Toast from 'react-native-simple-toast';
import SimpleReactValidator from 'simple-react-validator';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Loader from '../../components/CustomLoader/CustomLoader';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import defaultText from '../../helper/defaultText';
import globalImages from '../../helper/globalImages';
import globalStyles from '../../helper/globalStyles';
import Api from '../../util/api';
import AuthApi from '../../util/authApi';
import CustomModalLogin from '../../components/CustomModalLogin/CustomModalLogin';
import styles from '../../helper/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { async } from 'rxjs';
import { Modal } from 'react-native';
import { Pressable } from 'react-native';

const LoginScreen = props => {

    const CountryData = props.route?.params?.CountryData

    const supportedURL = 'https://donzio.com';
    const onCallUrl = async url => {
        setModal(false);
        await Linking.openURL(url);
    };
    const Mynavigation = useNavigation();
    const simpleValidator = useRef(new SimpleReactValidator());
    const [allValid, setAllValid] = useState(true);
    const [isMobile, setIsMobile] = useState();
    const [showLoader, setLoader] = useState(false);
    const [isModal, setModal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false)
    const [CountryCode, setCountryCode] = useState('+1')


    // const onLogin = async () => {
    //     const formValid = simpleValidator.current.allValid();
    //     if (!formValid) {
    //         setAllValid(false);
    //         simpleValidator.current.showMessages();
    //     } else {
    //         setLoader(true);
    //         const payload = {
    //             pre: CountryCode,
    //             mobile: isMobile,
    //             loginflag: false
    //         };
    //         console.log('payload is as follows ', payload);
    //         const { data, message } = await AuthApi.postDataToServer(Api.sendOtp, payload);
    //         setLoader(false);
    //         if (!data) {

    //             ToastAndroid.show(message, ToastAndroid.LONG)
    //         }
    //         console.log("data", message)
    //         // if (!data) {
    //         //     setModal(true);
    //         //     return;
    //         // }
    //         console.log('*********** data is as follows response ', data);
    //         console.log('*********** code ', data.code);
    //         console.log('*********** data msg ', data.message[0]);
    //         console.log('*********** data token ', data.data);


    //         if (data && data.code == 200 && data.data && data.data && data.action && data.action === "login") {
    //             props.navigation.replace('OtpScreen', {
    //                 mobile: isMobile,
    //                 mobileToken: data.data,
    //                 pre:CountryCode,
    //             });
    //             let msg = data && data.message[0];

    //             setTimeout(() => {
    //                 Toast.show(msg);
    //             }, 100);
    //         }
    //         else if (data.action && data.action === "signup") {
    //             let msg = data && data.message[0];

    //             setTimeout(() => {
    //                 Toast.show(msg);
    //             }, 100);
    //         }
    //     }
    // };

    const onLogin = async () => {
        console.log('came in login function');
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            setAllValid(false);
            simpleValidator.current.showMessages();
        } else {
            console.log('came in form valid haere');
            setLoader(true);
            const payload = {
                pre: CountryCode,
                mobile: isMobile,
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
                Toast.show(msg, Toast.LONG);
            }, 100);
            if (data.code == 200) {
                props.navigation.replace('OtpScreen', {
                    pre: CountryCode,
                    mobile: isMobile,
                    token: data.data,
                    otp: data.otp
                });
            }
            else {
                return
            }
        }
    };
    return (
        <Fragment>
            <SafeAreaView style={globalStyles.fragmentStyle_1} />
            <SafeAreaView style={globalStyles.topMainContainer}>
                <View style={globalStyles.zIndex1}>
                    <CustomHeader headerTitle={defaultText.signUp} />
                </View>
                <View style={globalStyles.loginImageView}>
                    <Image style={globalStyles.loginImageStyle} source={globalImages.clock} />
                </View>
                {showLoader && <Loader />}
                <View>
                    <View style={globalStyles.loginTextView}>
                        <Text style={globalStyles.loginTextScreen}>{defaultText.enterNumber}</Text>
                    </View>
                    <View style={{
                        width: '100%',
                        justifyContent: 'space-between',
                        marginTop: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 1,
                        paddingHorizontal: 10,
                        overflow: 'hidden'
                    }}>

                        <TouchableOpacity onPress={() => { setModalVisible(true) }} style={{ minWidth: 70, height: 46, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#dfe8f4', borderRadius: 8, paddingHorizontal: 2 }}>
                            <Text style={globalStyles.defaultText}>{CountryCode}</Text>
                            <Image source={require('../../assets/down.png')} style={{ width: 20, height: 20, marginLeft: 10 }} />
                        </TouchableOpacity>

                        <TextInput
                            style={globalStyles.loginTextInput}
                            onChangeText={value => setIsMobile(value)}
                            maxLength={10}
                            value={isMobile}
                            placeholder={'Number'}
                            keyboardType='phone-pad'
                            placeholderTextColor={'#00000070'}
                            onBlur={allValid ? null : simpleValidator.current.showMessageFor('isMobile')}

                        />
                    </View>


                    {/* Country Code MOdal */}
                    <Modal transparent={true} visible={modalVisible}>
                        <SafeAreaView
                            style={{
                                backgroundColor: '#000000aa',
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <ScrollView
                                style={{
                                    backgroundColor: '#fff',
                                    padding: 20,
                                    marginVertical: 10,
                                    borderRadius: 15,
                                    width: '90%',

                                }}>
                                <View style={styles.modalContainer}>
                               <Text style={{ textAlign: 'center',color:'#00000070' }}>Please Selct Your Country Code</Text>
                                <TouchableOpacity onPress={()=>{setModalVisible(false)}}>
                                <Image source={globalImages.closeIcon} style={{width:20,height:20}}/>
                                </TouchableOpacity>
                               </View>
                                {CountryData?.map((item) => {
                                    return (
                                        <View>


                                            <TouchableOpacity onPress={() => { setCountryCode(item.phonecode), setModalVisible(false) }} style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5, backgroundColor: '#dfe8f4', borderRadius: 8, padding: 10 }}>
                                                <Text style={globalStyles.defaultText}>{item.name}</Text>
                                                <Text style={globalStyles.defaultText}>{item.phonecode}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </SafeAreaView>
                    </Modal>
                    <View style={globalStyles.loginButtonTopMargin}>
                        <CustomButton buttonName={defaultText.continue} onPress={() => onLogin()} />
                    </View>
                    {/* <TouchableOpacity
                        onPress={() => { Mynavigation.navigate('NumberSignUp') }}
                        style={{ justifyContent: 'center', alignItems: 'center', marginTop: 150 }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#3d95ff', }}>
                            New User?  Please Sign Up
                        </Text>
                    </TouchableOpacity> */}

                    {isModal && (
                        <CustomModalLogin
                            stateStatus={isModal}
                            onPressSecondBtn={() => setModal(false)}
                            onCallUrl={() => onCallUrl(supportedURL)}
                        />
                    )}
                </View>
            </SafeAreaView>
        </Fragment>
    );
};

export default LoginScreen;
