import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-simple-toast';
import { SwipeListView } from 'react-native-swipe-list-view';
import CustomDelegateItem from '../../components/CustomDelegateItem/CustomDelegateItem';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Loader from '../../components/CustomLoader/CustomLoader';
import CustomModal from '../../components/CustomModal/CustomModal';
import defaultText from '../../helper/defaultText';
import globalImages from '../../helper/globalImages';
import globalStyles from '../../helper/globalStyles';
import Api from '../../util/api';
import AuthApi from '../../util/authApi';
const MyTaskLists = props => {
    const swipeListRef = useRef(null);
    const [showLoader, setLoader] = useState(false);
    const [isDataLoaded, setDataLoaded] = useState(false);
    const [toDoListing, setToDoListing] = useState([]);
    const [delegateTask, setDelegateTask] = useState([]);
    const [deleteTask, setDeleteTask] = useState([]);
    const [delayTask, setDelayTask] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentState, setState] = useState('');
    const [paginationData, setPaginationData] = useState({
        currentPage: 1,
        totalPages: 1,
        pageLimit: 10,
        totalCount: 0,
    });
    const [tab, setTab] = useState('');
    const [prevTab, setPrevTab] = useState('');
    const [cDate, setCDate] = useState('');

    useEffect(() => {
        getTaskList();
    }, []);

    const getCurrentDate = (timeStamDate = '') => {
        let currentDate = new Date(timeStamDate);
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const fullDate = year + '-' + month + '-' + (day < 10 ? '0' + day : day);
        return fullDate;
    };

    const getTaskList = async (currentPage = 1, getID) => {
        let todaysDate = getCurrentDate(new Date());
        setCDate(todaysDate);
        let page = currentPage ? currentPage : paginationData.currentPage;
        let limit = paginationData.pageLimit;
        const taskContent = currentPage == 1 ? [] : listingData;
        const getDelegateTask = `${Api.tasks}?your_task=1&sort_direction=descending&page=${page}&limit=${limit}&heart_dollar=1`;
        setLoader(true);
        const { data, message } = await AuthApi.getDataFromServer(getDelegateTask);
        console.log('data', data);
        setDataLoaded(true);
        setLoader(false);
        let msg = data && data.message[0];
        if (!data) {
            setTimeout(() => {
                Toast.show(msg);
            }, 500);
            return;
        }
        let do_task = [];
        if (data.data && data.data.do_task) {
            do_task = await data.data.do_task.map((e, i) => {
                e.key = `${i}`;
                return e;
            });
        }
        setToDoListing([...do_task]);

        let delegate_task = [];
        if (data.data && data.data.delegate_task) {
            delegate_task = await data.data.delegate_task.map((e, i) => {
                e.key = `${i}`;
                return e;
            });
        }
        setDelegateTask([...delegate_task]);

        let delay_task = [];
        if (data.data && data.data.delay_task) {
            delay_task = await data.data.delay_task.map((e, i) => {
                e.key = `${i}`;
                return e;
            });
        }
        setDelayTask([...delay_task]);

        let delete_task = [];
        if (data.data && data.data.delete_task) {
            delete_task = await data.data.delete_task.map((e, i) => {
                e.key = `${i}`;
                return e;
            });
        }
        setDeleteTask(data.data && data.data.delete_task);
    };

    const renderItem = data => (
        <TouchableHighlight>
            <View style={globalStyles.rowFront} underlayColor={'#AAA'}>
                <View style={globalStyles.mh_10}>
                    <CustomDelegateItem
                        delayNew
                        delegateNew
                        checkNew
                        checkNewSource={globalImages.checkSignRed}
                        delayOption={tab !== 'delay' ? true : false}
                        delegateOption={tab !== 'delegate' ? true : false}
                        isCheck
                        check={data.item.isCheck}
                        word={data.item.content}
                        getHeart={data.item.heart}
                        getDollar={data.item.dollar}
                        onPresDelegate={async () => {
                            await onBackPress(data.index, 1, data.item.status_name);
                        }}
                        onPresDelay={async () => {
                            await onBackPress(data.index, 4, data.item.status_name);
                        }}
                        onPresCheck={async () => {
                            await onBackPress(data.index, 6, data.item.status_name, data.item.task_date);
                        }}
                    />
                </View>
            </View>
        </TouchableHighlight>
    );
    const onPressSwipeDelete = (item, index) => {
        setModalOpen(true);
    };

    const onDeleteTask = async value => {
        const payload = {
            data: value,
        };
        setModalOpen(false);
        setLoader(true);
        const { data, message, success } = await AuthApi.putDataToServer(Api.tasks, payload);
        setLoader(false);
        if (!success) {
            return;
        }
        setTimeout(async () => {
            Toast.show('Task deleted successfully');
            await getTaskList();
        }, 1000);
        // console.warn('current', _swipeListViewRef);
        swipeListRef.current.closeAllOpenRows();
    };
    const onBackPress = (index, statusValue, statusName, createdDate) => {
        statusValue == 1 &&
            Alert.alert(
                '',
                'Are you sure want to Delegate Task ',
                [
                    {
                        text: 'Yes',
                        onPress: () => onCheckApi(index, statusValue, statusName),
                    },
                    { text: 'No' },
                ],
                { cancelable: true },
            );
        statusValue == 4 &&
            Alert.alert(
                '',
                'Are you sure want to Delay Task ',
                [
                    {
                        text: 'Yes',
                        onPress: () => onCheckApi(index, statusValue, statusName),
                    },
                    { text: 'No' },
                ],
                { cancelable: true },
            );
        statusValue == 6 &&
            Alert.alert(
                '',
                'Are you sure want to Complete Task ',
                [
                    {
                        text: 'Yes',
                        onPress: () => onCheckApi(index, statusValue, statusName, createdDate),
                    },
                    { text: 'No' },
                ],
                { cancelable: true },
            );
        return true;
    };
    const onCheckApi = async (index, statusValue, statusName, createdDate) => {
        console.log("statys",index ,statusValue ,statusName)
        let value = '';
        if (statusName == 'do') {
            toDoListing[index].status = statusValue;
            value = toDoListing;
        } else if (statusName == 'delegate') {
            delegateTask[index].status = statusValue;
            value = delegateTask;
            console.log("delegateTask",delegateTask)
        } else if (statusName == 'delay') {
            delayTask[index].status = statusValue;
            value = delayTask;
        } else if (statusName == 'delete') {
            await (deleteTask[currentIndex].status = 5);
            deleteTask[index].status = statusValue;
            value = deleteTask;
        }
        const payload = {
            data: value,
        };
        console.log("payload",payload)
        setLoader(true);
        const { data, message } = await AuthApi.putDataToServer(Api.tasks, payload);
        console.log("delay status",data)
        setLoader(false);
        if (!data) {
            return;
        }
        await setTimeout(async () => {
            Toast.show(
                statusValue == 1
                    ? 'Task has been moved to delegate'
                    : statusValue == 4
                    ? 'Task has been moved to delay'
                    : statusValue == 6
                    ? 'Task has been completed sucessfully'
                    : 'Task has been moved sucessfully',
            );
            await getTaskList();
        }, 2000);
    };
    const renderHiddenItem = (item, value) => (
        <View style={globalStyles.rowBack}>
            <View style={[globalStyles.backRightBtn, globalStyles.backRightBtnRight]}>
                <TouchableOpacity
                    onPress={async () => {
                        await setState(value);
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

    return (
        <Fragment>
            <SafeAreaView style={globalStyles.fragmentStyle_1} />
            <SafeAreaView style={globalStyles.topMainContainer}>
                <CustomHeader
                    headerTitle={'My Tasks'}
                    onPressDrawer={() => props.navigation.openDrawer()}
                    showDrawerIcon={true}
                />
                {showLoader && <Loader />}
                {toDoListing.length !== 0 ||
                delegateTask.length !== 0 ||
                delayTask.length !== 0 ||
                deleteTask.length !== 0 ? (
                    <ScrollView style={globalStyles.scroll} nestedScrollEnabled>
                        <View>
                            {toDoListing.length !== 0 && (
                                <TouchableOpacity
                                    onPress={() => {
                                        setTab(tab === 'todo' ? '' : 'todo');
                                    }}
                                >
                                    <View style={globalStyles.myTaskListTitle}>
                                        <Text style={globalStyles.orderSTitle}>To Do</Text>
                                        <Image
                                            source={tab === 'todo' ? globalImages.down : globalImages.up}
                                            style={globalStyles.myTaskListIcon}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )}
                            {tab === 'todo' && toDoListing && (
                                <SwipeListView
                                    disableRightSwipe
                                    data={toDoListing}
                                    ref={swipeListRef}
                                    // renderItem={renderItem}
                                    renderItem={data => renderItem(data)}
                                    renderHiddenItem={data => renderHiddenItem(data, 'do')}
                                    rightOpenValue={-75}
                                    previewOpenValue={-40}
                                    previewOpenDelay={3000}
                                />
                            )}
                        </View>
                        <View>
                            {delegateTask.length !== 0 && (
                                <TouchableOpacity
                                    onPress={() => {
                                        setTab(tab === 'delegate' ? '' : 'delegate');
                                    }}
                                >
                                    <View style={globalStyles.myTaskListTitle}>
                                        <Text style={globalStyles.orderSTitle}>{defaultText.orderDelegateTitle}</Text>
                                        <Image
                                            source={tab === 'delegate' ? globalImages.down : globalImages.up}
                                            style={globalStyles.myTaskListIcon}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )}
                            {tab === 'delegate' && delegateTask && (
                                <SwipeListView
                                    ref={swipeListRef}
                                    disableRightSwipe
                                    data={delegateTask}
                                    renderItem={renderItem}
                                    renderHiddenItem={data => renderHiddenItem(data, 'delegate')}
                                    // renderHiddenItem={renderHiddenItem}
                                    rightOpenValue={-75}
                                    previewOpenValue={-40}
                                    previewOpenDelay={3000}
                                />
                            )}
                        </View>
                        <View>
                            {delayTask.length !== 0 && (
                                <TouchableOpacity
                                    onPress={() => {
                                        setTab(tab === 'delay' ? '' : 'delay');
                                    }}
                                >
                                    <View style={globalStyles.myTaskListTitle}>
                                        <Text style={globalStyles.orderSTitle}>{defaultText.orderDelayTitle}</Text>
                                        <Image
                                            source={tab === 'delay' ? globalImages.down : globalImages.up}
                                            style={globalStyles.myTaskListIcon}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )}
                            {tab === 'delay' && delayTask && (
                                <SwipeListView
                                    disableRightSwipe
                                    ref={swipeListRef}
                                    data={delayTask}
                                    renderItem={renderItem}
                                    renderHiddenItem={data => renderHiddenItem(data, 'delayTask')}
                                    // renderHiddenItem={renderHiddenItem}
                                    rightOpenValue={-75}
                                    previewOpenValue={-40}
                                    previewOpenDelay={3000}
                                    closeOnRowOpen={false}
                                />
                            )}
                        </View>
                        <View>
                            {deleteTask.length !== 0 && (
                                <TouchableOpacity
                                    onPress={() => {
                                        setTab(tab === 'delete' ? '' : 'delete');
                                    }}
                                >
                                    <View style={globalStyles.myTaskListTitle}>
                                        <Text style={globalStyles.orderSTitle}>{defaultText.orderDeleteTitle}</Text>
                                        <Image
                                            source={tab === 'delete' ? globalImages.down : globalImages.up}
                                            style={globalStyles.myTaskListIcon}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )}
                            {tab === 'delete' && deleteTask && (
                                <SwipeListView
                                    disableRightSwipe
                                    ref={swipeListRef}
                                    data={deleteTask}
                                    renderItem={renderItem}
                                    renderHiddenItem={data => renderHiddenItem(data, 'deleteTask')}
                                    // renderHiddenItem={renderHiddenItem}
                                    rightOpenValue={-75}
                                    // previewRowKey={'0'}
                                    previewOpenValue={-40}
                                    previewOpenDelay={3000}
                                />
                            )}
                        </View>
                    </ScrollView>
                ) : (
                    isDataLoaded && (
                        <View style={globalStyles.errorMessageNotFound}>
                            <Text style={globalStyles.errorMessageNotFoundText}>{defaultText.notRecordFound}</Text>
                        </View>
                    )
                )}
            </SafeAreaView>
            {modalOpen && (
                <CustomModal
                    onPressCross={() => setModalOpen(false)}
                    onPressDeleteButton={async () => {
                        if (currentState == 'do') {
                            await (toDoListing[currentIndex].status = 5);
                            await onDeleteTask(toDoListing);
                        } else if (currentState == 'delegate') {
                            await (delegateTask[currentIndex].status = 5);
                            await onDeleteTask(delegateTask);
                        } else if (currentState == 'delayTask') {
                            await (delayTask[currentIndex].status = 5);
                            await onDeleteTask(delayTask);
                        } else if (currentState == 'deleteTask') {
                            await (deleteTask[currentIndex].status = 5);
                            await onDeleteTask(deleteTask);
                        }
                    }}
                    isModalForDelete={true}
                />
            )}
        </Fragment>
    );
};

export default MyTaskLists;
