import React, { Fragment, useEffect, useState } from "react";
import {
  Image, SafeAreaView,
  ScrollView, Text, View
} from "react-native";
import Toast from "react-native-simple-toast";
import CustomDelegateItem from "../../components/CustomDelegateItem/CustomDelegateItem";
import CustomFooter from "../../components/CustomFooter/CustomFooter";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import Loader from "../../components/CustomLoader/CustomLoader";
import CustomModal from "../../components/CustomModal/CustomModal";
import defaultText from "../../helper/defaultText";
import globalImages from "../../helper/globalImages";
import globalStyles from "../../helper/globalStyles";
import Responce from "../../helper/sampleData";
import Api from "../../util/api";
import AuthApi from "../../util/authApi";

const DelegateScreen = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dataAssign = Responce.assignDelegate;
  const [dataDelegate, setDataDelegate] = useState(dataAssign);
  const [isChechbox, setIsCheckbox] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [onPressCheckbox, setOnPressCheckbox] = useState(false);
  const [showLoader, setLoader] = useState(false);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [teamMember, setTeamMember] = useState([]);
  const [listingData, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPages: 1,
    pageLimit: 10,
    totalCount: 0,
  });

  const data = [
    { value: require("../../assets/pro1.png"), name: "John Smith" },
    { value: require("../../assets/profile.png"), name: "John Doe" },
    { value: require("../../assets/Mask_Group_3.png"), name: "Collin Sparke" },
    { value: require("../../assets/Mask_Group_3.png"), name: "John Smith" },
    { value: require("../../assets/Mask_Group_3.png"), name: "John Smith" },
    { value: require("../../assets/Mask_Group_3.png"), name: "John Smith" },
    { value: require("../../assets/Mask_Group_3.png"), name: "John Smith" },
    { value: require("../../assets/Mask_Group_3.png"), name: "John Doe" },
    { value: require("../../assets/Mask_Group_3.png"), name: "John Smith" },
    { value: require("../../assets/Mask_Group_3.png"), name: "John Doe" },
  ];

  useEffect(() => {
    teamMemberList();
    getTaskList();
    console.log("hlo")
  }, []);

  const getTaskList = async (currentPage = 1) => {
    setLoader(true);
    let page = currentPage ? currentPage : paginationData.currentPage;
    let limit = paginationData.pageLimit;
    const taskContent = currentPage == 1 ? [] : listingData;
    const getDelegateTask = `${Api.tasks}?heart_dollar=1&status=1&is_task_assigned=2&sort_direction=descending&page=${page}&limit=${limit}`;
    const { data, message } = await AuthApi.getDataFromServer(getDelegateTask);
    console.log("task",data)

    setLoader(false);
    setDataLoaded(true);
    if (!data) {
      setTimeout(() => {
        Toast.show(message);
      }, 500);
      return;
    }
    setData([...taskContent, ...data.data]);
    setPaginationData({
      currentPage: data.paginator.current_page + 1,
      pageLimit: data.paginator.limit,
      totalPages: data.paginator.total_pages,
      totalCount: data.paginator.total_count,
    });
  };

  const teamMemberList = async () => {
    setLoader(true);
    const { data, message } = await AuthApi.getDataFromServer(Api.employee);
    console.log("data",data)
    setLoader(false);
    if (!data) {
      return;
    }
    setTeamMember(data.data);
    setDataLoaded(true);
  };

  const closeLoader = () => {
    setTimeout(() => {
      setLoader(false);
    });
  };

  const onCallradioButton = (item, index) => {
    setLoader(true);
    let dataToAppend = item;
    dataToAppend.select = !dataToAppend.select;
    let setWholeData = dataAssign;
    setWholeData[index] = dataToAppend;
    setDataDelegate(setWholeData);
    closeLoader();
  };

  const onCallButton = () => {
    props.navigation.navigate("DelegateAssignScreen");
  };
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
      <SafeAreaView style={globalStyles.fragmentStyle_2}>
        <View style={globalStyles.topMainContainer}>
          <CustomHeader
            headerTitle={defaultText.delegate}
            onPressDrawer={() => props.navigation.openDrawer()}
            showDrawerIcon={true}
          />

          {showLoader && <Loader />}
          <ScrollView
            style={globalStyles.screenMiddleView}
            onScroll={async ({ nativeEvent }) => {
              if (
                isCloseToBottom(nativeEvent) &&
                paginationData.currentPage <= paginationData.totalPages
              ) {
                await getTaskList(paginationData.currentPage);
              }
            }}
          >
            <Text style={globalStyles.headerText}>
              {defaultText.delegateHeaderText}
            </Text>
            <Text style={[globalStyles.titleText, globalStyles.mt30]}>
              {defaultText.teamMembers}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={globalStyles.mt30}
            >
              {teamMember &&
                teamMember.map((item, index) => (
                  <View style={globalStyles.delegateProfileImageView} key={index}>
                    <View style={globalStyles.delegateProfileImageViewInside}>
                      <Image
                        source={
                          item.profile_image
                            ? { uri: item.profile_image }
                            : globalImages.pro1
                        }
                        style={globalStyles.delegateProfileImageStyle}
                      />
                    </View>
                    <Text style={globalStyles.delegateTeamMemberName}>
                      {item.first_name + "" + item.last_name}
                    </Text>
                  </View>
                ))}
            </ScrollView>
            {isDataLoaded && teamMember.length == 0 && (
              <Text style={globalStyles.errorMessageNotFoundTextNew}>
                {defaultText.notRecordFound}
              </Text>
            )}

            <Text style={[globalStyles.titleText, globalStyles.mt30]}>
              {defaultText.yourItems}
            </Text>

            {listingData &&
              listingData.map((item, index) => (
                <View style={globalStyles.mb20} key={index}>
                  <CustomDelegateItem
                    delayOption
                    delegateOption
                    word={item.content}
                    getHeart={item.dollar}
                    getDollar={item.heart}
                  />
                </View>
              ))}
            {isDataLoaded && listingData.length == 0 && (
              <View
                style={globalStyles.delegateNoRecordFoundView}
              >
                <Text style={globalStyles.errorMessageNotFoundTextNew}>
                  {defaultText.notRecordFound}
                </Text>
              </View>
            )}
          </ScrollView>

          <CustomFooter
            title={defaultText.complete}
            onPress={() => onCallButton()}
          />
          {modalOpen && (
            <CustomModal onPressCross={() => setModalOpen(false)} />
          )}
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default DelegateScreen;
