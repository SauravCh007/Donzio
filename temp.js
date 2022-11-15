import React, { Fragment, useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-simple-toast';
import DropDown from '../../components/CustomDropDown/CustomDropDown';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Loader from '../../components/CustomLoader/CustomLoader';
import CustomSwitch from '../../components/CustomSwitch/CustomSwitch';
import defaultText from '../../helper/defaultText';
import globalImages from '../../helper/globalImages';
import globalStyles from '../../helper/globalStyles';
import Api from '../../util/api';
import AuthApi from '../../util/authApi';
import CustomOptionView from './CustomOptionView';

const Options = props => {
    const [selectedItem_DoHeart, setSelectedItem_DoHeart] = useState('');
    const [selectedItem_DoDollar, setSelectedItem_DoDollar] = useState('');
    const [selectedItem_DelegateHeart, setSelectedItem_DelegateHeart] = useState('');
    const [selectedItem_DelegateDollar, setSelectedItem_DelegateDollar] = useState('');
    const [selectedItem_DeleteHeart, setSelectedItem_DeleteHeart] = useState('');
    const [selectedItem_DeleteDollar, setSelectedItem_DeleteDollar] = useState('');
    const [selectedItem_DelayHeart, setSelectedItem_DelayHeart] = useState('');
    const [selectedItem_DelayDollar, setSelectedItem_DelayDollar] = useState('');
    const [switchEnable, setSwitchEnable] = useState(false);
    const [showLoader, setLoader] = useState(false);
    const [update, forceUpdate] = useState(false);
    const [listingData, setListingData] = useState();
    const [isData, setIsData] = useState([]);
    const [isPriority, setPriority] = useState(0);
    const [optionsMap, setOptionsMap] = useState({
        doHeart: false,
        doDollar: false,
        delegateHeart: false,
        delegateDollar: false,
        deleteHeart: false,
        deleteDollar: false,
        delayHeart: false,
        delayDollar: false,
    });

    useEffect(() => {
        onPageInit();
    }, []);

    const onPageInit = async () => {
        await getOptionListing();
        await getOptionsDetails();
    };

    useEffect(() => {
        onCheck();
    }, [
        selectedItem_DoHeart,
        selectedItem_DoDollar,
        selectedItem_DelegateHeart,
        selectedItem_DelegateDollar,
        selectedItem_DeleteDollar,
        selectedItem_DeleteHeart,
        selectedItem_DelayHeart,
        selectedItem_DelayDollar,
        switchEnable,
    ]);

    const onCheck = () => {
        selectedItem_DoHeart &&
            selectedItem_DoDollar &&
            selectedItem_DelegateHeart &&
            selectedItem_DelegateDollar &&
            selectedItem_DeleteDollar &&
            selectedItem_DeleteHeart &&
            selectedItem_DelayHeart &&
            selectedItem_DelayDollar; //&&
        // onCallSetData();
    };

    const getOptionsDetails = async () => {
        setLoader(true);
        const { data, message } = await AuthApi.getDataFromServer(Api.userOptions);
        setLoader(false);
        if (!data) {
            return Alert.alert('Data Not found');
        } else {
            setIsData(data.data);
            data.data.map((item1, index1) => {
                if (item1.option_type == 1) {
                    setSelectedItem_DoHeart({
                        id: item1.heart,
                        doHeartName: item1.heart_name,
                    });
                    setSelectedItem_DoDollar({
                        id: item1.dollar,
                        doDollarname: item1.dollar_name,
                    });
                }
                if (item1.option_type == 2) {
                    setSelectedItem_DelegateHeart({
                        id: item1.heart,
                        delgHeartName: item1.heart_name,
                    });
                    setSelectedItem_DelegateDollar({
                        id: item1.dollar,
                        delgDollarname: item1.dollar_name,
                    });
                }
                if (item1.option_type == 3) {
                    setSelectedItem_DeleteHeart({
                        id: item1.heart,
                        delHeartName: item1.heart_name,
                    });
                    setSelectedItem_DeleteDollar({
                        id: item1.dollar,
                        delDollarname: item1.dollar_name,
                    });
                }
                if (item1.option_type == 4) {
                    setSelectedItem_DelayHeart({
                        id: item1.heart,
                        delayHeartName: item1.heart_name,
                    });
                    setSelectedItem_DelayDollar({
                        id: item1.dollar,
                        delayDollarname: item1.dollar_name,
                    });
                }

                setPriority(item1.priority);
                if (item1.priority && item1.priority == 1) {
                    setSwitchEnable(true);
                } else if (item1.priority && item1.priority == 2) {
                    setSwitchEnable(false);
                }
            });
        }
    };

    const getOptionListing = async () => {
        setLoader(true);
        const { data, message } = await AuthApi.getDataFromServer(Api.optionList);
        setLoader(false);
        if (!data) {
            return;
        } else {
            setListingData(data.data);
        }
    };

    const onCallRestore = async () => {
        setSwitchEnable(false);
        setLoader(true);
        let endpoint = `${Api.userOptions}`;
        const { data, message } = await AuthApi.deleteDataFromServer(endpoint);
        setLoader(false);
        if (!data) {
            return;
        }
        Toast.show('Restore SuccessFully');
        await getOptionsDetails();
    };

    const onCallSetData = async () => {
        console.log('object delete', selectedItem_DeleteDollar, selectedItem_DeleteHeart);
        const options = [
            {
                option_type: Number(1),
                dollar: Number(selectedItem_DoDollar.id),
                heart: Number(selectedItem_DoHeart.id),
            },
            {
                option_type: Number(2),
                dollar: Number(selectedItem_DelegateDollar.id),
                heart: Number(selectedItem_DelegateHeart.id),
            },
            {
                option_type: Number(3),
                dollar: Number(selectedItem_DeleteDollar.id),
                heart: Number(selectedItem_DeleteHeart.id),
            },
            {
                option_type: Number(4),
                dollar: Number(selectedItem_DelayDollar.id),
                heart: Number(selectedItem_DelayHeart.id),
            },
        ];

        const payload = {
            options: options,
            priority: switchEnable ? 1 : 2,
        };

        setLoader(true);
        const { data, message } = await AuthApi.postDataToServer(Api.userOptions, payload);
        setLoader(false);
        console.log('data as follow as*******************', data);

        if (!data) {
            Alert.alert('something is wrong');
            return;
        }
    };

    return (
        <Fragment>
            <SafeAreaView style={globalStyles.fragmentStyle_1} />
            <SafeAreaView style={globalStyles.optionsView}>
                <CustomHeader
                    title={defaultText.Options}
                    optionHeader
                    onPressDrawer={() => props.navigation.openDrawer()}
                    showDrawerIcon={true}
                    onPressBackOption={() => props.navigation.goBack()}
                />
                {showLoader && <Loader />}
                <ScrollView>
                    <View style={globalStyles.zIndex_4}>
                        <CustomOptionView
                            title={'Do :'}
                            // ImageSource1={globalImages.heartFive}
                            // ImageSource2={globalImages.dollarFive}
                            ImageSource1={globalImages.blueHeart}
                            ImageSource2={globalImages.blueDollar}
                            DropDownPropHeartFive={
                                <DropDown
                                    selectedItem={selectedItem_DoHeart && selectedItem_DoHeart.doHeartName}
                                    setSelectedItem={(data, id) => {
                                        setSelectedItem_DoHeart({ id: id, doHeartName: data });
                                        onCallSetData();
                                    }}
                                    selectDropDown={optionsMap.doHeart}
                                    setSelectDropDown={i => {
                                        {
                                            optionsMap.doHeart = !optionsMap.doHeart;
                                            (optionsMap.doDollar = false),
                                                (optionsMap.delegateHeart = false),
                                                (optionsMap.delegateDollar = false),
                                                (optionsMap.deleteHeart = false),
                                                (optionsMap.deleteDollar = false),
                                                (optionsMap.delayHeart = false),
                                                (optionsMap.delayDollar = false);
                                            setOptionsMap({ ...optionsMap });
                                        }
                                    }}
                                    // setSelectedItem={(data, id) => {
                                    //   setSelectedItem_DoHeart({ id: id, doHeartName: data });
                                    //   onCallSetData();
                                    // }}
                                    data={listingData && listingData.do.heart}
                                />
                            }
                            DropDownDollarFive={
                                <DropDown
                                    selectedItem={selectedItem_DoDollar && selectedItem_DoDollar.doDollarname}
                                    setSelectedItem={(data, id) => {
                                        setSelectedItem_DoDollar({ id: id, doDollarname: data });
                                        onCallSetData();
                                    }}
                                    selectDropDown={optionsMap.doDollar}
                                    setSelectDropDown={i => {
                                        {
                                            optionsMap.doHeart = false;
                                            (optionsMap.doDollar = !optionsMap.doDollar),
                                                (optionsMap.delegateHeart = false),
                                                (optionsMap.delegateDollar = false),
                                                (optionsMap.deleteHeart = false),
                                                (optionsMap.deleteDollar = false),
                                                (optionsMap.delayHeart = false),
                                                (optionsMap.delayDollar = false);
                                            setOptionsMap({ ...optionsMap });
                                        }
                                    }}
                                    data={listingData && listingData.do.dollar}
                                />
                            }
                        />
                    </View>

                    <View style={globalStyles.zIndex_3}>
                        <CustomOptionView
                            title={'Delegate :'}
                            // ImageSource1={globalImages.heartFive}
                            // ImageSource2={globalImages.dollarFive}
                            ImageSource1={globalImages.blueHeart}
                            ImageSource2={globalImages.blueDollar}
                            DropDownPropHeartFive={
                                <DropDown
                                    selectedItem={
                                        selectedItem_DelegateHeart && selectedItem_DelegateHeart.delgHeartName
                                    }
                                    setSelectedItem={(data, id) => {
                                        setSelectedItem_DelegateHeart({
                                            id: id,
                                            delgHeartName: data,
                                        });
                                        onCallSetData();
                                    }}
                                    selectDropDown={optionsMap.delegateHeart}
                                    setSelectDropDown={i => {
                                        {
                                            optionsMap.doHeart = false;
                                            (optionsMap.doDollar = false),
                                                (optionsMap.delegateHeart = !optionsMap.delegateHeart),
                                                (optionsMap.delegateDollar = false),
                                                (optionsMap.deleteHeart = false),
                                                (optionsMap.deleteDollar = false),
                                                (optionsMap.delayHeart = false),
                                                (optionsMap.delayDollar = false);
                                            setOptionsMap({ ...optionsMap });
                                        }
                                    }}
                                    data={listingData && listingData.delegate.heart}
                                />
                            }
                            DropDownDollarFive={
                                <DropDown
                                    selectedItem={
                                        selectedItem_DelegateDollar && selectedItem_DelegateDollar.delgDollarname
                                    }
                                    setSelectedItem={(data, id) => {
                                        setSelectedItem_DelegateDollar({
                                            id: id,
                                            delgDollarname: data,
                                        });
                                        onCallSetData();
                                    }}
                                    selectDropDown={optionsMap.delegateDollar}
                                    setSelectDropDown={i => {
                                        {
                                            optionsMap.doHeart = false;
                                            (optionsMap.doDollar = false),
                                                (optionsMap.delegateHeart = false),
                                                (optionsMap.delegateDollar = !optionsMap.delegateDollar),
                                                (optionsMap.deleteHeart = false),
                                                (optionsMap.deleteDollar = false),
                                                (optionsMap.delayHeart = false),
                                                (optionsMap.delayDollar = false);
                                            setOptionsMap({ ...optionsMap });
                                        }
                                    }}
                                    data={listingData && listingData.delegate.dollar}
                                />
                            }
                        />
                    </View>

                    <View style={globalStyles.zIndex_2}>
                        <CustomOptionView
                            title={'Delete :'}
                            // ImageSource1={globalImages.heartFive}
                            // ImageSource2={globalImages.dollarFive}
                            ImageSource1={globalImages.blueHeart}
                            ImageSource2={globalImages.blueDollar}
                            DropDownPropHeartFive={
                                <DropDown
                                    selectedItem={selectedItem_DeleteHeart && selectedItem_DeleteHeart.delHeartName}
                                    setSelectedItem={(data, id) => {
                                        setSelectedItem_DeleteHeart({ id: id, delHeartName: data });
                                        onCallSetData();
                                    }}
                                    data={listingData && listingData.delete.heart}
                                    selectDropDown={optionsMap.deleteHeart}
                                    setSelectDropDown={i => {
                                        {
                                            optionsMap.doHeart = false;
                                            (optionsMap.doDollar = false),
                                                (optionsMap.delegateHeart = false),
                                                (optionsMap.delegateDollar = false),
                                                (optionsMap.deleteHeart = !optionsMap.deleteHeart),
                                                (optionsMap.deleteDollar = false),
                                                (optionsMap.delayHeart = false),
                                                (optionsMap.delayDollar = false);
                                            setOptionsMap({ ...optionsMap });
                                        }
                                    }}
                                />
                            }
                            DropDownDollarFive={
                                <DropDown
                                    selectedItem={selectedItem_DeleteDollar && selectedItem_DeleteDollar.delDollarname}
                                    setSelectedItem={(data, id) => {
                                        setSelectedItem_DeleteDollar({
                                            id: id,
                                            delDollarname: data,
                                        });
                                        onCallSetData();
                                    }}
                                    selectDropDown={optionsMap.deleteDollar}
                                    setSelectDropDown={i => {
                                        {
                                            optionsMap.doHeart = false;
                                            (optionsMap.doDollar = false),
                                                (optionsMap.delegateHeart = false),
                                                (optionsMap.delegateDollar = false),
                                                (optionsMap.deleteHeart = false),
                                                (optionsMap.deleteDollar = !optionsMap.deleteDollar),
                                                (optionsMap.delayHeart = false),
                                                (optionsMap.delayDollar = false);
                                            setOptionsMap({ ...optionsMap });
                                        }
                                    }}
                                    data={listingData && listingData.delete.dollar}
                                />
                            }
                        />
                    </View>

                    <View style={globalStyles.zIndex_1}>
                        <CustomOptionView
                            title={'Delay :'}
                            // ImageSource1={globalImages.heartFive}
                            // ImageSource2={globalImages.dollarFive}
                            ImageSource1={globalImages.blueHeart}
                            ImageSource2={globalImages.blueDollar}
                            DropDownPropHeartFive={
                                <DropDown
                                    selectedItem={selectedItem_DelayHeart && selectedItem_DelayHeart.delayHeartName}
                                    setSelectedItem={(data, id) => {
                                        setSelectedItem_DelayHeart({
                                            id: id,
                                            delayHeartName: data,
                                        });
                                        onCallSetData();
                                    }}
                                    selectDropDown={optionsMap.delayHeart}
                                    setSelectDropDown={i => {
                                        {
                                            optionsMap.doHeart = false;
                                            (optionsMap.doDollar = false),
                                                (optionsMap.delegateHeart = false),
                                                (optionsMap.delegateDollar = false),
                                                (optionsMap.deleteHeart = false),
                                                (optionsMap.deleteDollar = false),
                                                (optionsMap.delayHeart = !optionsMap.delayHeart),
                                                (optionsMap.delayDollar = false);
                                            setOptionsMap({ ...optionsMap });
                                        }
                                    }}
                                    data={listingData && listingData.delay.dollar}
                                />
                            }
                            DropDownDollarFive={
                                <DropDown
                                    selectedItem={selectedItem_DelayDollar && selectedItem_DelayDollar.delayDollarname}
                                    setSelectedItem={(data, id) => {
                                        setSelectedItem_DelayDollar({
                                            id: id,
                                            delayDollarname: data,
                                        });
                                        onCallSetData();
                                    }}
                                    selectDropDown={optionsMap.delayDollar}
                                    setSelectDropDown={i => {
                                        {
                                            optionsMap.doHeart = false;
                                            (optionsMap.doDollar = false),
                                                (optionsMap.delegateHeart = false),
                                                (optionsMap.delegateDollar = false),
                                                (optionsMap.deleteHeart = false),
                                                (optionsMap.deleteDollar = false),
                                                (optionsMap.delayHeart = false),
                                                (optionsMap.delayDollar = !optionsMap.delayDollar);
                                            setOptionsMap({ ...optionsMap });
                                        }
                                    }}
                                    data={listingData && listingData.delay.dollar}
                                />
                            }
                        />
                    </View>
                    {/* <View style={[globalStyles.optionsCustomView, globalStyles.optionsCustomView_1]}>
                        <View style={[globalStyles.optionsPriorityView]}>
                            <View style={globalStyles.optionsPriorityView_2}>
                                <Text numberOfLines={1} style={globalStyles.optionsPriorityTextStyle}>
                                    Currently prioritizing {''}
                                </Text>

                                <View style={[globalStyles.pr10, globalStyles.flexRowCenter]}>
                                    <View style={globalStyles.mr_5}>
                                        <Text style={globalStyles.optionsPriorityTextStyle}>
                                            {switchEnable ? 'Growth' : 'Values'}
                                        </Text>
                                    </View>
                                    <Image
                                        source={switchEnable ? globalImages.blueDollar : globalImages.blueHeart}
                                        style={globalStyles.optionsPriorityImageStyle}
                                    />
                                </View>
                            </View>
                            <View style={[globalStyles.optionsPriorityView_2, { marginTop: 5 }]}>
                                <Text style={globalStyles.optionsPriorityTextStyle}>Tap switch to </Text>

                                <View style={[globalStyles.pr10, globalStyles.flexRowCenter]}>
                                    <View style={globalStyles.mr_5}>
                                        <Text style={globalStyles.optionsPriorityTextStyle}>
                                            {switchEnable ? 'Values' : 'Growth'}
                                        </Text>
                                    </View>
                                    <Image
                                        source={switchEnable ? globalImages.blueHeart : globalImages.blueDollar}
                                        style={globalStyles.optionsPriorityImageStyle}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={[globalStyles.optionsToggleView, globalStyles.pr10, globalStyles.mt_1_per]}>
                            <CustomSwitch switchEnable={switchEnable} setSwitchEnable={setSwitchEnable} />
                        </View>
                    </View> */}
                    <View style={[globalStyles.optionsCustomView, globalStyles.optionsCustomView_1]}>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: '80%' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text numberOfLines={1} style={globalStyles.optionsPriorityTextStyle}>
                                        Currently prioritizing<Text> {switchEnable ? 'Growth' : 'Values'}</Text> {''}
                                    </Text>
                                    <Image
                                        source={switchEnable ? globalImages.blueDollar : globalImages.blueHeart}
                                        style={globalStyles.optionsPriorityImageStyle}
                                    />
                                </View>
                                <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={globalStyles.optionsPriorityTextStyle}>
                                        Tap to switch to <Text>{switchEnable ? 'Values' : 'Growth'}</Text>{' '}
                                    </Text>
                                    <Image
                                        source={switchEnable ? globalImages.blueHeart : globalImages.blueDollar}
                                        style={globalStyles.optionsPriorityImageStyle}
                                    />
                                </View>
                            </View>
                            <View style={{ width: '20%' }}>
                                <View>
                                    <CustomSwitch switchEnable={switchEnable} setSwitchEnable={setSwitchEnable} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => onCallRestore()}>
                        <View style={[globalStyles.optionsCustomView, globalStyles.optionsRestoreView]}>
                            <Text style={globalStyles.optionsRestoreText}>{defaultText.restoreButton}</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </Fragment>
    );
};

export default Options;
