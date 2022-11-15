import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-simple-toast';
import { SwipeListView } from 'react-native-swipe-list-view';
import CustomDelegateItem from '../../components/CustomDelegateItem/CustomDelegateItem';
import CustomFooter from '../../components/CustomFooter/CustomFooter';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Loader from '../../components/CustomLoader/CustomLoader';
import CustomModal from '../../components/CustomModal/CustomModal';
import defaultText from '../../helper/defaultText';
import globalImages from '../../helper/globalImages';
import globalStyles from '../../helper/globalStyles';
import Responce from '../../helper/sampleData';
import Api from '../../util/api';
import AuthApi from '../../util/authApi';

const YourTaskScreen = props => {
    let data = Responce.taskItem;
    const swipeListRef = useRef(null);
    const [isCheck, setCheck] = useState(true);
    const [dataTask, setDataTask] = useState(data);
    const [taskComplete, setTaskComplete] = useState(false);
    const [showLoader, setLoader] = useState(false);
    const [isDataLoaded, setDataLoaded] = useState(false);
    const [getDataFrom, setGetDataFrom] = useState();
    const [listingData, setData] = useState([]);
    const [paginationData, setPaginationData] = useState({
        currentPage: 1,
        totalPages: 1,
        pageLimit: 10,
        totalCount: 0,
    });
    const [update, forceUpdate] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        getTaskList();
    }, []);

    const getTaskList = async (currentPage = 1) => {
        setLoader(true);
        let page = currentPage ? currentPage : paginationData.currentPage;
        let limit = paginationData.pageLimit;
        const taskContent = currentPage == 1 ? [] : listingData;
        const getToDoList = `${Api.tasks}?my_task=1&heart_dollar=1&status=2&sort_direction=descending&page=${page}&limit=${limit}`;
        const { data, message } = await AuthApi.getDataFromServer(getToDoList);
        setLoader(false);
        if (!data) {
            setTimeout(() => {
                Toast.show(message);
            }, 500);
            return;
        } else {
            const newArr = [...taskContent, ...data.data];
            const taskListArr = await newArr.map((e, i) => {
                e.key = `${i}`;
                return e;
            });
            setData([...taskListArr]);
            setPaginationData({
                currentPage: data.paginator.current_page + 1,
                pageLimit: data.paginator.limit,
                totalPages: data.paginator.total_pages,
                totalCount: data.paginator.total_count,
            });
        }
        setDataLoaded(true);
    };

    const onCallCheck = (item, index) => {
        forceUpdate(!update);
        let dataToAppend = item;
        dataToAppend.check = !dataToAppend.check;
        let setWholeData = dataTask;
        setWholeData[index] = dataToAppend;
        setDataTask(setWholeData);
        forceUpdate(!update);
    };

    const onCallBottom = async () => {
        let dataToEdit = listingData;
        dataToEdit &&
            dataToEdit.map((item, index) => {
                if (item.check) {
                    dataToEdit[index].status = 6;
                } else {
                    dataToEdit[index].status = 2;
                }
            });
        const payload = {
            data: dataToEdit,
        };
        setLoader(true);
        const { data, message } = await AuthApi.putDataToServer(Api.tasks, payload);
        setLoader(false);
        if (!data) {
            return;
        }
        props.navigation.navigate('Dashboard');
    };

    const onBackPress = (index, statusValue) => {
        statusValue == 1 &&
            Alert.alert(
                '',
                'Are you sure want to Delegate Task ',
                [{ text: 'Yes', onPress: () => onCheckApi(index, statusValue) }, { text: 'No' }],
                { cancelable: true },
            );
        statusValue == 4 &&
            Alert.alert(
                '',
                'Are you sure want to Delay Task ',
                [{ text: 'Yes', onPress: () => onCheckApi(index, statusValue) }, { text: 'No' }],
                { cancelable: true },
            );
        statusValue == 6 &&
            Alert.alert(
                '',
                'Are you sure want to Complete Task ',
                [
                    {
                        text: 'Yes',
                        onPress: () => onCheckApi(index, statusValue),
                    },
                    { text: 'No' },
                ],
                { cancelable: true },
            );
        return true;
    };

    const onCheckApi = async (index, statusValue) => {
        listingData[index].status = statusValue;
        const payload = {
            data: listingData,
        };
        setLoader(true);
        const { data, message } = await AuthApi.putDataToServer(Api.tasks, payload);
        setLoader(false);
        if (!data) {
            return;
        }
        await setTimeout(() => {
            Toast.show(
                statusValue == 1
                    ? 'Task has been moved to delegate'
                    : statusValue == 4
                    ? 'Task has been moved to delay'
                    : statusValue == 6
                    ? 'Task has been complete sucessfully'
                    : 'Task has been moved sucessfully',
            );
        }, 1000);

        await getTaskList();
    };

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        if (contentOffset.y > 0) {
            return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
        }
    };

    const renderHiddenItem = item => (
        <View style={[globalStyles.rowBack]}>
            <View style={[globalStyles.backRightBtn, globalStyles.backRightBtnRight]}>
                <TouchableOpacity
                    onPress={async () => {
                        await setCurrentIndex(item.index);
                        await onPressSwipeDelete();
                    }}
                >
                    <Image style={globalStyles.deleteIconView} source={globalImages.deleteIcon} />
                    <Text style={globalStyles.backTextWhite}>{defaultText.delete}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const onPressSwipeDelete = (item, index) => {
        setModalOpen(true);
    };

    const onDeleteTask = async () => {
        const payload = {
            data: listingData,
        };
        setModalOpen(false);
        setLoader(true);
        const { data, message } = await AuthApi.putDataToServer(Api.tasks, payload);
        setLoader(false);
        if (!data) {
            return;
        }
        await setTimeout(() => {
            Toast.show('Task deleted successfully.');
        }, 500);
        await getTaskList();
        swipeListRef.current.closeAllOpenRows();
    };

    const renderItem = (data, index) => (
        <TouchableHighlight>
            <View style={{ backgroundColor: '#FCFCFC' }} key={index} underlayColor={'#AAA'}>
                <CustomDelegateItem
                    delayOption
                    delegateOption
                    isCheck
                    delayNew
                    delegateNew
                    checkNew
                    checkNewSource={globalImages.checkSignRed}
                    check={data.item.check}
                    getHeart={data.item.dollar}
                    getDollar={data.item.heart}
                    word={data.item.content}
                    onPresCheck={async () => {
                        await onBackPress(data.index, 6);
                    }}
                    onPresDelegate={async () => {
                        await onBackPress(data.index, 1);
                    }}
                    onPresDelay={async () => {
                        await onBackPress(data.index, 4);
                    }}
                />
            </View>
        </TouchableHighlight>
    );

    return (
        <Fragment>
            <SafeAreaView style={globalStyles.fragmentStyle_1} />
            <SafeAreaView style={globalStyles.fragmentStyle_2}>
                <View style={globalStyles.topMainContainer}>
                    <CustomHeader
                        headerTitle={defaultText.yourTask}
                        onPressDrawer={() => props.navigation.openDrawer()}
                        showDrawerIcon={true}
                    />
                    {showLoader && <Loader />}
                    {listingData.length !== 0 ? (
                        <ScrollView
                            nestedScrollEnabled
                            // style={globalStyles.screenMiddleView}
                            style={[globalStyles.scroll, { marginTop: 15 }]}
                            onScroll={async ({ nativeEvent }) => {
                                if (
                                    isCloseToBottom(nativeEvent) &&
                                    paginationData.currentPage <= paginationData.totalPages
                                ) {
                                    await getTaskList(paginationData.currentPage);
                                }
                            }}
                        >
                            <View style={{ paddingHorizontal: 15 }}>
                                <Text style={globalStyles.headerText}>{defaultText.yourTasksMiddleHeader}</Text>
                                <Text style={globalStyles.titleText}>{defaultText.tasks}</Text>
                            </View>

                            {/* {listingData &&
                listingData.map((item, index) => (
                  <View
                    style={[globalStyles.mb20, globalStyles.mh10]}
                    key={index}
                  >
                    <View style={globalStyles.mb5}>
                      <CustomDelegateItem
                        isCheck
                        check={item.check}
                        onPresCheck={() => onCallCheck(item, index)}
                        getHeart={item.dollar}
                        getDollar={item.heart}
                        word={item.content}
                        onPresDelegate={async () => {
                          await onBackPress(index, 1);
                        }}
                        onPresDelay={async () => {
                          await onBackPress(index, 4);
                        }}
                      />
                    </View>
                  </View>
                ))} */}
                            <SwipeListView
                                ref={swipeListRef}
                                disableRightSwipe
                                data={listingData}
                                renderItem={renderItem}
                                renderHiddenItem={renderHiddenItem}
                                rightOpenValue={-75}
                                previewOpenValue={-40}
                                previewOpenDelay={3000}
                            />
                        </ScrollView>
                    ) : (
                        isDataLoaded && (
                            <View style={globalStyles.errorMessageNotFound}>
                                <Text style={globalStyles.errorMessageNotFoundText}>{defaultText.notRecordFound}</Text>
                            </View>
                        )
                    )}

                    {isDataLoaded && listingData.length !== 0 && (
                        <CustomFooter title={defaultText.complete} onPress={() => onCallBottom()} />
                    )}
                </View>
            </SafeAreaView>
            {modalOpen && (
                <CustomModal
                    onPressCross={() => setModalOpen(false)}
                    onPressDeleteButton={async () => {
                        await (listingData[currentIndex].status = 5);
                        await onDeleteTask();
                    }}
                    isModalForDelete={true}
                />
            )}
        </Fragment>
    );
};

export default YourTaskScreen;
