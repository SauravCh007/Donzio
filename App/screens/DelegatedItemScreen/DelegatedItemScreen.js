import { useFocusEffect } from "@react-navigation/native";
import React, { Fragment, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View ,} from "react-native";
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

import { TouchableOpacity } from "react-native-gesture-handler";
const DelegatedItemScreen = (props) => {
  let data1 = Responce.delgateItems;
  const [data, setData1] = useState(data1);
  const [showItems, setShowItems] = useState({});
  const [listing, setListing] = useState([]);
  const [showLoader, setLoader] = useState(false);
  const [listingData, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPages: 1,
    pageLimit: 10,
    totalCount: 0,
  });
  const [update, forceUpdate] = useState(false);

  useEffect(() => {
    getTaskList();
    console.log("found")
  }, []);




  const getTaskList = async (currentPage = 1) => {
    setLoader(true);
    let page = currentPage ? currentPage : paginationData.currentPage;
    let limit = paginationData.pageLimit;
    const taskContent = currentPage == 1 ? [] : listingData;
    const getDelegateTask = `${Api.tasks}?status=1&is_task_assigned=1&sort_direction=descending&sort_by=updated_at&page=${page}&limit=${limit}&my_task=1`;
    const { data, message } = await AuthApi.getDataFromServer(getDelegateTask);
    console.log("task Lisr",data)
    setLoader(false);
    if (!data) {
      setDataLoaded(true);
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
    setDataLoaded(true);
  };

  const onCallBottom = async () => {
    let allDataToAppend = listingData;
    allDataToAppend.map((value, index) => {
      if (value.selected) {
        allDataToAppend[index].status = 6;
      } else {
        allDataToAppend[index].status = 1;
      }
    });

    const payload = {
      data: allDataToAppend,
    };
    setLoader(true);
    const { data, message } = await AuthApi.putDataToServer(Api.tasks, payload);
    console.log("data",data)
    setLoader(false);
    if (!data) {
      Toast.show(message);
      return;
    }
    props.navigation.navigate("Settings");
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
  const assignNameDetail = (item) => {
    let name;
    if (item.assignee_first_name && item.assignee_last_name) {
      name = `${item.assignee_first_name}` + " " + `${item.assignee_last_name}`;
      return name;
    } else {
      return item.assignee_first_name || item.assignee_last_name;
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getTaskList();
    }, [])
  );
  return (
    <Fragment>
      <SafeAreaView style={globalStyles.fragmentStyle_1} />
      <SafeAreaView style={globalStyles.fragmentStyle_2}>
        <View style={globalStyles.topMainContainer}>
          <View>
            <CustomHeader
              name={defaultText.delegateItem}
              onPressDrawer={() => props.navigation.openDrawer()}
              additional={true}
              delgItem={true}
              onPressBack={() => props.navigation.goBack()}
            />
          </View>
          {showLoader && <Loader />}
          {listingData.length !== 0 ? (
            <ScrollView
              style={globalStyles.scroll}
              onScroll={async ({ nativeEvent }) => {
                if (
                  isCloseToBottom(nativeEvent) &&
                  paginationData.currentPage <= paginationData.totalPages
                ) {
                  await getTaskList(paginationData.currentPage);
                }
              }}
            >
              <View style={globalStyles.marginTop10}>
                {listingData &&
                  listingData.map((item, index) => (
                    <View key={index}>
                      <CustomWorkScreen
                        disabled
                        no={index + 1}
                        word={item.content}
                        dollar={item.dollar}
                        heart={item.heart}
                        assignTask={true}
                        assignName={assignNameDetail(item)}
                        assign_company={item.assign_company}
                        assignSource={
                          item.assignee_profile_name &&
                          item.assignee_profile_name
                        }
                        assignCheck={item.selected}
                        assigncheckImg={true}
                        onPressItemNew={() => {
                          // onPressTry(item, index);
                          let allData = [...listingData];
                          allData[index].selected = !allData[index].selected;
                          setData(allData);
                        }}
                      />
                    </View>
                  ))}
              </View>
            </ScrollView>
          ) : (
            isDataLoaded &&
            listingData.length == 0 && (
              <View style={globalStyles.errorMessageNotFound}>
                <Text style={globalStyles.errorMessageNotFoundText}>
                  {defaultText.notRecordFound}
                </Text>
              </View>
            )
          )}

          {isDataLoaded && listingData.length !== 0 && (
            <View style={globalStyles.bottomTab}>
              <CustomFooter
                title={defaultText.complete}
                onPress={() => onCallBottom()}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default DelegatedItemScreen;
