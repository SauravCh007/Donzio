import React, { Fragment, useRef, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
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

const InviteByPhone = (props) => {
  const simpleValidator = useRef(new SimpleReactValidator());
  const [allValid, setAllValid] = useState(true);
  const [isMobile, setIsMobile] = useState(null);
  const [isFirstName, setIsFirstName] = useState(null);
  const [isLastName, setIsLastName] = useState(null);

  const onCallContinue = async () => {
    const formValid = simpleValidator.current.allValid();
    if (!formValid) {
      setAllValid(false);
      simpleValidator.current.showMessages();
    } else {
      const payload = {
        mobile: isMobile,
        first_name: isFirstName,
        last_name: isLastName,
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
          <View style={{ marginTop: 10 }}>
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
            {
              <Text style={globalStyles.simpleErrorMsg}>
                {simpleValidator.current.message(
                  "Mobile Number",
                  isMobile,
                  "required|phone|max:10"
                )}
              </Text>
            }
          </View>
          <View style={globalStyles.inviteByPhoneButtonTopMargin}>
            <CustomButton
              buttonName={defaultText.invite}
              onPress={() => onCallContinue()}
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default InviteByPhone;
