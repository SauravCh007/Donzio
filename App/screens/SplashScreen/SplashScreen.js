import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, SafeAreaView } from "react-native";
import Color from "../../helper/defaultColor";
import globalImages from "../../helper/globalImages";
import globalStyles from "../../helper/globalStyles";
import Api from "../../util/api";
import AuthApi from "../../util/authApi";

const SplashScreen = (props) => {
  useEffect(() => {
    onPageInit();
  }, []);

  const onPageInit = async () => {
    await getCurrentDate();
    await isTokenActive();
  };

  const isTokenActive = async () => {
    const data = await AsyncStorage.getItem("usertoken");
    if (!data) {
      setTimeout(() => {
        props.navigation.replace("LoginScreen");
      }, 1000);
      return;
    }
    setTimeout(() => {
      props.navigation.replace("DrawerNaviation");
    }, 1000);
  };

  const getCurrentDate = async () => {
    let date = await new Date();
    await AsyncStorage.setItem("assignedDate", JSON.stringify(date));
  };

  return (
    <SafeAreaView style={globalStyles.SplashScreenView}>
      <Image
        style={globalStyles.SplashScreenImage}
        source={globalImages.clock}
      />
      <ActivityIndicator color={Color.primaryColor} size="large" />
    </SafeAreaView>
  );
};

export default SplashScreen;
