import React, { Fragment, useRef, useState, useEffect } from "react";
import { Image, SafeAreaView, ScrollView, Text, View, Modal, TouchableOpacity } from "react-native";
import Toast from "react-native-simple-toast";
import SimpleReactValidator from "simple-react-validator";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import defaultText from "../../helper/defaultText";
import globalImages from "../../helper/globalImages";
import globalStyles from "../../helper/globalStyles";
import Api from "../../util/api";
import AuthApi from "../../util/authApi";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-gesture-handler";
import styles from "../../helper/globalStyles";

const InviteByPhone = (props) => {
  const simpleValidator = useRef(new SimpleReactValidator());
  const [allValid, setAllValid] = useState(true);
  const [isMobile, setIsMobile] = useState(null);
  const [isFirstName, setIsFirstName] = useState(null);
  const [isLastName, setIsLastName] = useState(null);
  const [CountryData, setCountryData] = useState()
  const [CountryCode, setCountryCode] = useState('+1')
  const [modalVisible, setModalVisible] = useState(false)
  const [loader, setLoader] = useState(false)
  const [lastError, setLastError] = useState('');
  const onCallContinue = async () => {
    const formValid = simpleValidator.current.allValid();
    if (!formValid) {
      setAllValid(false);
      simpleValidator.current.showMessages();
    } else {
      const payload = {
        first_name: isFirstName,
        last_name: isLastName,
        pre: CountryCode,
        mobile: isMobile,

      };
      const { data, message } = await AuthApi.postDataToServer(
        Api.employee,
        payload
      );
      if (!data) {
        Toast.show(message);
        return;
      }
      Toast.show(data.message && data.message[0] && data.message[0]);
      props.navigation.navigate("TeamMembers");
    }
  };

  const GetCountryData = async () => {
    setLoader(true)
    const { data, message } = await AuthApi.getDataFromServer(Api.GetCountry);
    setLoader(false);
    if (!data) {

      ToastAndroid.show(message, ToastAndroid.LONG)
    }
    console.log("message", message)
    console.log('*********** data data ', data?.data);

    setCountryData(data?.data)

  }

  const onChange = async () => {
    if (isMobile === null) {
      setFirtError('* Enter Your Mobile Number');
    }
  }


  useEffect(() => {
    GetCountryData()
  }, [])

  return (
    <Fragment>
      <SafeAreaView style={globalStyles.fragmentStyle_1} />
      <SafeAreaView style={globalStyles.topMainContainer}>
        <View>
          <CustomHeader
            onPressBack={() => props.navigation.goBack()}
            name={defaultText.addNewTeamMember}
            additional={true}
            plusIcon={true}
            onPressPlus={() => props.navigation.navigate("")}
            onPressDrawer={() => props.navigation.openDrawer()}
            showDrawerIcon={true}
          />
        </View>
        <KeyboardAwareScrollView
          style={globalStyles.scroll}
          extraScrollHeight={20}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
        >
          <View style={globalStyles.inviteByPhoneImageView}>
            <Image
              style={globalStyles.inviteByPhoneImageViewIcon}
              source={globalImages.profileBlue}
            />
          </View>
          <View style={globalStyles.addNumberView}>
            <Text style={globalStyles.addNumberText}>
              {defaultText.inviteNumber}
            </Text>
          </View>
          <View style={globalStyles.inviteByPhoneTextInputView}>
            <CustomTextInput
              placeholder="First Name"
              onChangeText={(value) => setIsFirstName(value)}
              maxLength={10}
              onBlur={
                allValid
                  ? null
                  : simpleValidator.current.showMessageFor("isFirstName")
              }
            />
            {
              <Text style={globalStyles.simpleErrorMsg}>
                {simpleValidator.current.message(
                  "First name",
                  isFirstName,
                  "required"
                )}
              </Text>
            }
          </View>
          <View style={{ marginTop: 10 }}>
            <CustomTextInput
              placeholder="Last Name"
              onChangeText={(value) => setIsLastName(value)}
              maxLength={10}
              onBlur={
                allValid
                  ? null
                  : simpleValidator.current.showMessageFor("isLastName")
              }
            />
            {
              <Text style={globalStyles.simpleErrorMsg}>
                {simpleValidator.current.message(
                  "last name",
                  isLastName,
                  "required"
                )}
              </Text>
            }
          </View>
          <View style={{
            width: '90%',
            justifyContent: 'space-between',
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 1,
            paddingHorizontal: 10,
            alignSelf: 'center',
            overflow: 'hidden'
          }}>

            <TouchableOpacity onPress={() => { console.log(CountryCode.length), setModalVisible(true) }} style={{ minWidth: '15%', height: 46, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#dfe8f4', borderRadius: 8, paddingHorizontal: 3 }}>
              <Text style={globalStyles.defaultText}>{CountryCode}</Text>
              <Image source={require('../../assets/down.png')} style={{ width: 20, height: 20, marginLeft: 8 }} />
            </TouchableOpacity>

            <TextInput
              style={{ width: '78%', marginLeft: CountryCode.length > 3 ? 3 : 10, backgroundColor: '#dfe8f4',color:'#00000070', paddingHorizontal: 10, borderRadius: 8, }}
              keyboardType="numeric"
              placeholder="Mobile Number"
              placeholderTextColor={'#00000070'}
              onChangeText={(value) => {
                setLastError('')
                setIsMobile(value)
              }}
              maxLength={10}

            />
            {
              <Text style={globalStyles.simpleErrorMsg}>
                {lastError}
              </Text>
            }
          </View>
          {/* <View style={{ marginTop: 10 }}>
            <CustomTextInput
              keyboardType="numeric"
              placeholder="Mobile Number"
              onChangeText={(value) => setIsMobile(value)}
              maxLength={10}
              onBlur={
                allValid
                  ? null
                  : simpleValidator.current.showMessageFor("isMobile")
              }
            />
          
          </View> */}


          {/* modal */}
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
                  <TouchableOpacity onPress={() => { setModalVisible(false) }}>
                    <Image source={globalImages.closeIcon} style={{ width: 20, height: 20 }} />
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


          <View style={globalStyles.inviteByPhoneButtonTopMargin}>
            <CustomButton
              buttonName={defaultText.invite}
              onPress={() => { onCallContinue(), onChange() }}
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default InviteByPhone;
