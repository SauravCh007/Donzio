import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Fragment, useRef, useState } from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
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

const VerificationCodeScreen = props => {
    const simpleValidator = useRef(new SimpleReactValidator());
    const [allValid, setAllValid] = useState(true);
    const [isVerifyCode, setIsVerifyCode] = useState('');
    const [showLoader, setLoader] = useState(false);

    const mobileToken = props.route.params.mobileToken;
    const onCallContinue = async () => {
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            setAllValid(false);
            simpleValidator.current.showMessages();
        }
        setLoader(true);
        const payload = {
            token: mobileToken,
            otp: isVerifyCode,
        };
        const { data, message } = await AuthApi.postDataToServer(Api.loginVerifyOtp, payload);
        console.log('verify otop response is as follows ', data);
        console.log('verify otop response is as  ', data.data.token.access_token);
        setLoader(false);
        if (!data) {
            return Toast.show('Invalid OTP');
        }

        if (
            data &&
            data.code == 200 &&
            data.data.token &&
            data.data.token.access_token
        ) {
            await AsyncStorage.setItem('usertoken', JSON.stringify(data.data.token.access_token));
            await AsyncStorage.setItem('userData', JSON.stringify(data.data));
            Toast.show('OTP Verified');
            props.navigation.replace('DrawerNaviation');
        }
    };

    return (
        <Fragment>
            <SafeAreaView style={globalStyles.fragmentStyle_1} />
            <SafeAreaView style={globalStyles.topMainContainer}>
                <View>
                    <CustomHeader headerTitle={defaultText.signIn} />
                </View>
                {showLoader && Loader}
                <View style={globalStyles.height_100}>
                    <View style={globalStyles.verificationCodeView}>
                        <Text style={globalStyles.verificationCodeTextScreen}>{defaultText.verificationText}</Text>
                    </View>
                    <View style={globalStyles.verificationCodeTextView}>
                        <CustomTextInput
                            keyboardType="numeric"
                            onChangeText={value => setIsVerifyCode(value)}
                            maxLength={6}
                            onBlur={allValid ? null : simpleValidator.current.showMessageFor('isVerifyCode')}
                        />
                        {
                            <Text style={globalStyles.simpleErrorMsg}>
                                {simpleValidator.current.message(
                                    'Verification Code',
                                    isVerifyCode,
                                    'required|integer|min:6|max:6',
                                )}
                            </Text>
                        }
                    </View>
                    <View style={globalStyles.verificationCodeButtonTopMargin}>
                        <CustomButton buttonName={defaultText.signIn} onPress={() => onCallContinue()} />
                    </View>
                    <View style={globalStyles.mt_10per}>
                        <Text
                            onPress={() => {
                                props.navigation.replace('LoginScreen');
                            }}
                            style={globalStyles.textAlignCenter}
                        >
                            {defaultText.back}
                        </Text>
                    </View>
                </View>
                <View style={globalStyles.verificationCodeImageView}>
                    <Image style={globalStyles.verificationCodeImageStyle} source={globalImages.clock} />
                </View>
            </SafeAreaView>
        </Fragment>
    );
};
export default VerificationCodeScreen;
