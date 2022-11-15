import React, { Fragment, useRef, useState } from 'react';
import { Alert, Image, Linking, SafeAreaView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
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

const NumberSignUp = props=> {
    console.log('came in login screen');
    const supportedURL = 'https://donzio.com';
    const onCallUrl = async url => {
        setModal(false);
        await Linking.openURL(url);
    };
    const simpleValidator = useRef(new SimpleReactValidator());
    const [allValid, setAllValid] = useState(true);
    const [isMobile, setIsMobile] = useState();
    const [showLoader, setLoader] = useState(false);
    const [isModal, setModal] = useState(false);

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
                mobile: isMobile,
                loginflag:false,
            };
            const { data, message } = await AuthApi.postDataToServer(Api.sendOtp, payload);
            console.log('login response data is as follwos ', data.code);
            setLoader(false);
          
            if (!data) {
                setModal(true);
                return;
            }
            
            let msg = data && data.message[0] && data.message[0];
            setTimeout(() => {
                Toast.show(msg,Toast.LONG);
            }, 100);
            if(data.code==200){
                props.navigation.replace('OtpScreen', {
                    mobile: isMobile,
                    token: data.data,
                    otp:data.otp
                });
            }
            else{
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
                    <View style={globalStyles.loginCustomTextInputView}>
                        <CustomTextInput
                            onChangeText={value => setIsMobile(value)}
                            maxLength={15}
                            placeholder={"+91"}
                            value={isMobile}
                            onBlur={allValid ? null : simpleValidator.current.showMessageFor('isMobile')}
                        />
                        <View
                            style={{
                                marginHorizontal: 27,
                                alignItems: 'center',
                                paddingTop: 30,
                            }}
                        >
                            {/* <TouchableOpacity
                                onPress={() => {
                                    props.navigation.navigate('LoginScreen');
                                }}
                            >
                                <Text style={{ fontSize: 16, fontWeight: '500', color: '#3d95ff' }}>
                                    Existing User? Sign in
                                </Text>
                            </TouchableOpacity> */}
                        </View>
                        {
                            <Text style={globalStyles.simpleErrorMsg}>
                                {simpleValidator.current.message('Mobile Number', isMobile, 'required|phone|max:15')}
                            </Text>
                        }
                    </View>
                    <View style={globalStyles.loginButtonTopMargin}>
                        <CustomButton buttonName={defaultText.continue} onPress={() => onLogin()} />
                    </View>
                    {isModal && (
                        <CustomModalLogin

                            stateStatus={isModal}
                            onPressSecondBtn={() => setModal(false)}
                            onCallUrl={() => onCallUrl(supportedURL)}
                        />
                    )}
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
            </SafeAreaView>
        </Fragment>
    );
};

export default NumberSignUp;
// const styles = StyleSheet.create({
//     continuebtn: {
//         margintop: ActualHeight(5),
//         alignSelf: 'center',
//     },
// });
