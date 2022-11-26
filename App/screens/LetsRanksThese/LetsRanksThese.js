import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Fragment, useEffect } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomFooter from "../../components/CustomFooter/CustomFooter";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import defaultText from "../../helper/defaultText";
import globalImages from "../../helper/globalImages";
import globalStyles from "../../helper/globalStyles";
import Responce from "../../helper/sampleData";

const numColumns = 5;
const heartSign = Responce.heartSignYourTask;
const dollarSign = Responce.dollarSignYourTask;
console.log("dollarSign",dollarSign)
console.log("heartSign",heartSign)

// useEffect(()=>{
//   const heartSign = Responce.heartSignYourTask;
// const dollarSign = Responce.dollarSignYourTask;
// console.log("dollarSign",dollarSign)
// console.log("heartSign",heartSign)
// },[])

const LetsRanksThese = (props) => {
  const renderItem = ({ item, index }) => {
    return (
      <View style={globalStyles.letRankTheseIconView}>
        <Image
          source={item.source}
          style={globalStyles.letRankTheseIconStyle}
        />
        <Text style={[globalStyles.mt5,{color:'#00000070'}]}>{index + 1}</Text>
      </View>
    );
  };

  const renderItem_1 = ({ item, index }) => {
    return (
      <View style={globalStyles.letRankTheseIconView}>
        <Image
          source={item.source}
          style={globalStyles.letRankTheseIconStyle}
        />
        <Text style={globalStyles.mt5}>{index + 1}</Text>
      </View>
    );
  };

  const onCallBottom = async () => {
    await AsyncStorage.setItem("intro", JSON.stringify(true));
    props.navigation.replace("RankTheseScreen");
  };

  return (
    <Fragment>
      <SafeAreaView style={globalStyles.fragmentStyle_1} />
      <SafeAreaView style={globalStyles.fragmentStyle_2}>
        <View style={globalStyles.topMainContainer}>
          <View style={globalStyles.zIndex1}>
            <CustomHeader
              headerTitle={defaultText.letsRankThese}
              onPressDrawer={() => props.navigation.openDrawer()}
              showDrawerIcon={true}
            />
          </View>
          <View style={globalStyles.accImageView}>
            <Image
              style={globalStyles.accScreenImageStyle}
              //source={globalImages.robotDog}
              source={globalImages.clock}
            />
          </View>
          <KeyboardAwareScrollView
            style={globalStyles.marginMinus100}
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
          >
            <ScrollView style={globalStyles.ph10}>
              <Text
                style={[
                  globalStyles.rScreenText,
                  globalStyles.textAlignCenter,
                  globalStyles.mt25,
                  globalStyles.defaultText
                ]}
              >
                {defaultText.letsRankTheseDemo_1}
              </Text>
              <Text
                style={[
                  globalStyles.rScreenText,
                  globalStyles.textAlignCenter,
                  globalStyles.mt5,
                  globalStyles.defaultText
                ]}
              >
                {defaultText.letsRankTheseDemo_2}
              </Text>
              <Text
                style={[
                  globalStyles.rScreenText,
                  globalStyles.textAlignCenter,
                  globalStyles.mt5,
                  globalStyles.defaultText
                ]}
              >
                {defaultText.letsRankTheseDemo_3}
              </Text>

              <View style={globalStyles.mt25}>
                <FlatList
                  data={dollarSign}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.source}
                  numColumns={numColumns}
                />
              </View>

              <Text style={globalStyles.letRankTheseText}>
                {defaultText.dollarTopTextDemo}
              </Text>
              <Text style={globalStyles.letRankTheseText}>
                {defaultText.dollarMiddleTextDemo}
              </Text>
              <Text style={[globalStyles.letRankTheseText, globalStyles.mb20]}>
                {defaultText.dollarBottomTextDemo}
              </Text>

              <View style={globalStyles.mt20}>
                <FlatList
                  data={heartSign}
                  renderItem={renderItem_1}
                  keyExtractor={(item) => item.source}
                  numColumns={numColumns}
                />
                <Text style={globalStyles.letRankTheseText}>
                  {defaultText.heartTopTextDemo}
                </Text>
                <View style={globalStyles.alignItemsCenter}>
                  <Text style={globalStyles.letRankTheseText}>
                    {defaultText.heartMiddleTextDemo}
                  </Text>
                </View>
                <Text style={globalStyles.letRankTheseText}>
                  {defaultText.heartBottomTextDemo}
                </Text>
              </View>
            </ScrollView>
          </KeyboardAwareScrollView>
          <View style={globalStyles.bottomTab}>
            <CustomFooter
              title={defaultText.thatsMakeSense}
              onPress={() => onCallBottom()}
            />
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default LetsRanksThese;
