import React, { Fragment, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import Loader from "../../components/CustomLoader/CustomLoader";
import CustomWorkScreen from "../../components/CustomWorkScreen/CustomWorkScreen";
import defaultText from "../../helper/defaultText";
import globalStyles from "../../helper/globalStyles";
import Responce from "../../helper/sampleData";
import Api from "../../util/api";
import AuthApi from "../../util/authApi";

const ParkingLot = (props) => {
  useEffect(() => {
    getParkingLotDetails();
  }, []);

  const [showLoader, setLoader] = useState(false);
  const [isDeletedData, setDeletedData] = useState();
  const [listingData, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPages: 1,
    pageLimit: 10,
    totalCount: 0,
  });

  const getParkingLotDetails = async (currentPage = 1) => {
    setLoader(true);
    let page = currentPage ? currentPage : paginationData.currentPage;
    let limit = paginationData.pageLimit;
    const taskContent = currentPage == 1 ? [] : listingData;
    const getDelegateTask = `${Api.tasks}?heart_dollar=1&status=5&sort_direction=descending&page=${page}&limit=${limit}`;
    const { data, message } = await AuthApi.getDataFromServer(getDelegateTask);
    setLoader(false);
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
    setDataLoaded(true);
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

  let data = Responce.parkingLotItem;

  return (
    <Fragment>
      <SafeAreaView style={globalStyles.fragmentStyle_1} />
      <SafeAreaView style={globalStyles.fragmentStyle_2}>
        <View style={globalStyles.topMainContainer}>
          <View>
            <CustomHeader
              headerTitle={defaultText.parkLot}
              onPressDrawer={() => props.navigation.openDrawer()}
              showDrawerIcon={true}
            />
          </View>
          {showLoader && <Loader />}
          <View style={globalStyles.pLMainView}>
            <View style={globalStyles.pLMargin}>
              <Text style={globalStyles.darkText}>
                {defaultText.prevDeleted}
              </Text>
            </View>
          </View>

          {listingData.length !== 0 ? (
            <ScrollView
              style={globalStyles.scroll}
              onScroll={async ({ nativeEvent }) => {
                if (
                  isCloseToBottom(nativeEvent) &&
                  paginationData.currentPage <= paginationData.totalPages
                ) {
                  await getParkingLotDetails(paginationData.currentPage);
                }
              }}
            >
              <View style={globalStyles.pLListMainView}>
                {listingData &&
                  listingData.map((item, index) => (
                    <View key={index}>
                      <CustomWorkScreen
                        no={index + 1}
                        word={item.content}
                        dollar={item.dollar}
                        heart={item.heart}
                      />
                      <View style={globalStyles.pLListBorder} />
                    </View>
                  ))}
              </View>
            </ScrollView>
          ) : (
            isDataLoaded && (
              <View style={globalStyles.errorMessageNotFound}>
                <Text style={globalStyles.errorMessageNotFoundText}>
                  {defaultText.notRecordFound}
                </Text>
              </View>
            )
          )}
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default ParkingLot;
