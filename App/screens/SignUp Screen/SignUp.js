import React, { Fragment, useRef, useState } from 'react';
import Toast from 'react-native-simple-toast';
import { Text, View, Button, Dimensions, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../../components/CustomLoader/CustomLoader';
import SimpleReactValidator from 'simple-react-validator';
import Api from '../../util/api';
import AuthApi from '../../util/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../../components/customeDrop/CustomTextInput';
import { useEffect } from 'react';
const SignUpScreen = props => {
    const mobileNum = props.route.params.mobile
    const token = props.route.params.token
    const userOtp = props.route.params.otp
    const dummy = [
        {
            'id': '1',
            label: 'Dillon and Mccoy Trading',
            value: 'Dillon and Mccoy Trading '
        },
        {
            'id': '1',
            label: 'abc',
            value: 'abc '
        },
        {
            'id': '1',
            label: 'abc',
            value: 'abc '
        },
        {
            'id': '1',
            label: 'abc',
            value: 'abc '
        }
    ]
    console.log(mobileNum, token, userOtp)


    const [firtName, setFirtName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [COmpanyId, setCOmpanyId] = useState();
    const [firtError, setFirtError] = useState('');
    const [lastError, setLastError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const simpleValidator = useRef(new SimpleReactValidator());
    const [allValid, setAllValid] = useState(true);
    const [showLoader, setLoader] = useState(false);
    const [companyData, setCompanyData] = useState(false);

    console.log("companyName",companyName,COmpanyId)
    const createlist = (type, item) => {
        return {
            label: item[type],
            value: item[type],
            id: item.id,
        };
    };

    const getCompanyName = async () => {
        setLoader(true);
        const { data, message } = await AuthApi.getDataFromServer(Api.companyApi);
        let arr = data.data?.map(item => {
            return createlist('name', item);
        });
        setCompanyData(arr)
        console.log("getOptionListing", arr)
        setLoader(false);
        if (!data) {
            return;
        } else {
            // setListingData(data.data);
        }
    };


    useEffect(() => {
        getCompanyName()
    }, [])
    const onCallContinue = async () => {
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            setAllValid(false);
            simpleValidator.current.showMessages();
        }

        setLoader(true);
        const payload = {
            first_name: firtName,
            last_name: lastName,
            mobile: mobileNum,
            company: COmpanyId,
            token: token,
            otp: userOtp,
        };
        const { data, message } = await AuthApi.postDataToServer(Api.register, payload);
        console.log('verify otop response is as follows ', data);
        console.log('verify otop response is as token ', data.token.access_token);
        setLoader(false);

        if (!data) {
            return Toast.show('Invalid OTP');
        }
        if (
            data &&
            data.code == 200 &&
            data.token &&
            data.token.access_token
        ) {
            await AsyncStorage.setItem('usertoken', JSON.stringify(data.token.access_token));
            await AsyncStorage.setItem('userData', JSON.stringify(data.data));
            Toast.show('OTP Verified');
            props.navigation.replace('DrawerNaviation');
        }
    };

    const onChange = async () => {
        if (firtName == '') {
            setFirtError('* Enter Your First Name');
        } else if (lastName == '') {
            setLastError('* Enter Your Last Name');
        } else {
            onCallContinue()
        }
    };
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.Header}>
                    <Image style={styles.logo} source={require('../../assets/Clock.png')} resizeMode="contain" />
                    <Text style={styles.text_header}>Register Now!</Text>
                </View>
                {showLoader && <Loader />}
                <View style={styles.footer}>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Enter Your First Name"
                            style={styles.textInput}
                            autoCapitalize="none"
                            value={firtName}
                            onChangeText={v => {
                                setFirtName(v);
                                setFirtError('');
                            }}
                        />
                    </View>
                    <Text style={{ color: 'red', alignSelf: 'flex-start' }}>{firtError}</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Enter Your Last Name"
                            style={styles.textInput}
                            autoCapitalize="none"
                            value={lastName}
                            onChangeText={v => {
                                setLastName(v);
                                setLastError('');
                            }}
                        />
                    </View>
                    <Text style={{ color: 'red', alignSelf: 'flex-start' }}>{lastError}</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Enter Your Number"
                            style={styles.textInput}
                            autoCapitalize="none"
                            editable={false}
                            value={mobileNum}
                            onChangeText={v => {
                                setMobile(v);
                                setMobileError('');
                            }}
                        />
                    </View>
                    <Text style={{ color: 'red', alignSelf: 'flex-start' }}>{mobileError}</Text>
                    {/* <View style={styles.action}> */}
                    <CustomTextInput type='dropdown'
                        data={companyData}
                        Inlinestyle={styles.inlineInput}
                        placeholderTextColor={'#fff'}
                        placeholder={"Select your Company (Optional)"}
                        onSelect={text => {
                           setCompanyName(text)
                            setCOmpanyId(text.id)
                            console.log(text.value)
                        }}
                        value={companyName}
                        dropView={styles.dropView}
                        myDropDownViewStyle={styles.myDropDownViewStyle}
                        />
                    {/* <TextInput
                            placeholder="Enter Company Id  (Optoinal)"
                            style={styles.textInput}
                            autoCapitalize="none"
                            value={company}
                            keyboardType={'number-pad'}
                            onChangeText={v => {
                                setCompany(v);
                            }}
                        /> */}
                    {/* </View> */}

                    <TouchableOpacity style={styles.button} onPress={() => onChange()}>
                        <Text style={styles.button_text}>Submit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('LoginScreen');
                        }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#3d95ff', marginTop: 20 }}>
                            Existing User? Sign in
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};
export default SignUpScreen;
// const { height } = Dimensions.get('screen');

const fullwidth = Dimensions.get('window').width;
const fullheight = Dimensions.get('window').height;

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
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    text_header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '600',
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 8,
        borderColor: 'rgb(217,217,214)',
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 8,
        height: 45,
        paddingLeft: 15,
    },
    textInput: {
        flex: 1,
        color: 'grey',
        paddingLeft: 10,
        fontSize: 15,
        fontWeight: '500',
    },
    button: {
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#3d95ff',
        borderRadius: 15,
        height: 45,
        justifyContent: 'center',
        width: '100%',
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
        padding: 50,
        tintColor: 'rgba(255, 255, 255,0.8)',
    },
    signUp: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    dropView: {
        width: fullwidth * 0.85,
        padding: 5
    },
    myDropDownViewStyle: {
        width: '100%',
        backgroundColor:'#69696950',
        marginVertical:5,
    },

});
