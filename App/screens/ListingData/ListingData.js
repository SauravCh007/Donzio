import React, { Fragment } from "react";
import { FlatList, Image, Platform, Pressable, SafeAreaView, Text, View } from "react-native";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import globalImages from "../../helper/globalImages";
import globalStyles from "../../helper/globalStyles";

const DATA = [
  { title: "DO", screen: "YourTaskScreen" },
  { title: "DELEGATE", screen: "DelegateAssignScreen" },
  { title: "DELETE", screen: "DeleteScreen" },
  { title: "DELAY", screen: "DelaySceen" },
  { title: "PARKING LOT", screen: "ParkingLot" },
];

const ListingData = (props) => {
  const renderItem = ({ item, index }) => {
    return (
      <View style={globalStyles.listingView}>
        <Pressable
          activeOpacity={0.6}
          onPress={() => props.navigation.navigate(item.screen)}
        >
          <View
            style={
              Platform.OS == "android"
                ? item.title.length < 15
                  ? [globalStyles.listingButtonView, { width: 150 }]
                  : globalStyles.listingButtonView
                : item.title.length < 15
                  ? [globalStyles.listingButtonViewNew, { width: 150 }]
                  : globalStyles.listingButtonViewNew
            }
          >
            <Image
              style={globalStyles.listingButtonIcon}
              source={
                item.title == "DO"
                  ? globalImages.toDo
                  : item.title == "DELEGATE"
                    ? globalImages.checkRank
                    : item.title == "DELETE"
                      ? globalImages.delete
                      : item.title == "DELAY"
                        ? globalImages.checkRank
                        : item.title == "PARKING LOT"
                          ? globalImages.parkingLot
                          : globalImages.remove
              }
            />
            <Text style={globalStyles.listingButtonText}>{item.title}</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <Fragment>
      <SafeAreaView style={globalStyles.fragmentStyle_1} />
      <SafeAreaView style={[globalStyles.topMainContainer, globalStyles.backgroundColorFaintGrey]}>
        <CustomHeader
          headerTitle={"All Tasks"}
          onPressDrawer={() => props.navigation.openDrawer()}
          showDrawerIcon={true}
        />
        <View style={globalStyles.mt_15per}>
          <FlatList
            scrollEnabled={Platform.OS == 'ios' && "false"}
            numColumns={2}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id}
          />
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default ListingData;
