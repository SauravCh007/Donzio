import React, { Fragment, useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import Toast from "react-native-simple-toast";
import CustomFooter from "../../components/CustomFooter/CustomFooter";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import Loader from "../../components/CustomLoader/CustomLoader";
import CustomWorkScreen from "../../components/CustomWorkScreen/CustomWorkScreen";
import defaultText from "../../helper/defaultText";
import globalImages from "../../helper/globalImages";
import globalStyles from "../../helper/globalStyles";
import Responce from "../../helper/sampleData";
import Api from "../../util/api";
import AuthApi from "../../util/authApi";

const OrderWeekScreen = (props) => {
  let staticData = Responce.staticData;
  let data = Responce.weektask;
  let dataDelegate = Responce.weekTaskDelegate;
  let dataDelay = Responce.weekTaskDelay;
  let dataDelete = Responce.weekTaskDelete;

  const [showLoader, setLoader] = useState(false);
  const [isCheckDo, setCheckDo] = useState(0);
  const [isCheckDelegate, setCheckDelegate] = useState(0);
  const [isCheckDelay, setCheckDelay] = useState(0);
  const [isCheckDelete, setCheckDelete] = useState(0);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [toDoListing, setToDoListing] = useState([]);
  const [delegateTask, setDelegateTask] = useState([]);
  const [deleteTask, setDeleteTask] = useState([]);
  const [delayTask, setDelayTask] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPages: 1,
    pageLimit: 10,
    totalCount: 0,
  });

  useEffect(() => {
    const getId = props.route.params.id;
    if (getId) {
      getTaskList(getId);
    }
  }, []);

  const getTaskList = async (getId) => {
    setLoader(true);
    const getDelegateTask = `${Api.tasks}?ids=${getId}&page=${1}`;
    const { data, message } = await AuthApi.getDataFromServer(getDelegateTask);
    setLoader(false);
    if (!data) {
      setTimeout(() => {
        setLoader(false);
        Toast.show(message);
      }, 500);
      return;
    }
    setToDoListing(data.data && data.data.do_task && data.data.do_task);
    setDelegateTask(
      data.data && data.data.delegate_task && data.data.delegate_task
    );
    setDelayTask(data.data && data.data.delay_task && data.data.delay_task);
    setDeleteTask(data.data && data.data.delete_task && data.data.delete_task);
    setDataLoaded(true);
    setLoader(false);
  };

  return (
    <Fragment>
      <SafeAreaView style={globalStyles.fragmentStyle_1} />
      <SafeAreaView style={globalStyles.fragmentStyle_2}>
        <View style={globalStyles.topMainContainer}>
          <CustomHeader
            headerTitle={defaultText.thisWeeksTask}
            onPressDrawer={() => props.navigation.openDrawer()}
            showDrawerIcon={true}
          />
          {showLoader && <Loader />}
          <ScrollView style={globalStyles.scroll}>
            <View style={globalStyles.orderSImageView}>
              <Image
                style={globalStyles.orderSImageStyle}
                // source={globalImages.robotDog}
                source={globalImages.clock}
              />
            </View>

            <View style={globalStyles.mtMinus_70}>
              <Text style={globalStyles.darkTextSimple}>
                {defaultText.hereOurSugg}
              </Text>
            </View>
            <View style={globalStyles.orderDoTitleView}>
              <View>
                {toDoListing.length !== 0 && (
                  <Text style={globalStyles.orderSTitle}>
                    {defaultText.orderDoTitle}
                  </Text>
                )}
                {toDoListing &&
                  toDoListing.map((item, index) => (
                    <View key={index}>
                      <CustomWorkScreen
                        no={index + 1}
                        word={item.content}
                        dollar={item.dollar}
                        heart={item.heart}
                      />
                    </View>
                  ))}
              </View>
              <View>
                {delegateTask.length !== 0 && (
                  <Text style={globalStyles.orderSTitle}>
                    {defaultText.orderDelegateTitle}
                  </Text>
                )}

                {delegateTask &&
                  delegateTask.map((item, index) => (
                    <View key={index}>
                      <CustomWorkScreen
                        no={index + 1}
                        word={item.content}
                        dollar={item.dollar}
                        heart={item.heart}
                        delegateImg={true}
                        Img={false}
                        onPressItem={() =>
                          props.navigation.navigate("DelegateAssignScreen")
                        }
                      />
                    </View>
                  ))}
              </View>
              <View>
                {delayTask.length !== 0 && (
                  <Text style={globalStyles.orderSTitle}>
                    {defaultText.orderDelayTitle}
                  </Text>
                )}
                {delayTask &&
                  delayTask.map((item, index) => (
                    <View key={index}>
                      <CustomWorkScreen
                        no={index + 1}
                        word={item.content}
                        dollar={item.dollar}
                        heart={item.heart}
                        delayImg={true}
                        Img={false}
                        onPressItem={() =>
                          props.navigation.navigate("DelaySceen")
                        }
                      />
                    </View>
                  ))}
              </View>
              <View>
                {deleteTask.length !== 0 && (
                  <Text style={globalStyles.orderSTitle}>
                    {defaultText.orderDeleteTitle}
                  </Text>
                )}
                {deleteTask &&
                  deleteTask.map((item, index) => (
                    <View key={index}>
                      <CustomWorkScreen
                        no={index + 1}
                        word={item.content}
                        dollar={item.dollar}
                        heart={item.heart}
                        deleteImg={true}
                        Img={false}
                        onPressItem={() =>
                          props.navigation.navigate("DeleteScreen")
                        }
                      />
                    </View>
                  ))}
              </View>
            </View>
          </ScrollView>
          <View style={globalStyles.bottomTab}>
            <CustomFooter
              title={defaultText.complete}
              onPress={() => props.navigation.replace("Dashboard")}
            />
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default OrderWeekScreen;
