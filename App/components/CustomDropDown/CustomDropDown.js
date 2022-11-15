import React, { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import globalImages from "../../helper/globalImages";
import globalStyles from "../../helper/globalStyles";

const CustomDropDown = (props) => {
  const {
    data,
    selectedItem,
    setSelectedItem,
    onSelectValue,
    selectDropDown,
    setSelectDropDown,
  } = props;
  // const [selectDropDown, setSelectDropDown] = useState(false);

  return (
    <>
      <Pressable onPress={() => setSelectDropDown()} activeOpacity={0.8}>
        <View style={globalStyles.customDropDownView}>
          <View style={globalStyles.customDropDownListView}>
            <Text
              numberOfLines={2}
              style={
                selectedItem == "Select Item"
                  ? globalStyles.textColorGrey
                  : globalStyles.textColorBlack
              }
              onPress={onSelectValue}
            >
              {selectedItem}
            </Text>
          </View>
          <View style={globalStyles.customDropDownIconTouchable}>
            <Image
              source={
                selectDropDown
                  ? globalImages.upDropDown
                  : globalImages.downDropDown
              }
              style={globalStyles.customDropDownIcon}
            />
          </View>
        </View>
      </Pressable>
      {selectDropDown && (
        <View
          style={[
            data.length < 3
              ? globalStyles.customDropDownList_1
              : [
                  globalStyles.customDropDownList_1,
                  globalStyles.customDropDownList_2,
                ],
          ]}
        >
          <ScrollView>
            {data &&
              data.map((i, j) =>
                Platform.OS == "ios" ? (
                  <View key={j}>
                    <TouchableNativeFeedback
                      style={globalStyles.customDropDownlistText}
                      onPress={() => {
                        setSelectedItem(i.value, i.id);
                        setSelectDropDown();
                      }}
                    >
                      <Text numberOfLines={2} style={globalStyles.pv_3}>
                        {i.value}
                      </Text>
                    </TouchableNativeFeedback>
                  </View>
                ) : (
                  <View key={j}>
                    <TouchableOpacity
                      style={globalStyles.customDropDownlistText}
                      onPress={() => {
                        setSelectedItem(i.value, i.id);
                        setSelectDropDown();
                      }}
                    >
                      <Text
                        numberOfLines={2}
                        style={globalStyles.paddingVertical_5}
                      >
                        {i.value}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
              )}
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default CustomDropDown;
