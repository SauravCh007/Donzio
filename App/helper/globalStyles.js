import { Dimensions, Platform, StyleSheet } from 'react-native';
import { default as Color, default as defaultColor } from './defaultColor';
const { width, height } = Dimensions.get('window');

const inlineRow = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
};
const darkText = {
    textAlign: 'center',
    fontSize: 21,
    fontWeight: 'bold',
};
const scroll = {
    height: '100%',
};
const bottom = {
    bottom: 0,
};
const marginMinus100 = {
    marginTop: -100,
};
const marginMinus70 = {
    marginTop: -70,
};
const bottomTab = {
    bottom: 0,
};
const row = {
    flexDirection: 'row',
};
const marginTop10 = {
    marginTop: 10,
};
const marginTop10Per = {
    marginTop: '10%',
};
const fontSize_16 = {
    fontSize: 16,
};
const paddingLeft_10 = {
    paddingLeft: 10,
};
const headerText = {
    fontSize: 22,
    fontWeight: 'bold',
};
const titleText = {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
};
const fontSize_15 = {
    fontSize: 15,
};
const width_90 = {
    width: '90%',
};
const width_100 = {
    width: '100%',
};
const fontSize_20 = {
    fontSize: 20,
};
const textAlignCenter = {
    textAlign: 'center',
};
const boldText = {
    fontWeight: 'bold',
};

