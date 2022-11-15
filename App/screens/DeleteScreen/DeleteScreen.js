import React, { Fragment, useEffect, useRef, useState } from 'react';
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

const DeleteScreen = props => {
    const swipeListRef = useRef(null);
    const [showLoader, setLoader] = useState(false);
    const [isDataLoaded, setDataLoaded] = useState(false);
    const [isData, setIsData] = useState();
    const [isNumber, setNumber] = useState();
    const [listingData, setData] = useState([]);
    const [goTask, setGoTask] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [paginationData, setPaginationData] = useState({
        currentPage: 1,
        totalPages: 1,
        pageLimit: 10,
        totalCount: 0,
    });
    let data = Responce.deleteItem;
    const [modalOpen, setModalOpen] = useState(false);
    const [isCheckData, setCheckData] = useState(false);
    let animationIsRunning = useRef(false);
    let _swipeListViewRef = useRef(null);
    const [deletedList, setDeletedList] = useState([]);

    useEffect(() => {
        getDeleteTaskDataDetails();
    }, []);

    const getDeleteTaskDataDetails = async (currentPage = 1) => {
        setLoader(true);
        let page = currentPage ? currentPage : paginationData.currentPage;
        let limit = paginationData.pageLimit;
        const taskContent = currentPage == 1 ? [] : listingData;
        const getDelegateTask = `${Api.tasks}?heart_dollar=1&status=3&sort_direction=descending&page=${page}&limit=${limit}&my_task=1`;
        const { data, message } = await AuthApi.getDataFromServer(getDelegateTask);

        setLoader(false);
        let msg = data && data.message[0];
        if (!data) {
            setTimeout(() => {
                Toast.show(msg);
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

    useEffect(() => {
        setDeletedList([]);
    }, []);

    const onCallBottom = () => {
        props.navigation.navigate('ListingData');
    };

    const onPressSwipeDelete = (item, index) => {
        setModalOpen(true);
    };

    const renderItem = data => (
        <TouchableHighlight>
            <View style={globalStyles.rowFront} underlayColor={'#AAA'}>
                <View style={globalStyles.mh_10}>
                    <CustomDelegateItem
                        delayOption
                        delegateOption
                        isCheck
                        check={data.item.isCheck}
                        word={data.item.content}
                        getHeart={data.item.heart}
                        getDollar={data.item.dollar}
                        onPresDelegate={async () => {
                            await onBackPress(data.index, 1);
                        }}
                        onPresDelay={async () => {
                            await onBackPress(data.index, 4);
                        }}
                        onPresCheck={async () => {
                            await onBackPress(data.index, 6);
                        }}
                    />
                </View>
            </View>
        </TouchableHighlight>
    );

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        if (contentOffset.y > 0) {
            return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
        }
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
        await getDeleteTaskDataDetails();
        swipeListRef.current.closeAllOpenRows();
    };

    const renderHiddenItem = item => (
        <View style={globalStyles.rowBack}>
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
                [{ text: 'Yes', onPress: () => onCheckApi(index, statusValue) }, { text: 'No' }],
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
        getDeleteTaskDataDetails();
    };

    return (
        <Fragment>
            <SafeAreaView style={globalStyles.fragmentStyle_1} />
            <SafeAreaView style={globalStyles.fragmentStyle_2}>
                <View style={globalStyles.topMainContainer}>
                    <View style={globalStyles.topMainContainer}>
                        <View>
                            <CustomHeader
                                headerTitle={defaultText.delete}
                                onPressDrawer={() => props.navigation.openDrawer()}
                                showDrawerIcon={true}
                            />
                        </View>
                        {showLoader && <Loader />}

                        {listingData.length !== 0 ? (
                            <ScrollView
                                nestedScrollEnabled
                                style={globalStyles.deleteScrollview}
                                onScroll={async ({ nativeEvent }) => {
                                    if (
                                        isCloseToBottom(nativeEvent) &&
                                        paginationData.currentPage <= paginationData.totalPages
                                    ) {
                                        await getDeleteTaskDataDetails(paginationData.currentPage);
                                    }
                                }}
                            >
                                <View style={globalStyles.mb_5per}>
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

                        {isDataLoaded && listingData.length !== 0 && (
                            <View style={globalStyles.bottomTab}>
                                <CustomFooter title={defaultText.complete} onPress={() => onCallBottom()} />
                            </View>
                        )}

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
                    </View>
                </View>
            </SafeAreaView>
        </Fragment>
    );
};

export default DeleteScreen;
