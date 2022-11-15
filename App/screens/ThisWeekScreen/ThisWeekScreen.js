import React, { Fragment, useEffect, useState } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-simple-toast";
import CustomFooter from "../../components/CustomFooter/CustomFooter";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import Loader from "../../components/CustomLoader/CustomLoader";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import defaultText from "../../helper/defaultText";
import globalImages from "../../helper/globalImages";
import globalStyles from "../../helper/globalStyles";
import Api from "../../util/api";
import AuthApi from "../../util/authApi";

const ThisWeekScreen = (props) => {
  const [Name, setName] = useState([{ content: "" }]);
  const [showFooter, setShowFooter] = useState(false);
  const [isErrorShown, setErrorShown] = useState(false);
  const [indexOfArray, setIndexOfArray] = useState(0);
  const [showLoader, setLoader] = useState(false);

  const addName = () => {
    if (Name[Name.length - 1].content.length == 0) {
      setErrorShown(true);
      setIndexOfArray(Name.length - 1);
    } else {
      setErrorShown(false);
      const allName = [...Name];
      allName.push({ content: "" });
      setName([...allName]);
    }
  };

  useEffect(() => {
    let isNotEmpty =
      Name &&
      Name.filter((e) => {
        return e.content.length > 0;
      });
    if (isNotEmpty.length > 0) {
      setShowFooter(true);
    } else {
      setShowFooter(false);
    }
  }, [Name]);

  // Function to remove specific Name from list. Call this method on any button
  const removeName = (index) => {
    const allName = [...Name];
    allName.splice(index, 1);
    setName([...allName]);
  };

  const onCallBottom = async () => {
    const contents_data = [];
    for (var i = 0; i < Name.length; i++) {
      if (Name[i].content.length !== 0) {
        contents_data.push(Name[i]);
      }
    }
    const payload = {
      contents_data: contents_data,
    };
    
    setLoader(true);
    const { data, message } = await AuthApi.postDataToServer(
      Api.toBeTasks,
      payload
    );
    setLoader(false);
    if (!data) {
      setTimeout(() => {
        Toast.show(message);
      }, 500);
      return;
    }
    props.navigation.navigate("AccomplishThisWeekScreen");
    setName([{ content: "" }]);
  };

  return (
    <Fragment>
      <SafeAreaView style={globalStyles.fragmentStyle_1} />
      <SafeAreaView
        style={
          showFooter
            ? globalStyles.fragmentStyle_2
            : globalStyles.fragmentStyle_3
        }
      >
        <View style={globalStyles.topMainContainer}>
          <CustomHeader
            headerTitle={defaultText.greatWork}
            onPressDrawer={() => props.navigation.openDrawer()}
            showDrawerIcon={true}
          />
          {showLoader && <Loader />}
          <KeyboardAwareScrollView
            style={globalStyles.scroll}
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
          >
            <View style={globalStyles.thisWeekImageView}>
              <Image
                style={globalStyles.thisWeekImageStyle}
                source={globalImages.robotDog}
              />
            </View>
            <View style={globalStyles.marginMinus70}>
              <Text style={globalStyles.thisWeekText}>
                {defaultText.whatDoYouWant}
              </Text>
              <Text style={globalStyles.thisWeekText}>
                <Text style={globalStyles.underlinedText}>
                  {defaultText.toBe}
                </Text>
                {defaultText.ThisWeek}
              </Text>
            </View>

            <View style={globalStyles.accNewTextInputView}>
              {Name &&
                Name.map((item, itemIndex) => (
                  <View style={globalStyles.accScreenBottom30} key={itemIndex}>
                    <CustomTextInput
                      multiNumber={true}
                      number={itemIndex + 1}
                      value={item.content}
                      onChangeText={(e) => {
                        Name[itemIndex].content = e;
                        if (e.length > 0) {
                          setShowFooter(true);
                        }
                        setName([...Name]);
                      }}
                    />
                    {isErrorShown && Name[itemIndex].content == "" && (
                      <Text style={globalStyles.textInputErrorMsg}>
                        {defaultText.textInputErrorMsg}
                      </Text>
                    )}
                  </View>
                ))}
            </View>
          </KeyboardAwareScrollView>
          {Name && Name.length < 5 && (
            <TouchableOpacity
              onPress={() => {
                if (Name && Name.length < 5) addName();
              }}
              style={
                showFooter
                  ? globalStyles.myToDoFloatingLabel
                  : [globalStyles.myToDoFloatingLabel, { marginBottom: 30 }]
              }
            >
              <Image
                source={globalImages.add}
                style={globalStyles.myToDoFloatingLabelImage}
              />
            </TouchableOpacity>
          )}

          {showFooter && (
            <View style={globalStyles.bottomTab}>
              <CustomFooter
                title={defaultText.completeToDoList}
                onPress={() => onCallBottom()}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </Fragment>
  );
};
export default ThisWeekScreen;