const styles = StyleSheet.create({
    lightBorder: {
        borderBottomWidth: 0.3,
        borderBottomColor: '#d3d3d3',
    },
    backgroundColorFaintGrey: {
        backgroundColor: defaultColor.greyFaint,
    },
    pb_10: {
        paddingBottom: 10,
    },
    justifyContent_sb: {
        justifyContent: 'space-between',
    },
    ph_15: {
        paddingHorizontal: 15,
    },
    p_15: {
        padding: 16,
    },
    drawerWidth: {
        width: '55%',
    },
    drawerCloseIcon: {
        position: 'absolute',
        top: 5,
        height: 22,
        width: 22,
        right: 10,
    },
    drawerDogIcon: {
        resizeMode: 'cover',
        height: 60,
        width: 60,
    },
    drawerTopView: {
        height: 80,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#035BFD',
    },
    height_100: {
        height: '100%',
    },
    alignItemsCenter: {
        alignItems: 'center',
    },
    textInputErrorMsg: {
        marginLeft: '19%',
        color: 'red',
        marginTop: 5,
    },
    marginMinus70: {
        ...marginMinus70,
    },
    fragmentStyle_1: {
        flex: 0,
        backgroundColor: Color.skyBlue,
    },
    fragmentStyle_2: {
        flex: 1,
        backgroundColor: Color.orange,
    },
    fragmentStyle_3: {
        flex: 1,
        backgroundColor: Color.white,
    },
    topMainContainer: {
        flex: 1,
        backgroundColor: Color.backgroundColor,
    },
    textAlignCenter: {
        ...textAlignCenter,
        fontWeight: '600',
    },
    headerText: {
        ...headerText,
    },
    titleText: {
        ...titleText,
    },
    fontSize_20: {
        ...fontSize_20,
    },
    width_90: {
        ...width_90,
    },
    width_100: {
        ...width_100,
    },
    mt5: {
        marginTop: 5,
    },
    mt25: {
        marginTop: 25,
    },
    mt30: {
        marginTop: 30,
    },
    mt20: {
        marginTop: 20,
    },
    mt10: {
        marginTop: 10,
    },
    mtMinus_70: {
        marginTop: -70,
    },
    mt_10per: {
        marginTop: '10%',
    },
    ml_15per: {
        marginLeft: '15%',
    },
    mt_50per: {
        marginTop: '50%',
    },
    paddingLeft_10: {
        paddingLeft: 10,
    },
    pl5: {
        marginRight: -10,
    },
    ph10: {
        paddingHorizontal: 10,
    },
    paddingVertical_5: {
        paddingVertical: 5,
    },
    fontSize_16: {
        ...fontSize_16,
    },
    fontSize_15: {
        fontSize: 15,
        marginLeft: 5,
    },
    mb20: {
        marginBottom: 10,
    },
    mb25: {
        marginBottom: 25,
    },
    p1: {
        padding: 1,
    },
    p10: {
        padding: 10,
    },
    pt10: {
        paddingTop: 10,
    },
    boldText: {
        ...boldText,
    },
    simpleErrorMsg: {
        fontSize: 13,
        color: 'red',
        marginHorizontal: 40,
        marginTop: 8,
    },
    scroll: {
        ...scroll,
        //paddingVertical:70
    },
    deleteScrollView: {
        ...scroll,
        padding: 10,
    },
    bottomTab: {
        ...bottomTab,
    },
    row: {
        ...row,
    },
    marginMinus100: {
        ...marginMinus100,
    },
    darkText: {
        ...darkText,
    },
    darkTextSimple: {
        textAlign: 'center',
        fontSize: 21,
    },
    marginTop10: {
        ...marginTop10,
    },
    marginTop10Per: {
        ...marginTop10Per,
    },
    zIndex1: {
        zIndex: 1,
    },
    customHeaderView: {
        backgroundColor: Color.skyBlue,
    },
    customHeaderViewNew: {
        height: 80,
        justifyContent: 'center',
    },
    customHeaderRow: {
        flexDirection: 'row',
        width: '100%',
    },
    customHeaderIconView: {
        width: '15%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    customHeaderMiddleView: {
        width: '70%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    customHeaderMiddleTextNew: {
        textAlign: 'center',
        fontSize: 21,
        color: Color.white,
    },
    customHeaderMiddleTextNewforDelg: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: Color.white,
    },
    customHeaderViewNew: {
        height: 80,
        justifyContent: 'center',
    },
    customHeaderViewLastNew: {
        height: 80,
        justifyContent: 'center',
    },
    customHeaderRow: {
        flexDirection: 'row',
        width: '100%',
    },
    customHeaderIconView: {
        width: '15%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    customHeaderIconStyle: {
        height: 20,
        width: 20,
    },
    customHeaderIconStyleBackNew: {
        justifyContent: 'center',
        alignSelf: 'center',
        height: 20,
        width: 20,
    },
    customHeaderMiddleView: {
        width: '70%',
        alignItems: 'center',
        alignSelf: 'center',
    },

    customHeaderMiddleText: {
        textAlign: 'center',
        color: Color.white,
        fontSize: 27,
        fontWeight: 'bold',
        justifyContent: 'center',
    },
    customButtonView: {
        height: 60,
        width: 180,
        backgroundColor: Color.skyBlue,
        borderRadius: 35,
        justifyContent: 'center',
        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 1,
        // },
        // shadowRadius: 2,
        // shadowOpacity:2,
    },
    customButtonText: {
        color: Color.white,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    customHeaderOpview: {
        flexDirection: 'row',
        width: '85%',
        marginLeft: '-5%',
    },
    customHeaderOpFirstView: {
        width: '30%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    customHeaderOpImageStyle: {
        height: 40,
        width: 40,
    },
    customHeaderOpMiddleview: {
        width: '40%',
    },
    //dsadsadsadasd
    loginImageView: {
        top: 0,
    },
    loginImageStyle: {
        height: 180,
        width: 180,
        transform: [{ rotate: '0deg' }, { translateX: -50 }, { translateY: -65 }],
    },
    loginTextScreen: {
        ...darkText,
    },
    loginTextView: {
        //  marginTop: "18%",
    },
    loginCustomTextInputView: {
        marginTop: '10%',
    },
    loginButtonTopMargin: {
        marginTop: '18%',
        alignSelf: 'center',
    },

    invalidNoTextView: {
        marginTop: '30%',
        width: '70%',
        alignSelf: 'center',
    },
    invalidNoText: {
        ...darkText,
    },
    invalidNoScroll: {
        ...scroll,
    },
    invalidNoImageStyle: {
        height: 180,
        width: 180,
        transform: [{ rotate: '0deg' }, { translateY: 20 }, { translateX: -50 }],
    },
    invalidNoBottom: {
        bottom: 0,
        position: 'absolute',
    },
    verificationCodeView: {
        paddingTop: 180,
        // marginTop: "18%",
    },
    verificationCodeTextScreen: {
        ...darkText,
    },
    verificationCodeTextView: {
        marginTop: '10%',
    },
    verificationCodeButtonTopMargin: {
        marginTop: '18%',
        alignSelf: 'center',
    },
    verificationCodeImageView: {
        bottom: 0,
        position: 'absolute',
        alignSelf: 'flex-end',
    },
    verificationCodeImageStyle: {
        height: 180,
        width: 180,
        transform: [{ rotate: '0deg' }, { translateX: 58 }, { translateY: 45 }],
    },
    thisWeekImageView: {
        top: 0,
    },
    thisWeekImageStyle: {
        height: 100,
        width: 100,
        transform: [{ rotate: '180deg' }, { translateX: 50 }, { translateY: 50 }],
    },
    thisWeekText: {
        ...darkText,
    },
    orderSTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 8,
        // marginTop: "5%",
        // marginHorizontal: "3%",
    },

    customTextInputMainViewForNumber: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 60,
        width: '100%',
    },
    customTextInputMainView: {
        marginHorizontal: 30,
    },
    customTextInputNumberView: {
        alignSelf: 'center',
        marginRight: 0,
        width: '10%',
    },
    customTextInputNumberText: {
        fontSize: 30,
    },
    customTextInputWriteView: {
        width: '100%',
        backgroundColor: Color.simpleGrey,
        borderRadius: 10,
    },
    customTextInputWriteViewNew: {
        width: '80%',
        backgroundColor: Color.simpleGrey,
        borderRadius: 10,
    },
    customTextInputWriteTextNew: {
        marginHorizontal: 10,
        fontSize: 15,
        padding: Platform.OS == 'ios' ? 10 : 8,
    },
    customTextInputWriteText: {
        marginHorizontal: 8,
        fontSize: 15,
        padding: Platform.OS == 'ios' ? 10 : 8,
    },
    thisWeekTop15: {
        marginTop: '15%',
    },
    thisWeekBottom30: {
        marginBottom: 30,
    },
    thisWeekCompleteView: {
        alignSelf: 'center',
        marginVertical: '5%',
    },
    thisWeekCompleteText: {
        textAlign: 'center',
        fontSize: 20,
    },
    thisWeekCompleteImageStyle: {
        height: 70,
        width: 70,
        borderRadius: 50,
        alignSelf: 'center',
    },
    thisWeekCompleteImageStyleNew: {
        margin: '5%',
        height: 68,
        width: 68,
        borderRadius: 60,
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Color.green,
    },
    thisWeekMargin5: {
        margin: '5%',
    },
    accImageView: {
        top: 0,
        alignSelf: 'flex-end',
    },
    accScreenImageStyle: {
        // height: 100,
        // width: 100,
        // transform: [
        //   { rotateX: "180deg" },
        //   { rotateZ: "27deg" },
        //   { translateX: 45 },
        //   { translateY: 33 },
        // ],
        height: 100,
        width: 100,
        transform: [{ rotateX: '0deg' }, { rotateZ: '0deg' }, { translateX: 26 }, { translateY: -35 }],
    },
    accScreenText: {
        ...darkText,
        marginTop: 40,
    },
    accScreenBottom30: {
        marginBottom: 30,
    },
    accMyToDoText: {
        marginLeft: 20,
        fontSize: 18,
        marginTop: '5%',
        fontWeight: 'bold',
    },
    accNewTextInputView: {
        marginTop: '5%',
    },
    accAddNewView: {
        flexDirection: 'row',
        marginLeft: 20,
    },
    accPlusImageStyle: {
        height: 40,
        width: 40,
    },
    accAddNewViewText: {
        alignSelf: 'center',
        marginLeft: 13,
    },
    accAddNewText: {
        fontSize: 25,
    },
    accMarginBottom: {
        marginBottom: '10%',
    },
    bottomMainView: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: Color.orange,
        height: 60,
    },
    bottomTextView: {
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    bottomText: {
        color: 'white',
        fontSize: 25,
    },
    bottomImageView: {
        width: '20%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    bottomImageStyle: {
        height: 30,
        width: 45,
    },
    rTImageView: {
        top: 0,
        alignSelf: 'flex-end',
    },
    rTImageStyle: {
        height: 100,
        width: 100,
        transform: [{ rotateX: '180deg' }, { rotateZ: '27deg' }, { translateX: 45 }, { translateY: 33 }],
    },
    rTText: {
        ...darkText,
    },
    rScreenListView: {
        // marginHorizontal: 20,
        marginTop: '10%',
    },
    rScreenText: {
        fontSize: 19,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginTop: 20,
    },
    cRankMainViewBorder: {
        // marginHorizontal: 20,
        borderBottomWidth: 0.3,
        borderBottomColor: Color.greyFaint,
    },
    cRankMainView: {
        marginTop: '3%',
        marginBottom: '1%',
        marginHorizontal: 20,
    },

    cRankWordText: {
        fontSize: 16,
    },
    cRankMarVertical: {
        marginVertical: 10,
    },
    cRankView: {
        flexDirection: 'row',
        width: '100%',
    },
    cRankImageView: {
        width: '20%',
        alignItems: 'center',
    },
    cRankImageStyle: {
        height: 35,
        width: 35,
    },
    cRankNoView: {
        width: '20%',
        alignItems: 'center',
    },
    cRankTextDollarHeartText: {
        fontSize: 16,
        marginBottom: 10,
        opacity: 0.5,
    },
    orderSImageView: {
        top: 0,
        alignSelf: 'flex-end',
    },
    orderSImageStyle: {
        height: 100,
        width: 100,
        //height: 100,
        //width: 100,
        // transform: [
        //   { rotateX: "180deg" },
        //   { rotateZ: "27deg" },
        //   { translateX: 50 },
        //   { translateY: 46 },
        // ],
        transform: [{ rotateX: '0deg' }, { rotateZ: '0deg' }, { translateX: 26 }, { translateY: -35 }],
    },
    thisWeekText: {
        ...darkText,
    },
    thisWeekTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: '5%',
        marginHorizontal: '5%',
    },
    cWMainView: {
        marginHorizontal: '3%',
        marginTop: '3%',
    },
    cWContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    cWNoView: {
        width: '8%',
    },
    cWNoText: {
        marginTop: -3,
        fontSize: 22,
    },
    cWWordView: {
        width: '92%',
        marginBottom: 10,
    },
    cWWordText: {
        fontSize: 18,
    },
    cWImageView: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 15,
    },
    cWImageListView: {
        width: '40%',
        flexDirection: 'row',
    },
    cWImageListViewContainer: {
        width: '12%',
    },
    cWDollarHeartImageStyle: {
        height: 40,
        width: 40,
    },
    cWDollarHeartText: {
        width: 40,
        fontSize: 15,
        textAlign: 'center',
        marginTop: 3,
    },
    cWLastView: {
        width: '20%',
        // flexDirection: "row",
        // alignSelf: "flex-start",
    },
    cWDelegateImageStyle: {
        height: 18,
        width: 50,
        alignSelf: 'center',
    },
    cWDelayImageStyle: {
        height: 30,
        width: 31,
        alignSelf: 'center',
    },
    cWDeleteImageStyle: {
        height: 30,
        width: 25,
        alignSelf: 'center',
    },
    cWArrowImageStyle: {
        height: 30,
        width: 25,
        alignSelf: 'flex-end',
    },
    cWCheckImageStyle: {
        height: 40,
        width: 40,
        alignSelf: 'center',
        borderRadius: 20,
    },
    cWCheckImageView: {
        borderWidth: 1,
        alignSelf: 'flex-start',
        borderRadius: 20,
        borderColor: '#819c1d',
    },
    cWCheckImageView_1: {
        height: 40,
        width: 40,
        justifyContent: 'flex-end',
    },
    cWAssignMainView: {
        marginBottom: 5,
        borderBottomWidth: 0.3,
    },
    cWBorders: {
        borderTopWidth: 0.3,
        borderBottomWidth: 0.3,
    },
    cWassignView: {
        marginHorizontal: '10%',
        marginBottom: '4%',
        flexDirection: 'row',
        width: '100%',
    },
    cWAssign70: {
        width: '70%',
    },
    cWAssignTextView: {
        alignSelf: 'center',
    },
    cWAssignText: {
        fontSize: 25,
    },
    cWAssignImg: {
        marginLeft: '8%',
        justifyContent: 'center',
    },
    cWAssignImgStyle: {
        height: 65,
        width: 65,
        borderRadius:50,
        resizeMode:"cover"
    },
    cWAssignImgStyleNew: {
        height: 50,
        width: 50,
        borderRadius: 40,
        marginLeft: 7,
    },
    cWAssignImgStyleNew: {
        height: 50,
        width: 50,
        // resizeMode: "contain",
        marginLeft: 7,
    },
    cWTapAssignText: {
        color: Color.orange,
        marginTop: 10,
        color: 'black',
    },
    cWTapAssignTextNew: {
        marginTop: 5,
        fontSize: 16,
        color: 'black',
    },
    cWAssignLastArrow: {
        width: '30%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    cWAssignLastArrowStyle: {
        height: 30,
        width: 20,
    },
    cWIsDeleteMainView: {
        flexDirection: 'row',
        width: '100%',
        marginTop: '2%',
    },
    cWIsDeleteFirstView: {
        flexDirection: 'row',
        width: '70%',
    },
    cWIsDeleteDelayImageView: {
        width: '25%',
        alignSelf: 'flex-end',
    },
    cWIsDeleteDelayImageStyle: {
        height: 25,
        width: 26,
    },
    cWIsDeleteDelegateImageView: {
        width: '40%',
        alignSelf: 'flex-end',
    },
    cWIsDeleteDelegateImageStyle: {
        height: 22,
        width: 63,
    },
    cWIsDeleteCheckImageView: {
        width: '30%',
        alignSelf: 'flex-end',
    },
    cWIsDeleteCheckImageStyle: {
        height: 30,
        width: 30,
    },
    cWIsDeleteImageView: {
        width: '30%',
        alignItems: 'center',
    },
    cWIsDeleteImageStyle: {
        height: 40,
        width: 35,
    },
    cWDForMainBorder: {
        // borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
    },
    cWDForMainView: {
        marginVertical: 10,
        marginLeft: 20,
        width: '100%',
    },
    cWDForMainViewNew: {
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 20,
        width: '100%',
    },
    cWDForTextView: {
        width: '40%',
        alignSelf: 'center',
    },
    cWDForText: {
        fontSize: 25,
    },
    cWDForFirstView: {
        width: '60%',
    },
    cWDForTextInputView: {
        width: '30%',
        // alignSelf: "center",
        alignItems: 'center',
        //justifyContent:'center',
    },
    cWDForDarkBorder: {
        borderWidth: 1.5,
        height: '50%',
    },
    cWDForTextInputStyle: {
        padding: 0,
        fontSize: 14,
        textAlign: 'center',
        width: '100%',
    },
    cWDForMonthWeekDayView: {
        //width: "30%",
        //alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
    },
    cWDForMonthWeekDayText: {
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 13,
    },
    cWIsTaskMainView: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 10,
    },
    cWIsTaskImageView: {
        width: '33.33%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    dPushTextDark: {
        ...darkText,
    },
    cWDForLastView: {
        marginTop: 10,
    },
    cWDForLastText: {
        color: Color.orange,
    },
    cWIsTaskDealyImageStyle: {
        height: 25,
        width: 26,
    },
    cWIsTaskDelegateImage: {
        height: 20,
        width: 55,
    },
    cWIsTaskCheckMarkImage: {
        height: 50,
        width: 50,
        borderRadius: 80,
    },
    cWIsTaskBorderImage: {
        borderWidth: 1,
        borderRadius: 80,
        borderColor: Color.green,
    },
    dPushView: {
        borderBottomWidth: 1,
        borderColor: Color.greyFaint,
    },
    dPushMainView: {
        marginHorizontal: '3%',
        marginVertical: '5%',
    },
    dPushMemberView: {
        flexDirection: 'row',
        marginTop: 10,
    },
    dPushMemberList: {
        width: '15%',
        alignItems: 'center',
    },
    dPushMemberImgStyle: {
        height: 80,
        width: 80,
    },
    dPushItemView: {
        marginTop: '5%',
        paddingBottom: '10%',
    },
    dPushItemMainView: {
        marginHorizontal: '3%',
    },
    pLMainView: {
        borderBottomWidth: 0.5,
        marginTop: 10,
    },
    pLMargin: {
        margin: 15,
    },
    pLListMainView: {
        marginTop: 10,
        paddingBottom: 10,
    },
    pLListBorder: {
        borderWidth: 0.5,
        borderColor: Color.greyFaint,
    },
    deleteSListMainView: {
        marginTop: 10,
        paddingBottom: 10,
    },
    deleteSListBorder: {
        borderWidth: 0.5,
        borderColor: Color.greyFaint,
    },
    delayListMainView: {
        marginTop: 10,
        paddingBottom: 10,
    },
    settingBackground: {
        backgroundColor: Color.simpleGrey,
    },
    settingsOptionsView: {
        ...row,
        marginTop: 15,
        padding: 10,
        height: 100,
        width: '100%',
        borderTopWidth: 1.5,
        borderBottomWidth: 1.5,
        borderTopColor: Color.borderColor,
        borderBottomColor: Color.borderColor,
        backgroundColor: Color.white,
    },
    settingOptionTitle: {
        fontSize: 22,
    },
    teamMembersMiddleView: {
        width: '65%',
        height: '100%',
    },
    teamMembersIconView: {
        width: '20%',
        height: '100%',
        alignItems: 'center',
    },
    teamMemberMidTop: {
        height: '45%',
        width: '100%',
        justifyContent: 'center',
    },
    teamMemberMidBottom: {
        height: '55%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingProfileView: {
        width: '25%',
        height: '100%',
        alignItems: 'center',
    },
    settingProfileIcon: {
        height: 40,
        width: 40,
        marginHorizontal: 1,
    },
    settingProfileIconNew: {
        height: 40,
        width: 40,
        borderRadius: 40,
        marginHorizontal: 1,
    },
    settingArrowRight: {
        width: '10%',
        height: '100%',
        padding: 5,
        justifyContent: 'center',
    },
    settingArrowRightStyle: {
        height: 30,
        width: 25,
    },
    settingOptionsLeft: {
        width: '25%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingOptionsMiddle: {
        width: '65%',
        justifyContent: 'center',
    },
    settingsBigIcon: {
        resizeMode: 'contain',
        height: 25,
        // width: '25%',
    },
    settingsSmallIcon: {
        height: 35,
        width: 35,
    },
    yourTeamMember: {
        ...row,
        height: 100,
        borderBottomWidth: 1.5,
        borderBottomColor: Color.borderColor,
        paddingLeft: 15,
        alignItems: 'center',
    },
    yourTeamMemberIcon: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TeamMemberTitle: {
        fontSize: 20,
        paddingLeft: '5%',
    },
    customTeamMember: {
        ...row,
        padding: 15,
        height: 90,
        borderBottomWidth: 1.5,
        borderBottomColor: Color.borderColor,
    },
    TeamMemberProfile: {
        width: '25%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TeamMemberProfileStyle: {
        resizeMode: 'contain',
        height: 80,
        width: 80,
        borderRadius: 80,
    },
    customTeamMemberMiddle: {
        justifyContent: 'center',
        width: '60%',
    },
    addNewTeamMember: {
        width: '85%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inviteByPhoneImageView: {
        marginTop: '15%',
        alignItems: 'center',
    },
    inviteByPhoneButtonTopMargin: {
        marginTop: '15%',
        alignSelf: 'center',
    },
    inviteByPhoneImageViewIcon: {
        height: 100,
        width: 100,
    },
    addNumberView: {
        marginTop: '15%',
    },
    addNumberText: {
        ...darkText,
    },
    inviteByPhoneTextInputView: {
        marginTop: '10%',
    },
    yTMainView: {
        borderBottomWidth: 1,
        borderColor: Color.greyFaint,
    },
    yTTextView: {
        margin: '5%',
    },
    yTPaddingBtm: {
        paddingBottom: 20,
    },
    yTBorder: {
        borderBottomWidth: 1,
        borderColor: Color.greyFaint,
    },
    uINameMainView: {
        borderBottomWidth: 1,
        borderColor: Color.grey,
    },
    uIUserImageStyle: {
        height: 70,
        width: 70,
        borderRadius: 60,
    },
    uIUserTextView: {
        alignSelf: 'center',
        marginLeft: 10,
    },
    uIUserTextName: {
        fontSize: 20,
    },
    uIUserTextEmail: {
        color: Color.greyFaint,
    },
    uIBorder: {
        borderBottomWidth: 1,
        borderColor: Color.grey,
    },
    uIRemoveMargin: {
        flexDirection: 'row',
        marginHorizontal: '5%',
        marginVertical: 40,
    },
    uIAlignCenter: {
        alignSelf: 'center',
    },
    uIRemoveText: {
        fontSize: 20,
        color: 'red',
    },
    uIProjectMainView: {
        flexDirection: 'row',
        margin: '5%',
    },
    uIProjectView: {
        alignSelf: 'center',
        width: '40%',
        alignSelf: 'center',
    },
    uIProjectText: {
        fontSize: 25,
    },
    uIProjectViewLast: {
        width: '60%',
    },
    uIProjectViewLastText: {
        fontSize: 5,
        padding: 5,
    },
    uIMarginL20: {
        marginLeft: 20,
        padding: 2,
    },
    // customDropDownView: {
    //   width: "100%",
    //   borderWidth: 4,
    //   borderColor: Color.skyBlue,
    //   flexDirection: "row",
    // },
    customDropDownListView: {
        width: '80%',
        borderRightWidth: 4,
        borderRightColor: Color.skyBlue,
        paddingVertical: '7%',
        paddingHorizontal: 10,
    },
    customDropDownList_1: {
        // zIndex: 9999,
        elevation: 15,
        position: Platform.OS == 'ios' ? 'absolute' : 'relative',
        backgroundColor: Color.white,
        top: Platform.OS == 'ios' ? '100%' : 0,
        // left: 0,
        // right: 0,
        padding: '1%',
        paddingLeft: '3%',
        width: '100%',
        borderTopWidth: 0,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderBottomWidth: 4,
        borderLeftColor: Color.primaryColor,
        borderRightColor: Color.primaryColor,
        borderBottomColor: Color.primaryColor,
        justifyContent: 'center',
    },
    customDropDownList_2: {
        height: 100,
    },
    customDropDownIcon: {
        resizeMode: 'contain',
        height: 25,
        width: 25,
    },
    customDropDownIconTouchable: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    customDropDownlistText: {
        paddingVertical: 5,
        justifyContent: 'center',
        flex: 1,
        position: 'relative',
    },
    customDropDownSelectecText: {
        color: Color.greyFaint,
    },
    dBBottomBorder: {
        borderBottomWidth: 0.8,
        borderColor: Color.grey,
    },
    dBMonthText: {
        ...darkText,
        marginVertical: '4%',
    },
    dBViewText: {
        ...darkText,
        marginTop: 9,
    },
    dBDropDownView: {
        marginHorizontal: 20,
        marginVertical: 20,
        flexDirection: 'row',
    },
    dBDropDownFirstView: {
        width: '40%',
    },
    dBDropDownLasttView: {
        width: '60%',
    },
    cTMMainView: {
        marginHorizontal: 20,
        marginVertical: 20,
    },
    cTMMonthText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cTMLastMainView: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
    },
    cTMLastView1: {
        width: '85%',
    },
    cTMImageView: {
        width: '15%',
        alignItems: 'flex-end',
    },
    cTMImagStyle: {
        height: 20,
        width: 20,
    },
    cModalMainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    cModalButtonView: {
        backgroundColor: Color.white,
        width: '80%',
        height: 220,
        borderRadius: 20,
    },
    cModalButtonFirstView: {
        height: '100%',
    },
    cModalWidthHaff: {
        height: '50%',
    },
    cModalButtonImageStyle: {
        height: 20,
        width: 20,
        alignSelf: 'flex-end',
        margin: 10,
    },
    cModalButtonSecondView: {
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cModalButtonStyle: {
        height: 70,
        width: 170,
        backgroundColor: 'red',
        borderRadius: 35,
        justifyContent: 'center',
    },
    cModalButtonText1: {
        textAlign: 'center',
        color: Color.white,
        fontSize: 25,
    },
    cModalButtonText2: {
        textAlign: 'center',
        color: Color.white,
        paddingBottom: 7,
    },
    cModalListView: {
        backgroundColor: Color.white,
        width: '80%',
        height: 600,
        borderRadius: 20,
    },
    cModalListImageStyle: {
        height: 25,
        width: 25,
        alignSelf: 'flex-end',
        margin: 10,
    },
    cModalListText: {
        marginTop: 20,
        margin: 15,
    },
    optionsView: {
        flex: 1,
        backgroundColor: Color.simpleGrey,
    },
    // optionsCustomView: {
    //     borderWidth: 1.5,
    //     borderColor: Color.borderColor,
    //     padding: 5,
    //     paddingVertical: 10,
    //     width: '100%',
    //     backgroundColor: Color.white,
    //     marginVertical: 10,
    // },
    optionsImageStyle: {
        resizeMode: 'contain',
        height: 45,
        width: 45,
    },
    optionsbelowTextView: {
        paddingVertical: 5,
        flexDirection: 'row',
        alignSelf: 'center',
        // zIndex: (Platform.OS === "ios") ? 1 : 7100,
    },
    optionsImageView: {
        width: '25%',
        alignItems: 'center',
        paddingTop: Platform.OS == 'ios' ? 0 : '3%',
        alignSelf: Platform.OS == 'ios' ? 'center' : 'flex-start',
        paddingLeft: 10,
    },
    optionsDropDownView: {
        width: '75%',
        marginRight: 10,
        zIndex: 1,
        position: 'relative',
    },
    optionsDropDownView_1: {
        width: '75%',
        marginRight: 10,
        // zIndex: 9999
    },
    optionsDropDownView_2: {
        width: '75%',
        marginRight: 10,
        // zIndex: 9999
    },
    // optionsDropDownView_1: {
    //   width: "75%",
    //   marginRight: 10,
    //   zIndex: 6000
    // },
    // optionsCustomView_1: {
    //     paddingVertical: 30,
    //     flexDirection: 'row',
    //     paddingLeft: 15,
    // },
    optionsPriorityView: {
        width: '80%',
        // flexDirection: "row",
        // alignItems: "center",
        // margin: 15,
    },
    pr10: {
        paddingRight: 10,
    },
    optionsToggleView: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    CustomToggleView_1: {
        // borderWidth: 0.1,
        // justifyContent: "center",
        // alignItems: "flex-end",
        // marginRight: 15,
        // borderRadius: 15,
        padding: 2,
        height: 30,
        width: 55,
        borderRadius: 20,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    CustomToggleView_2: {
        alignItems: 'flex-end',
        backgroundColor: Color.skyBlue,
    },
    customToggleInsideCircle: {
        height: 25,
        width: 25,
        borderRadius: 12.5,
        backgroundColor: Color.white,
        alignItems: 'flex-start',
    },
    optionsToggleView_1: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.1,
        width: '20%',
    },
    optionsToggleStyle: {
        resizeMode: 'center',
        height: 30,
        width: 50,
    },
    optionsRestoreView: {
        paddingVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionsRestoreText: {
        fontSize: 20,
        color: 'red',
    },
    optionsCustomText: {
        padding: 5,
    },
    optionsCustomTextStyle: {
        fontSize: 22,
    },
    // optionsPriorityTextStyle: {
    //     fontSize: 20,
    // },
    optionImageSmall: {
        height: 40,
        width: 40,
    },
    dBBottomBorder: {
        borderBottomWidth: 0.8,
        borderColor: Color.grey,
    },
    dBMonthText: {
        ...darkText,
        marginVertical: '4%',
    },
    customToDoView: {
        flexDirection: 'row',
        // alignItems: 'center',
        paddingLeft: 15,
        paddingVertical: 20,
        backgroundColor: Color.white,
    },
    customToDoRadioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: Color.skyBlue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    customToDoOnSelectRadio: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderColor: '#0795FF',
        backgroundColor: '#0795FF',
    },
    greatWorkMiddleView: {
        paddingHorizontal: 15,
        paddingTop: 15,
        marginVertical: '4%',
        // height: '75%',
        // backgroundColor: 'grey'
    },
    cTMMainView: {
        marginHorizontal: 20,
        marginVertical: 20,
    },
    cTMMonthText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cTMLastMainView: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
    },
    cTMLastView1: {
        width: '85%',
    },
    cTMImageView: {
        width: '15%',
        alignItems: 'flex-end',
    },
    cTMImagStyle: {
        height: 20,
        width: 20,
    },
    commomMargin: {
        marginRight: 20,
        marginLeft: 20,
    },
    dateView: {
        flexDirection: 'row',
        marginTop: 27,
        //marginBottom:5,
        // backgroundColor: "red",
        justifyContent: 'space-between',
    },
    dateStyle: {
        fontSize: 20,
        top: -5,
    },
    dateTodayStyle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    addTaskView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    addTaskBtn: {
        backgroundColor: Color.orange,
        borderRadius: 10,
        alignItems: 'center',
        paddingTop: 17,
        paddingBottom: 17,
        paddingRight: 30,
        paddingLeft: 30,
    },
    addTaskText: {
        textAlign: 'center',
        color: Color.white,
    },
    customDelegateCheckboxView: {
        alignItems: 'flex-start',
        width: '10%',
        paddingTop: 5,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#fff',
        // borderBottomColor: "black",
        // borderBottomWidth: 1,
        justifyContent: 'center',
        // paddingVertical: 5,
        // paddingVertical: 5,
        marginBottom: 10,
        flex: 1,
        borderRadius: 10,
        right: -2.5,
    },
    rowBack: {
        // alignItems: "center",
        backgroundColor: '#F14C5F',
        borderRadius: 15,
        marginVertical: 1,
        marginBottom: 10,
        left: 2.5,
        flex: 1,
        flexDirection: 'row',
        // justifyContent: "space-between",
        // paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: '#F14C5F',
        right: 0,
        borderRadius: 10,
    },
    customDelegateCheckboxSelected: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderColor: '#0795FF',
        backgroundColor: '#0795FF',
    },
    customDelegateItemRank: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    customDelegateItemRankView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15,
    },
    checkboxButton: {
        height: 20,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    screenMiddleView: {
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    customDelegateItemScreenImage: {
        height: 25,
        width: 25,
    },
    customDelegateItemScreenImageNew: {
        height: 45,
        width: 45,
    },
    delegateProfileImageView: {
        paddingTop: 20,
        alignItems: 'center',
        width: 115,
    },
    delegateProfileImageViewInside: {
        height: 70,
        width: 70,
        borderRadius: Platform.OS === 'ios' ? 15 : 0,
        overflow: 'hidden',
        transform: [{ rotate: '45deg' }],
    },
    delegateProfileImageStyle: {
        width: 100,
        height: 100,
        marginTop: '-20.5%',
        marginLeft: '-20.5%',
        transform: [{ rotate: '-45deg' }],
        //resizeMode: "contain",
    },
    delegateTeamMemberName: {
        textAlign: 'center',
        color: Color.darkGrey,
        marginTop: 10,
        fontSize: 16,
        //alignItems:'center',
        //transform: [{ rotate: "-45deg" }, ],
    },
    customFooterView: {
        bottom: 0,
        height: 60,
        backgroundColor: Color.orange,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    customFooterText: {
        // marginTop: -3,
        color: Color.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    customFooterIcon: {
        marginLeft: 10,
        resizeMode: 'contain',
        height: 14,
        width: 10,
        marginTop: 3,
    },
    myToDoFloatingLabel: {
        height: 60,
        width: 60,
        backgroundColor: '#0795FF',
        borderRadius: 30,
        bottom: 10,
        right: 10,
        position: 'absolute',
        //marginBottom: Platform.OS == "ios" ? 100 : 70,
        marginBottom: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    myToDoFloatingLabelImage: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    customHeader: {
        height: 80,
        backgroundColor: Color.skyBlue,
        flexDirection: 'row',
        alignItems: 'center',
    },
    customHeaderIcon: {
        width: '15%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    width_75: {
        width: '75%',
    },
    loaderContainer: {
        justifyContent: 'center',
        position: 'absolute',
        opacity: 0.4,
        backgroundColor: '#000',
        width,
        height,
        zIndex: 199,
        alignItems: 'center',
        flexDirection: 'column',
    },
    letRankTheseText: {
        textAlign: 'center',
        fontSize: 12,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    letRankTheseIconView: {
        width: '20%',
        marginBottom: 10,
        alignItems: 'center',
    },
    letRankTheseIconStyle: {
        height: 40,
        width: 40,
    },

    mh10: {
        marginHorizontal: 10,
    },
    notFoundText: {
        marginHorizontal: '4%',
        color: 'grey',
        marginVertical: '2%',
    },
    SplashScreenView: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%',
        backgroundColor: '#fff',
    },
    SplashScreenImage: {
        marginBottom: 20,
        height: 200,
        width: 200,
    },
    errorMessageNotFound: {
        justifyContent: 'center',
        flex: 1,
    },
    errorMessageNotFoundText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
    },
    errorMessageNotFoundNew: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorMessageNotFoundTextNew: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black',
    },
    memberTextError: {
        borderBottomWidth: 0.5,
        borderColor: Color.greyFaint,
    },
    memberTextErrorText: {
        ...boldText,
        textAlign: 'center',
        margin: '5%',
    },
    modalTeamError: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: '30%',
    },
    modalNameText: {
        textAlign: 'center',
        marginTop: 8,
    },
    modalImageStyle: {
        height: 60,
        width: 60,
        alignSelf: 'center',
        borderRadius: 50,
    },
    modalView: {
        width: '50%',
        marginVertical: 8,
        flex: 1,
        alignItems: 'center',
    },
    borderTopStyle: {
        borderTopWidth: 0.5,
        borderColor: '#ccc',
    },
    borderBittomStyle: {
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
        // paddingBottom: 4,
    },
    dashBTaskMainView: {
        flexDirection: 'row',
        width: '100%',
    },
    dashBImagestyle: {
        height: 20,
        width: 20,
    },
    dashBFirstView: {
        width: '15%',
    },
    dashBSecondView: {
        width: '82%',
    },
    listingView: {
        flex: 1,
        width: '50%',
        alignItems: 'center',
    },
    listingButtonView: {
        // alignSelf: 'baseline',
        // width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        margin: 20,
        borderWidth: 0.5,
        borderColor: '#ffff',
        borderRadius: 10,
        backgroundColor: '#ffff',
        elevation: 10,
        // zIndex: 999,
        // opacity: 10,
        // flexDirection: 'row',
    },
    listingButtonViewNew: {
        // alignSelf: 'baseline',
        // width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        margin: 20,
        borderWidth: 0.5,
        borderColor: '#ffff',
        borderRadius: 10,
        backgroundColor: '#ffff',
        // elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 5,
        shadowOpacity: 0.3,
        // zIndex: 999,
        // opacity: 10,
        // flexDirection: 'row',
    },
    listingButtonText: {
        paddingVertical: 10,
        fontWeight: 'bold',
        // marginLeft: 5
        textAlign: 'center',
    },
    listingButtonIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
    },
    myTaskListTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    myTaskListIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    errorMsgDelay: {
        color: 'red',
        marginLeft: 20,
        marginBottom: 5,
    },
    settingsBigIcon: {
        resizeMode: 'contain',
        height: 25,
        // width: '25%',
    },
    settingsSmallIcon: {
        height: 35,
        width: 35,
    },
    yourTeamMember: {
        ...row,
        height: 100,
        borderBottomWidth: 1.5,
        borderBottomColor: Color.borderColor,
        paddingLeft: 15,
        alignItems: 'center',
    },
    yourTeamMemberIcon: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TeamMemberTitle: {
        fontSize: 20,
        paddingLeft: '5%',
    },
    customTeamMember: {
        ...row,
        padding: 15,
        height: 90,
        borderBottomWidth: 1.5,
        borderBottomColor: Color.borderColor,
    },
    TeamMemberProfile: {
        width: '25%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    customTeamMemberMiddle: {
        justifyContent: 'center',
        width: '60%',
    },
    addNewTeamMember: {
        width: '85%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inviteByPhoneImageView: {
        marginTop: '15%',
        alignItems: 'center',
    },
    inviteByPhoneButtonTopMargin: {
        marginTop: '15%',
        alignSelf: 'center',
    },
    inviteByPhoneImageViewIcon: {
        height: 100,
        width: 100,
    },
    addNumberView: {
        marginTop: '15%',
    },
    addNumberText: {
        ...darkText,
    },
    inviteByPhoneTextInputView: {
        marginTop: '10%',
    },
    yTMainView: {
        borderBottomWidth: 1,
        borderColor: Color.greyFaint,
    },
    yTTextView: {
        margin: '5%',
    },
    yTPaddingBtm: {
        paddingBottom: 20,
    },
    yTBorder: {
        borderBottomWidth: 1,
        borderColor: Color.greyFaint,
    },
    uINameMainView: {
        borderBottomWidth: 1,
        borderColor: Color.grey,
    },
    uINameView: {
        flexDirection: 'row',
        margin: '5%',
    },
    uIUserTextName: {
        fontSize: 20,
    },
    uIUserTextEmail: {
        color: Color.greyFaint,
    },
    uIBorder: {
        borderBottomWidth: 1,
        borderColor: Color.grey,
    },
    uIRemoveMargin: {
        flexDirection: 'row',
        marginHorizontal: '5%',
        marginVertical: 40,
    },
    uIAlignCenter: {
        alignSelf: 'center',
    },
    uIRemoveText: {
        fontSize: 20,
        color: 'red',
    },
    uIProjectMainView: {
        flexDirection: 'row',
        margin: '5%',
    },
    uIProjectView: {
        alignSelf: 'center',
        width: '40%',
        alignSelf: 'center',
    },
    uIProjectText: {
        fontSize: 25,
    },
    uIProjectViewLast: {
        width: '60%',
    },
    uIMarginL20: {
        marginLeft: 20,
    },
    customDropDownView: {
        width: '100%',
        borderWidth: 4,
        borderColor: Color.primaryColor,
        flexDirection: 'row',
    },
    customDropDownListView: {
        width: '80%',
        borderRightWidth: 4,
        borderRightColor: Color.primaryColor,
        paddingVertical: '7%',
        paddingHorizontal: 10,
    },
    customDropDownIcon: {
        resizeMode: 'contain',
        height: 25,
        width: 25,
    },
    customDropDownIconTouchable: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    customDropDownlistText: {
        paddingVertical: 5,
        justifyContent: 'center',
    },
    customDropDownSelectecText: {
        color: Color.greyFaint,
    },
    dBBottomBorder: {
        borderBottomWidth: 0.8,
        borderColor: Color.grey,
    },
    dBMonthText: {
        ...darkText,
        marginVertical: '4%',
    },
    dBViewText: {
        ...darkText,
        marginTop: 9,
    },
    dBDropDownView: {
        marginHorizontal: 20,
        marginVertical: 20,
        flexDirection: 'row',
    },
    dBDropDownFirstView: {
        width: '40%',
    },
    dBDropDownLasttView: {
        width: '60%',
    },
    cTMMainView: {
        marginHorizontal: 20,
        marginVertical: 20,
    },
    cTMMonthText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cTMLastMainView: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
    },
    cTMLastView1: {
        width: '85%',
    },
    cTMImageView: {
        width: '15%',
        alignItems: 'flex-end',
    },
    cTMImagStyle: {
        height: 20,
        width: 20,
    },
    cModalMainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    cModalButtonView: {
        backgroundColor: Color.white,
        width: '80%',
        height: 220,
        borderRadius: 20,
    },
    cModalButtonFirstView: {
        height: '100%',
    },
    cModalWidthHaff: {
        height: '50%',
    },
    cModalButtonImageStyle: {
        height: 20,
        width: 20,
        alignSelf: 'flex-end',
        margin: 10,
    },
    cModalButtonSecondView: {
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cModalButtonStyle: {
        height: 70,
        width: 170,
        backgroundColor: 'red',
        borderRadius: 35,
        justifyContent: 'center',
    },
    cModalButtonText1: {
        textAlign: 'center',
        color: Color.white,
        fontSize: 25,
    },
    cModalButtonText2: {
        textAlign: 'center',
        color: Color.white,
        paddingBottom: 7,
    },
    cModalListView: {
        backgroundColor: Color.white,
        width: '80%',
        height: 400,
        borderRadius: 20,
    },
    cModalListImageStyle: {
        height: 25,
        width: 25,
        alignSelf: 'flex-end',
        margin: 10,
    },
    cModalListText: {
        marginTop: 20,
        margin: 15,
    },
    optionsView: {
        flex: 1,
        backgroundColor: Color.simpleGrey,
    },
    optionsCustomView: {
        borderWidth: 1.5,
        borderColor: Color.borderColor,
        padding: 5,
        paddingVertical: 10,
        width: '100%',
        backgroundColor: Color.white,
        marginVertical: 10,
    },
    optionsImageStyle: {
        resizeMode: 'contain',
        height: 45,
        width: 45,
    },
    optionsbelowTextView: {
        paddingVertical: 5,
        flexDirection: 'row',
        alignSelf: 'center',
        // zIndex: (Platform.OS === "ios") ? 1 : 7100,
    },
    optionsImageView: {
        width: '25%',
        alignItems: 'center',
        alignSelf: 'center',
        paddingLeft: 10,
    },
    optionsDropDownView: {
        width: '75%',
        marginRight: 10,
    },
    // optionsDropDownView_1: {
    //   width: "75%",
    //   marginRight: 10,
    //   zIndex: 6000
    // },
    optionsCustomView_1: {
        paddingVertical: 30,
        flexDirection: 'row',
        paddingLeft: 15,
    },
    optionsPriorityView: {
        width: '65%',
        // flexDirection: "row",
        // alignItems: "center",
        // margin: 15,
    },
    pr10: {
        paddingRight: 10,
    },
    optionsToggleView: {
        width: '35%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        alignSelf: 'flex-start',
    },
    CustomToggleView_1: {
        // borderWidth: 0.1,
        // justifyContent: "center",
        // alignItems: "flex-end",
        // marginRight: 15,
        // borderRadius: 15,
        padding: 2,
        height: 30,
        width: 55,
        borderRadius: 20,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    CustomToggleView_2: {
        alignItems: 'flex-end',
        backgroundColor: Color.primaryColor,
    },
    customToggleInsideCircle: {
        height: 25,
        width: 25,
        borderRadius: 12.5,
        backgroundColor: Color.white,
        alignItems: 'flex-start',
    },
    optionsToggleView_1: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.1,
        width: '20%',
    },
    optionsToggleStyle: {
        resizeMode: 'center',
        height: 30,
        width: 50,
    },
    optionsRestoreView: {
        paddingVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionsRestoreText: {
        fontSize: 20,
        color: 'red',
    },
    optionsCustomText: {
        padding: 5,
    },
    optionsCustomTextStyle: {
        fontSize: 22,
    },
    optionsPriorityTextStyle: {
        fontSize: 14,
    },
    dBBottomBorder: {
        borderBottomWidth: 0.8,
        borderColor: Color.grey,
    },
    dBMonthText: {
        ...darkText,
        marginVertical: '4%',
    },
    customToDoView: {
        flexDirection: 'row',
        // alignItems: 'center',
        marginTop: 20,
        paddingLeft: 15,
        paddingVertical: 20,
        backgroundColor: Color.white,
    },
    customToDoRadioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,

        borderWidth: 0.5,
        borderColor: Color.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    customToDoOnSelectRadio: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderColor: '#0795FF',
        backgroundColor: '#0795FF',
    },
    greatWorkMiddleView: {
        // height: '75%',
        paddingHorizontal: 15,
        paddingTop: 15,
        // backgroundColor: 'grey'
        marginVertical: '4%',
    },
    cTMMainView: {
        marginHorizontal: 20,
        marginVertical: 20,
    },
    cTMMonthText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cTMLastMainView: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
    },
    cTMLastView1: {
        width: '85%',
    },
    cTMImageView: {
        width: '15%',
        alignItems: 'flex-end',
    },
    cTMImagStyle: {
        height: 20,
        width: 20,
    },
    commomMargin: {
        marginRight: 20,
        marginLeft: 20,
    },
    dateView: {
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    dateStyle: {
        fontSize: 20,
    },
    dateTodayStyle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    addTaskView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    addTaskBtn: {
        backgroundColor: Color.orange,
        borderRadius: 10,
        alignItems: 'center',
        paddingTop: 17,
        paddingBottom: 17,
        paddingRight: 30,
        paddingLeft: 30,
    },
    addTaskText: {
        textAlign: 'center',
        color: Color.white,
    },
    customDelegateCheckboxView: {
        alignItems: 'flex-start',
        width: '10%',
        paddingTop: 5,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: 'black',
        // borderBottomWidth: 1,
        justifyContent: 'center',
        flex: 1,
    },
    rowBack: {
        alignItems: 'center',
        // backgroundColor: "#F14C5F",
        backgroundColor: '#F14C5F',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: '#F14C5F',
        right: 0,
    },
    customDelegateCheckboxSelected: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderColor: '#0795FF',
        backgroundColor: '#0795FF',
    },
    customDelegateItemRank: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    customDelegateItemRankView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 20,
    },
    screenMiddleView: {
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    customDelegateItemScreenImage: {
        height: 25,
        width: 25,
    },
    delegateProfileImageView: {
        paddingTop: 20,
        alignItems: 'center',
        width: 115,
        //transform: [{ rotate: "45deg" }, ],
    },
    delegateProfileImageStyle: {
        width: 100,
        height: 100,
        marginTop: '-20.5%',
        marginLeft: '-20.5%',
        transform: [{ rotate: '-45deg' }],
        //resizeMode: "contain",
    },
    customHeaderIconStyleNew: {
        height: 20,
        width: 25,
    },
    customHeaderTitle: {
        fontSize: 27,
        fontWeight: 'bold',
        color: '#FFFF',
    },
    delegateNoRecordFoundView: {
        flex: 1,
        justifyContent: 'center',
        marginTop: '10%',
    },
    deleteIconView: {
        height: 15,
        width: 15,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    mb_5per: {
        marginBottom: '5%',
    },
    mh_10: {
        marginHorizontal: 10,
    },
    mt_20per: {
        marginTop: '20%',
    },
    mt_15per: {
        marginTop: '15%',
    },
    zIndex_4: {
        zIndex: 4,
    },
    zIndex_3: {
        zIndex: 3,
    },
    zIndex_2: {
        zIndex: 2,
    },
    zIndex_1: {
        zIndex: 1,
    },
    optionsPriorityImageStyle: {
        height: 20,
        width: 20,
    },
    orderDoTitleView: {
        marginTop: 15,
        marginHorizontal: 20,
    },
    pv_3: {
        paddingVertical: 3,
    },
    alignSelfCenter: {
        alignSelf: 'center',
    },
    underlinedText: {
        textDecorationLine: 'underline',
    },
    textColorGrey: {
        color: 'grey',
    },
    textColorBlack: {
        color: 'black',
    },
    networkModalShade: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'relative',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    containerHeight: {
        height: '100%',
    },
    modalContainerSide: {
        padding: 20,
        width: '90%',
        backgroundColor: 'white',
        alignSelf: 'center',
        top: '40%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
    },
    networkForConnectionText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'red',
    },
    marginAbove: {
        marginTop: '5%',
    },
    alignText: {
        textAlign: 'center',
    },
    optionsPriorityView_2: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        // flexWrap: 'wrap',
        // justifyContent: 'flex-end',
    },
    optionsSwitchText: {
        marginTop: 10,
        lineHeight: 16,
    },
    pl_15: {
        paddingLeft: 15,
    },
    aboutContainer: {
        flex: 1,
    },
    aboutContainer_1: {
        padding: 15,
        paddingTop: 0,
    },
    flexRowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionsToggleSeperator: {
        textAlignVertical: 'top',
        marginTop: '2%',
    },
    mt_1_per: {
        marginTop: '1%',
    },
    mr_5: {
        marginRight: 5,
    },
    signUp:{
        justifyContent:'center',
        alignItems:'center'
    },
    signUpTxt:{
       fontSize: 12,
       color:'#000',
       marginVertical:10

    }
});
export default styles;
