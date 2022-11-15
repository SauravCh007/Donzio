import { useFocusEffect } from "@react-navigation/native";
import React, { Fragment, useState } from "react";
import {
  Image, SafeAreaView,
  ScrollView, Text, TouchableOpacity, View
} from "react-native";
import Toast from "react-native-simple-toast";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import Loader from "../../components/CustomLoader/CustomLoader";
import Color from "../../helper/defaultColor";
import defaultText from "../../helper/defaultText";
import globalImages from "../../helper/globalImages";
import globalStyles from "../../helper/globalStyles";
import Api from "../../util/api";
import AuthApi from "../../util/authApi";
import CustomSettingsOptionView from "./CustomSettingsOptionView";

const Settings = (props) => {
  const [teamMemberListing, setTeamMemberListing] = useState([]);
  const [showLoader, setLoader] = useState(false);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [isRoleCheck, setRoleCheck] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPages: 1,
    pageLimit: 10,
    totalCount: 0,
  });

  useFocusEffect(
    React.useCallback(() => {
      onPageInit();
    }, [])
  );

  const onPageInit = async () => {
    await teamMemberList();
    await getProfileDetails();
  };

  const getProfileDetails = async () => {
    setLoader(true);
    const { data, message } = await AuthApi.getDataFromServer(Api.profile);
    setLoader(false);
    if (!data) {
      Toast.show(message);
      return;
    } else {
      setRoleCheck(data.data.role_id);
    }
    setDataLoaded(true);
  };

  const teamMemberList = async () => {
    setLoader(true);
    const { data, message } = await AuthApi.getDataFromServer(Api.employee);
    setLoader(false);
    if (!data) {
      return;
    } else {
      setTeamMemberListing(data.data);
    }
    setDataLoaded(false);
  };

  return (
    <Fragment>
      <SafeAreaView style={globalStyles.fragmentStyle_1} />
      <SafeAreaView
        style={[
          globalStyles.fragmentStyle_2,
          { backgroundColor: Color.simpleGrey },
        ]}
      >
        <View style={globalStyles.topMainContainer}>
          <View>
            <CustomHeader
              headerTitle={defaultText.setting}
              onPressDrawer={() => props.navigation.openDrawer()}
              showDrawerIcon={true}
            />
          </View>
          {showLoader && <Loader />}
          <ScrollView style={globalStyles.settingBackground}>
            {isDataLoaded && isRoleCheck == 2 && (
              <TouchableOpacity
                onPress={() => props.navigation.navigate("TeamMembers")}
              >
                <View style={globalStyles.settingsOptionsView}>
                  <View style={globalStyles.settingProfileView}>
                    <Image
                      source={globalImages.profileBlue}
                      style={globalStyles.settingProfileIcon}
                    />
                  </View>
                  <View style={globalStyles.teamMembersMiddleView}>
                    <View style={globalStyles.teamMemberMidTop}>
                      <Text style={globalStyles.settingOptionTitle}>
                        {defaultText.teamMember}
                      </Text>
                    </View>
                    <View style={globalStyles.teamMemberMidBottom}>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                      >
                        {teamMemberListing &&
                          teamMemberListing.map((item, index) => (
                            <Image
                              key={index}
                              source={
                                item.profile_image
                                  ? { uri: item.profile_image }
                                  : globalImages.pro1
                              }
                              style={globalStyles.settingProfileIconNew}
                            />
                          ))}
                        {isDataLoaded && teamMemberListing.length == 0 && (
                          <Text style={globalStyles.boldText}>
                            {defaultText.errorTeamMsg}
                          </Text>
                        )}
                      </ScrollView>
                    </View>
                  </View>

                  <View style={globalStyles.settingArrowRight}>
                    <Image
                      source={globalImages.arrowRight}
                      style={globalStyles.settingArrowRightStyle}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => props.navigation.navigate("Options")}
            >
              <CustomSettingsOptionView
                optionsTitle={defaultText.configurableOptions}
                // imageSource1={globalImages.heartFive}
                // imageSource2={globalImages.dollarFive}
                imageSource1={globalImages.blueHeart}
                imageSource2={globalImages.blueDollar}
                style={globalStyles.settingsSmallIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("DelegatedItemScreen")}
            >
              <CustomSettingsOptionView
                single
                optionsTitle={defaultText.delegatedItems}
                imageSource1={globalImages.delegate}
                style={globalStyles.settingsBigIcon}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default Settings;
