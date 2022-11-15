import React, { Fragment, useState } from "react";
import {
  Image, SafeAreaView,
  ScrollView, Text, TouchableOpacity, View
} from "react-native";
import CustomFooter from "../../components/CustomFooter/CustomFooter";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import Loader from "../../components/CustomLoader/CustomLoader";
import CustomToDo from "../../components/CustomToDo/CustomToDo";
import defaultText from "../../helper/defaultText";
import globalImages from "../../helper/globalImages";
import globalStyles from "../../helper/globalStyles";
import Responce from "../../helper/sampleData";

const MyToDoList = Responce.MyToDoList;

const MyToDo = (props) => {
  const [radioSelected, setRadioSelected] = useState(false);
  const [isCheck, setIsCheck] = useState("");
  const [showLoader, setLoader] = useState(false);

  const onCallBottom = () => {
    /*const formValid = simpleValidator.current.allValid();
    if (!formValid) {
      setAllValid(false);
      simpleValidator.current.showMessages();
    }
    else {
      const payload = {
        mobile: isMobile,
      };
      const { data, message } = await AuthApi.postDataToServer(
        Api.sendOtp,
        payload
      );
      if (!data) {
        return props.navigation.navigate("InvalidNoScreen")
      }
      props.navigation.navigate("Settings", {
        mobile: isMobile,
      });
    }*/
    props.navigation.navigate("AccomplishThisWeekScreen");
  };

  return (
    <Fragment>
      <SafeAreaView style={globalStyles.fragmentStyle_1} />
      <SafeAreaView style={globalStyles.fragmentStyle_2}>
        <View style={globalStyles.topMainContainer}>
          <CustomHeader
            headerTitle={defaultText.greatWork}
            onPressDrawer={() => props.navigation.openDrawer()}
            showDrawerIcon={true}
          />
          {showLoader && <Loader />}
          <ScrollView style={globalStyles.screenMiddleView}>
            <Text style={globalStyles.headerText}>
              {defaultText.greatWorkMiddleHeader}
            </Text>
            <Text style={globalStyles.titleText}>{defaultText.myToDo}</Text>
            <View>
              <CustomToDo
                radioButton
                ToDoList={"Create New Template"}
                onPress={() => setIsCheck("newTemplate")}
                radioSelected={isCheck == "newTemplate"}
              />
            </View>
            <View>
              <CustomToDo
                radioButton
                ToDoList={"Check email"}
                onPress={() => setIsCheck("checkEmail")}
                radioSelected={isCheck == "checkEmail"}
              />
            </View>
            <View>
              <CustomToDo
                radioButton
                ToDoList={"Lunch with emma"}
                onPress={() => setIsCheck("launchWithEmma")}
                radioSelected={isCheck == "launchWithEmma"}
              />
            </View>
            <View>
              <CustomToDo
                radioButton
                ToDoList={"Mediation"}
                onPress={() => setIsCheck("Mediation")}
                radioSelected={isCheck == "Mediation"}
              />
            </View>
          </ScrollView>
          <TouchableOpacity style={globalStyles.myToDoFloatingLabel}>
            <Image
              source={globalImages.add}
              style={globalStyles.myToDoFloatingLabelImage}
            />
          </TouchableOpacity>
          <CustomFooter
            title={defaultText.completeToDoList}
            onPress={() => onCallBottom()}
          />
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default MyToDo;
