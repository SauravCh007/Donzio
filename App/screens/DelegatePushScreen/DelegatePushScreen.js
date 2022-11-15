import React, { Fragment } from "react";
import {
  Image, SafeAreaView,
  ScrollView, Text, View
} from "react-native";
import CustomFooter from "../../components/CustomFooter/CustomFooter";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import CustomWorkScreen from "../../components/CustomWorkScreen/CustomWorkScreen";
import defaultText from "../../helper/defaultText";
import globalStyles from "../../helper/globalStyles";
import Responce from "../../helper/sampleData";

const DelegatePushScreen = (props) => {
  let nameData = Responce.nameData;
  let yourItem = Responce.delegatedItems;

  return (
    <Fragment>
      <SafeAreaView style={globalStyles.fragmentStyle_1} />
      <SafeAreaView style={globalStyles.fragmentStyle_2}>
        <View style={globalStyles.topMainContainer}>
          <View>
            <CustomHeader
              headerTitle={defaultText.delegate}
              onPressDrawer={() => props.navigation.openDrawer()}
              showDrawerIcon={true}
            />
          </View>
          <ScrollView style={globalStyles.scroll}>
            <View style={globalStyles.dPushView}>
              <View style={globalStyles.dPushMainView}>
                <Text style={globalStyles.dPushTextDark}>
                  {defaultText.pushDelegateItemToTeam}
                </Text>
              </View>
            </View>
            <View style={globalStyles.dPushView}>
              <View style={globalStyles.dPushMainView}>
                <Text style={globalStyles.dPushTextDark}>
                  {defaultText.teamMembers}
                </Text>

                <View style={globalStyles.dPushMemberView}>
                  <ScrollView horizontal={true}>
                    {nameData &&
                      nameData.map((item, index) => (
                        <View style={globalStyles.dPushMemberList} key={index}>
                          <Image
                            style={globalStyles.dPushMemberImgStyle}
                            source={item.source}
                          />
                          <Text style={globalStyles.textAlignCenter}>
                            {item.name}
                          </Text>
                        </View>
                      ))}
                  </ScrollView>
                </View>
              </View>
            </View>
            <View style={globalStyles.dPushItemView}>
              <Text style={globalStyles.dPushTextDark}>
                {defaultText.yourItems}
              </Text>
              {yourItem &&
                yourItem.map((item, index) => (
                  <View style={globalStyles.dPushView} key={index}>
                    <View style={globalStyles.dPushItemMainView}>
                      <CustomWorkScreen
                        no={item.id}
                        word={item.word}
                        dollar={item.dollar}
                        heart={item.heart}
                        Img={true}
                        arrowCheck={true}
                      />
                    </View>
                  </View>
                ))}
            </View>
          </ScrollView>
          <View style={globalStyles.bottomTab}>
            <CustomFooter
              title={defaultText.complete}
              onPress={() => onCallBottom()}
            />
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default DelegatePushScreen;
