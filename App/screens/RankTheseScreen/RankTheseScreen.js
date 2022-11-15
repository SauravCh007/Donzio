import React, { Fragment, useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Toast from 'react-native-simple-toast';
import CustomFooter from '../../components/CustomFooter/CustomFooter';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Loader from '../../components/CustomLoader/CustomLoader';
import CustomRankScreen from '../../components/CustomRankScreen/CustomRankScreen';
import defaultText from '../../helper/defaultText';
import globalStyles from '../../helper/globalStyles';
import Responce from '../../helper/sampleData';
import Api from '../../util/api';
import AuthApi from '../../util/authApi';

const RankTheseScreen = props => {
    let dataRank = Responce.letsRank;
    const [data, setData] = useState(dataRank);
    const [showLoader, setLoader] = useState(false);
    const [update, setForceUpdate] = useState(false);
    const [listingData, setListingData] = useState([]);
    const [paginationData, setPaginationData] = useState({
        currentPage: 1,
        totalPages: 1,
        pageLimit: 10,
        totalCount: 0,
    });

    const onCompleteTask = async () => {
        let dataToSend = listingData;
        let allId = [];
        let dataTo = dataToSend.map(val => {
            if (val.id) {
                allId.push(val.id);
            }
            return delete val['status'];
        });

        const ErrorData = [];
        for (var i = 0; i < dataToSend.length; i++) {
            if (
                dataToSend[i].dollar == null ||
                dataToSend[i].heart == null ||
                dataToSend[i].dollar == 0 ||
                dataToSend[i].heart == 0
            ) {
                ErrorData.push(dataToSend[i]);
            }
        }
        if (ErrorData.length != 0) {
            Alert.alert('', 'Rank tasks with atleast 1 heart and 1 dollar !!', [{ text: 'ok' }], { cancelable: true });
            return;
        }

        const payload = {
            data: dataToSend,
        };

        setLoader(true);
        const { data, message } = await AuthApi.putDataToServer(Api.tasks, payload);
        setLoader(false);
        if (!data) {
            return;
        }
        await setTimeout(() => {
            setLoader(false);
            Toast.show('Rank added sucessfully');
            props.navigation.replace('OrderWeekScreen', { id: allId });
        }, 500);
    };

    useEffect(() => {
        onPageInit();
    }, []);

    const onPageInit = async () => {
        await getTaskList();
    };
    const getTaskList = async (currentPage = 1) => {
        setLoader(true);
        let page = currentPage ? currentPage : paginationData.currentPage;
        let limit = 10;
        const taskContent = currentPage == 1 ? [] : listingData;
        const getMyTasks = `${Api.tasks}?no_heart_and_dollar=1&my_task=1&limit=${limit}&page=${page}`;
        const { data, message } = await AuthApi.getDataFromServer(getMyTasks);
        console.log('response', data);
        setLoader(false);

        if (!data) {
            return;
            // Toast.show(data.message[0]);
        } else {
            setListingData([...taskContent, ...data.data]);
            setPaginationData({
                currentPage: data.paginator.current_page + 1,
                pageLimit: data.paginator.limit,
                totalPages: data.paginator.total_pages,
                totalCount: data.paginator.total_count,
            });
        }
    };

    const onCallDollarPress = (value, item, index) => {
        setForceUpdate(!update);
        let dataToAppend = item;
        dataToAppend.dollarRank = value;
        let setWholeData = listingData;
        setWholeData[index] = dataToAppend;
        setData(setWholeData);
        setForceUpdate(!update);
    };

    const onCallHeartPress = (value, item, index) => {
        setForceUpdate(!update);
        let dataToAppend = item;
        dataToAppend.heartRank = value;
        let setWholeData = listingData;
        setWholeData[index] = dataToAppend;
        setData(setWholeData);
        setForceUpdate(!update);
    };

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        if (contentOffset.y > 0) {
            return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
        }
    };

    return (
        <Fragment>
            <SafeAreaView style={globalStyles.fragmentStyle_1} />
            <SafeAreaView style={globalStyles.fragmentStyle_2}>
                <View style={globalStyles.topMainContainer}>
                    <CustomHeader
                        headerTitle={defaultText.letsRankTheseSimple}
                        onPressDrawer={() => props.navigation.openDrawer()}
                        showDrawerIcon={true}
                    />
                    {showLoader && <Loader />}
                    <ScrollView
                        onScroll={async ({ nativeEvent }) => {
                            if (
                                isCloseToBottom(nativeEvent) &&
                                paginationData.currentPage <= paginationData.totalPages
                            ) {
                                await getTaskList(paginationData.currentPage);
                            }
                        }}
                    >
                        <Text style={globalStyles.rScreenText}>{defaultText.rankYourTo}</Text>
                        <View style={globalStyles.rScreenListView}>
                            {listingData &&
                                listingData.map((item, index) => (
                                    <View key={index}>
                                        <CustomRankScreen
                                            words={item.content}
                                            onCallDollarPress={value => {
                                                listingData[index].dollar = value;
                                                onCallDollarPress(value, item, index);
                                            }}
                                            onCallHeartPress={value => {
                                                listingData[index].heart = value;
                                                onCallHeartPress(value, item, index);
                                            }}
                                            dollarRank={item.dollarRank || 0}
                                            heartRank={item.heartRank || 0}
                                        />
                                    </View>
                                ))}
                        </View>
                    </ScrollView>
                    <View style={globalStyles.bottomTab}>
                        <CustomFooter title={defaultText.completeToDo} onPress={() => onCompleteTask()} />
                    </View>
                </View>
            </SafeAreaView>
        </Fragment>
    );
};

export default RankTheseScreen;
