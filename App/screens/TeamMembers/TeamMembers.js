import { useFocusEffect } from "@react-navigation/native";
import React, { Fragment, useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import Loader from "../../components/CustomLoader/CustomLoader";
import defaultText from "../../helper/defaultText";
import globalImages from "../../helper/globalImages";
import globalStyles from "../../helper/globalStyles";
import Api from "../../util/api";
import AuthApi from "../../util/authApi";
import CustomTeamMember from "./CustomTeamMember";

const TeamMembers = (props) => {
  const [showLoader, setLoader] = useState(false);
  const [isMember, setMember] = useState([]);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPages: 1,
    pageLimit: 10,
    totalCount: 0,
  });

  //let dataListing = Responce.teamMemberData;

  useEffect(() => {
    onPageInit();
  }, []);

  const onPageInit = async () => {
    await onTeamName();
    await getAllMemberDetails();
  };

  const onTeamName = async () => {
    setLoader(true);
    const { data, message } = await AuthApi.getDataFromServer(Api.profile);
    setLoader(false);
    if (!data) {
      return;
    } else {
      await setUserInfo(data.data);
    }
  };

  const getAllMemberDetails = async (currentPage = 1) => {
    setLoader(true);
    let page = currentPage ? currentPage : paginationData.currentPage;
    let limit = paginationData.pageLimit;
    const taskContent = currentPage == 1 ? [] : isMember;
    const getMember = `${Api.employee}?page=${page}&limit=${limit}`;
    const { data, message } = await AuthApi.getDataFromServer(getMember);
    setLoader(false);
    if (!data) {
      return;
    } else {
      setMember([...taskContent, ...data.data]);
      setPaginationData({
        currentPage: data.paginator.current_page + 1,
        pageLimit: data.paginator.limit,
        totalPages: data.paginator.total_pages,
        totalCount: data.paginator.total_count,
      });
    }
    setDataLoaded(true);
  };

  const onCallMember = (item, index) => {

    props.navigation.navigate("UserInfoScreen", { selectedUserId: item.id });
  };

  const onCallAddNewTeamMember = () => {
    props.navigation.navigate("InviteByPhone");
  };
  useFocusEffect(
    React.useCallback(() => {
      getAllMemberDetails();
    }, [])
  );

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    if (contentOffset.y > 0) {
      return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      );
    }
  };

  return (
    <Fragment>
      <SafeAreaView style={globalStyles.fragmentStyle_1} />
      <SafeAreaView style={globalStyles.topMainContainer}>
        <View>
          <CustomHeader
            name={
              userInfo &&
              userInfo.first_name &&
              userInfo.first_name + " " + userInfo.last_name + "'s Team"
            }
            additional={true}
            plusIcon={true}
            onPressDrawer={() => props.navigation.openDrawer()}
            showDrawerIcon={true}
            onPressPlus={() => props.navigation.navigate("InviteByPhone")}
            onPressBack={() => props.navigation.goBack()}
          />
        </View>
        {showLoader && <Loader />}
        <ScrollView
          onScroll={async ({ nativeEvent }) => {
            if (
              isCloseToBottom(nativeEvent) &&
              paginationData.currentPage <= paginationData.totalPages
            ) {
              await getAllMemberDetails(paginationData.currentPage);
            }
          }}
        >
          <View style={globalStyles.yourTeamMember}>
            <View style={globalStyles.yourTeamMemberIcon}>
              <Image
                source={globalImages.profileBlue}
                style={globalStyles.settingProfileIcon}
              />
            </View>
            <View style={globalStyles.width_75}>
              <Text style={globalStyles.fontSize_20}>
                {defaultText.yourTeamMember}
              </Text>
            </View>
          </View>

          {isMember &&
            isMember.map((item, index) => (
              <View key={index}>
                <CustomTeamMember
                  image
                  memberFirstName={item.first_name}
                  memberLastName={item.last_name}
                  imageSource={
                    item.profile_image
                      ? { uri: item.profile_image }
                      : globalImages.pro1
                  }
                  onPress={() => onCallMember(item, index)}
                />
              </View>
            ))
          }
          {isDataLoaded && isMember.length == 0 && (
            <View style={globalStyles.memberTextError}>
              <Text style={globalStyles.memberTextErrorText}>
                {defaultText.errorTeamMsg}
              </Text>
            </View>
          )}
          <CustomTeamMember onPress={() => onCallAddNewTeamMember()} />
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default TeamMembers;
