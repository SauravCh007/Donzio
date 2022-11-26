import React, { useState } from "react";
import {
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  Pressable,
  Platform,
} from "react-native";
import globalStyles from "../../helper/globalStyles";
import globalImages from "../../helper/globalImages";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

const CustomDropDownForRole = (props) => {
  const {
    data,
    selectedItem,
    setSelectedItem,
    onSelectValue,
    // selectDropDown,
    // setSelectDropDown
  } = props;
  const [selectDropDown, setSelectDropDown] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setSelectDropDown(!selectDropDown)}
        activeOpacity={0.8}
        style={{ Opacity: 1 }}
      >
        <View style={globalStyles.customDropDownView}>
          <View style={globalStyles.customDropDownListView}>
            <Text
              numberOfLines={2}
              style={{
                color: selectedItem == "Select Item" ? "#696969" : "#000000",
              }}
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
            data.length <= 3
              ? [globalStyles.customDropDownList_1]
              : [
                  globalStyles.customDropDownList_1,
                  globalStyles.customDropDownList_2,
                ],
          ]}
        >
          <ScrollView>
            {data &&
              data?.map((i) =>
                Platform.OS == "ios" ? (
                  <TouchableNativeFeedback
                    style={globalStyles.customDropDownlistText}
                    onPress={() => {
                      setSelectedItem(i.value, i.id);
                      setSelectDropDown(!selectDropDown);
                    }}
                  >
                    <Text
                      numberOfLines={2}
                      style={globalStyles.paddingVertical_5}
                    >
                      {i.value}
                    </Text>
                  </TouchableNativeFeedback>
                ) : (
                  <TouchableOpacity
                    style={globalStyles.customDropDownlistText}
                    onPress={() => {
                      setSelectedItem(i.value, i.id);
                      setSelectDropDown(!selectDropDown);
                    }}
                  >
                    <View style={globalStyles.customDropDownlistText}>
                      <Text style={globalStyles.defaultText} numberOfLines={2}>{i.value}</Text>
                    </View>
                  </TouchableOpacity>
                )
              )}
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default CustomDropDownForRole;
