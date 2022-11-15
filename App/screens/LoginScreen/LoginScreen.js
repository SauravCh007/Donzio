import React, { Fragment, useRef, useState } from 'react';
import { Alert, Image, Linking, SafeAreaView, Text, ToastAndroid, View } from 'react-native';
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../helper/globalStyles';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = props => {
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

    const onLogin = async () => {
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            setAllValid(false);
            simpleValidator.current.showMessages();
        } else {
            setLoader(true);
            const payload = {
                mobile: isMobile,
                loginflag: true
            };
            console.log('payload is as follows ', payload);
            const { data, message } = await AuthApi.postDataToServer(Api.sendOtp, payload);
            setLoader(false);
            if(!data){

                ToastAndroid.show(message , ToastAndroid.LONG)
            }
            console.log("data",message)
            // if (!data) {
            //     setModal(true);
            //     return;
            // }
            console.log('*********** data is as follows response ', data);
            console.log('*********** code ', data.code);
            console.log('*********** data msg ', data.message[0]);
            console.log('*********** data token ', data.data);


            if (data && data.code == 200 && data.data && data.data && data.action && data.action === "login") {
                props.navigation.replace('VerificationCodeScreen', {
                    mobile: isMobile,
                    mobileToken: data.data,
                });
                let msg = data && data.message[0];

                setTimeout(() => {
                    Toast.show(msg);
                }, 100);
            }
            else if (data.action && data.action === "signup") {
                let msg = data && data.message[0];

                setTimeout(() => {
                    Toast.show(msg);
                }, 100);
            }
        }
    };

    return (
        <Fragment>
            <SafeAreaView style={globalStyles.fragmentStyle_1} />
            <SafeAreaView style={globalStyles.topMainContainer}>
                <View style={globalStyles.zIndex1}>
                    <CustomHeader headerTitle={defaultText.signIn} />
                </View>
                <View style={globalStyles.loginImageView}>
                    <Image style={globalStyles.loginImageStyle} source={globalImages.clock} />
                </View>
                {showLoader && <Loader />}
                <View>
                    <View style={globalStyles.loginTextView}>
                        <Text style={globalStyles.loginTextScreen}>{defaultText.enterNumber}</Text>
                    </View>
                    <View style={globalStyles.loginCustomTextInputView}>
                        <CustomTextInput
                            // keyboardType="numeric"

                            onChangeText={value => setIsMobile(value)}
                            maxLength={20}
                            value={isMobile}
                            placeholder={"+91"}
                            onBlur={allValid ? null : simpleValidator.current.showMessageFor('isMobile')}
                        />
                        {
                            <Text style={globalStyles.simpleErrorMsg}>
                                {simpleValidator.current.message('Mobile Number', isMobile, 'required|phone|max:20')}
                            </Text>
                        }
                    </View>
                    <View style={globalStyles.loginButtonTopMargin}>
                        <CustomButton buttonName={defaultText.continue} onPress={() => onLogin()} />
                    </View>
                    <TouchableOpacity
                        onPress={() => { Mynavigation.navigate('NumberSignUp') }}
                        style={{ justifyContent: 'center', alignItems: 'center', marginTop: 150 }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#3d95ff', }}>
                            New User?  Please Sign Up
                        </Text>
                    </TouchableOpacity>

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
