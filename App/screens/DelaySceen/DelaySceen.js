import React, { Fragment, useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-simple-toast";
import CustomFooter from "../../components/CustomFooter/CustomFooter";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import Loader from "../../components/CustomLoader/CustomLoader";
import CustomWorkScreen from "../../components/CustomWorkScreen/CustomWorkScreen";
import defaultText from "../../helper/defaultText";
import globalStyles from "../../helper/globalStyles";
import Responce from "../../helper/sampleData";
import Api from "../../util/api";
import AuthApi from "../../util/authApi";

const DelaySceen = (props) => {
  let data = Responce.delayItem;
  const [isMonths, setMomths] = useState("");
  const [isWeeks, setWeeks] = useState("");
  const [isDays, setDays] = useState("");
  const [listingData, setData] = useState([]);
  const [showLoader, setLoader] = useState(false);
  const [indexArray, setIndexArray] = useState([]);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPages: 1,
    pageLimit: 10,
    totalCount: 0,
  });

  useEffect(() => {
    getTaskList();
  }, []);

  const onCallButton = async () => {
    const allData = [];
    listingData.map((item, index) => {
      const checkValue =
        item.delay_month * 30 + item.delay_week * 7 + item.delay_day;
      if (checkValue >= 66) {
        allData.push(index);
      }
    });
    setIndexArray([...allData]);
    if (allData.length == 0) {
      setLoader(true);
      const payload = {
        data: listingData,
      };
      const { data, message } = await AuthApi.putDataToServer(
        Api.tasks,
        payload
      );
      setLoader(false);
      if (!data) {
        await setTimeout(() => {
          Toast.show(message);
        }, 500);
        return;
      }
      await setTimeout(() => {
        Toast.show("Task is delayed sucessfully");
      }, 500);
      props.navigation.navigate("Dashboard");
    }
  };

  const getTaskList = async (currentPage = 1) => {
    setLoader(true);
    let page = currentPage ? currentPage : paginationData.currentPage;
    let limit = paginationData.pageLimit;
    const taskContent = currentPage == 1 ? [] : listingData;
    const getDelegateTask = `${Api.tasks}?heart_dollar=1&status=4&sort_direction=descending&my_task=1&page=${page}&limit=${limit}`;
    const { data, message } = await AuthApi.getDataFromServer(getDelegateTask);
    console.log("data",data)
    setLoader(false);
    setDataLoaded(true);
    if (!data) {
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
          <View>
            <CustomHeader
              headerTitle={defaultText.delay}
              onPressDrawer={() => props.navigation.openDrawer()}
              showDrawerIcon={true}
            />
          </View>
          {showLoader && <Loader />}
          {listingData.length !== 0 && (
            <KeyboardAwareScrollView
              style={globalStyles.scroll}
              extraScrollHeight={20}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled={true}
              onScroll={async ({ nativeEvent }) => {
                if (
                  isCloseToBottom(nativeEvent) &&
                  paginationData.currentPage <= paginationData.totalPages
                ) {
                  await getTaskList(paginationData.currentPage);
                }
              }}
            >
              <View style={globalStyles.delayListMainView}>
                {listingData &&
                  listingData.map((item, index) => (
                    console.log("listingData",listingData),
                    <View style={globalStyles.cWDForMainBorder} key={index}>
                      <CustomWorkScreen
                        delayFor={true}
                        no={index + 1}
                        defaultValueMonth={
                          item.delay_month ? item.delay_month.toString() : "0"
                        }
                        defaultValueWeek={
                          item.delay_week ? item.delay_week.toString() : "0"
                        }
                        defaultValueDay={
                          item.delay_day ? item.delay_day.toString() : "0"
                        }
                        word={item.content}
                        dollar={item.dollar}
                        heart={item.heart}
                        onChangeTextMonth={(value) => {
                          listingData[index].delay_month = Number(value);
                        }}
                        onChangeTextWeek={(value) => {
                          listingData[index].delay_week = Number(value);
                        }}
                        onChangeTextDay={(value) => {
                          listingData[index].delay_day = Number(value);
                        }}
                      />
                      {indexArray &&
                        indexArray.map(
                          (item1, index1) =>
                            index == item1 && (
                              <Text style={globalStyles.errorMsgDelay} key={index1}>
                                {defaultText.errorMsgDelayText}
                              </Text>
                            )
                        )
                      }
                    </View>
                  ))}
              </View>
            </KeyboardAwareScrollView>
          )}
          {isDataLoaded && listingData.length == 0 && (
            <View style={globalStyles.errorMessageNotFound}>
              <Text style={globalStyles.errorMessageNotFoundText}>
                {defaultText.notRecordFound}
              </Text>
            </View>
          )}

          {isDataLoaded && listingData.length !== 0 && (
            <View style={globalStyles.bottomTab}>
              <CustomFooter
                title={defaultText.complete}
                onPress={() => onCallButton()}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default DelaySceen;
