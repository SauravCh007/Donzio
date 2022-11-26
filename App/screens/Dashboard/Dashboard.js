import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-simple-toast';
import { SwipeListView } from 'react-native-swipe-list-view';
import Calendar from '../../components/Calendar/Calendar';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Loader from '../../components/CustomLoader/CustomLoader';
import CustomModal from '../../components/CustomModal/CustomModal';
import defaultText from '../../helper/defaultText';
import globalImages from '../../helper/globalImages';
import { default as globalStyles, default as styles } from '../../helper/globalStyles';
import Responce from '../../helper/sampleData';
import SharedService from '../../services/SharedService/sharedServices';
import Api from '../../util/api';
import AuthApi from '../../util/authApi';

const Dashboard = props => {
    const swipeListRef = useRef(null);
    let data = Responce.smapleMonthTask;
    let MyToDoList = Responce.MyToDoList;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showLoader, setLoader] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [listingData, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [paginationData, setPaginationData] = useState({
        currentPage: 1,
        totalPages: 1,
        pageLimit: 10,
        totalCount: 0,
    });

    const isDateSame = moment(selectedDate).format('MMM Do YY') == moment(new Date()).format('MMM Do YY');

    const onCallRadioButton = (item, index) => {
        let dataToAppend = item;
        dataToAppend.status = !dataToAppend.status;
        MyToDoList[index] = dataToAppend;
    };

    const getTaskList = async (currentPage = 1, getID) => {
        setLoader(true);
        let page = currentPage ? currentPage : paginationData.currentPage;
        const date = moment(selectedDate).format('YYYY-MM-DD');
        let limit = paginationData.pageLimit;
        const taskContent = currentPage == 1 ? [] : listingData;
        const getDelegateTask = `${Api.tasks}?my_task=1&is_task_assigned=2&start_date=${date}&end_date=${date}&sort_direction=descending&page=${page}&limit=${limit}&sort_by=updated_at&heart_dollar=1`;
        const { data, message } = await AuthApi.getDataFromServer(getDelegateTask);
        console.log("data",data)

        setLoader(false);
        setDataLoaded(true);
        if (!data) {
            await setTimeout(() => {
                Toast.show(message);
            }, 500);
            return;
        } else {
            const taskArr = [...taskContent, ...data.data];
            const newArr = await taskArr.map((e, i) => {
                e.key = `${i}`;
                return e;
            });
            setData([...newArr]);
            setPaginationData({
                currentPage: data.paginator.current_page + 1,
                pageLimit: data.paginator.limit,
                totalPages: data.paginator.total_pages,
                totalCount: data.paginator.total_count,
            });
        }
    };

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        if (contentOffset.y > 0) {
            return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
        }
    };

    const onTaskAdd = async () => {
        props.navigation.navigate('AccomplishThisWeekScreen');
    };
    useFocusEffect(
        React.useCallback(() => {
            onPageInit();
        }, [selectedDate]),
    );

    useEffect(() => {
        SharedService.isLogOut.subscribe(value => {
            if (value) {
                getLogout();
            }
        });
    }, []);

    const onPageInit = async () => {
        await getTaskList();
    };

    const getLogout = async params => {
        await AsyncStorage.removeItem('usertoken');
        props.navigation.replace('LoginScreen');
    };

    const renderHiddenItem = (item, index) => (
        <View style={globalStyles.rowBack}>
            <View style={[globalStyles.backRightBtn, globalStyles.backRightBtnRight]}>
                <TouchableOpacity
                    onPress={async () => {
                        await setCurrentIndex(item.index);
                        await onPressSwipeDelete(index, item.index);
                    }}
                >
                    <Image style={globalStyles.deleteIconView} source={globalImages.deleteIcon} />
                    <Text style={globalStyles.backTextWhite}>{defaultText.delete}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderItem = (data, index) => (
        <TouchableHighlight underlayColor={'#AAA'}>
            <View style={globalStyles.rowFront} underlayColor={'#AAA'} key={index}>
                <View style={globalStyles.borderBittomStyle}>
                    <View style={globalStyles.p_15}>
                        <View style={globalStyles.dashBTaskMainView}>
                            <View style={globalStyles.dashBFirstView}>
                                <Image style={globalStyles.dashBImagestyle} source={globalImages.getTask} />
                            </View>
                            <View style={globalStyles.dashBSecondView}>
                                <Text style={globalStyles.defaultText}>{data.item.content}</Text>
                            </View>
                        </View>
                        <View style={[globalStyles.dashBTaskMainView, globalStyles.mt10]}>
                            <View style={globalStyles.dashBFirstView}>
                                <Text style={globalStyles.defaultText}>Date :</Text>
                            </View>
                            <View style={globalStyles.dashBSecondView}>
                                <Text style={globalStyles.defaultText}>{moment(data.item.task_date && data.item.task_date).format('YYYY/MM/DD')}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
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
        setTimeout(() => {
            Toast.show('Task deleted successfully.');
            getTaskList();
        }, 1000);
        swipeListRef.current.closeAllOpenRows();
    };

    return (
        <Fragment>
            <SafeAreaView style={globalStyles.fragmentStyle_1} />
            <SafeAreaView style={globalStyles.topMainContainer}>
                <CustomHeader
                    headerTitle={defaultText.allToDo}
                    onPressDrawer={() => props.navigation.openDrawer()}
                    showDrawerIcon={true}
                />
                {showLoader && <Loader />}
                <View style={[globalStyles.dateView, globalStyles.ph_15]}>
                    <View style={globalStyles.justifyContent_sb}>
                        <View>
                            <Text style={styles.dateStyle}>
                                {moment(selectedDate && selectedDate).format('MMMM D, YYYY')}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.dateTodayStyle}>{isDateSame ? 'Today' : ''}</Text>
                        </View>
                    </View>
                    <View style={globalStyles.addTaskView}>
                        {new Date().getMonth() < new Date(selectedDate).getMonth() ||
                            (new Date().getMonth() == new Date(selectedDate).getMonth() &&
                                new Date().getDate() <= new Date(selectedDate).getDate() && (
                                    <TouchableOpacity style={styles.addTaskBtn} onPress={() => onTaskAdd()}>
                                        <Text style={styles.addTaskText}>+ Add Task</Text>
                                    </TouchableOpacity>
                                ))}
                    </View>
                </View>
                <View style={globalStyles.ph_15}>
                    <Calendar
                        onSelectDate={async dt => {
                            setSelectedDate(dt);
                            await AsyncStorage.setItem('assignedDate', JSON.stringify(dt));
                        }}
                        showDaysBeforeCurrent={15}
                        showDaysAfterCurrent={15}
                    />
                </View>
                <View style={globalStyles.borderTopStyle} />
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
                    dataLoaded && (
                        <View style={globalStyles.errorMessageNotFound}>
                            <Text style={globalStyles.errorMessageNotFoundTextNew}>{defaultText.notRecordFound}</Text>
                        </View>
                    )
                )}
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

export default Dashboard;
