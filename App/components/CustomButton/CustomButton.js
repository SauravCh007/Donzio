import React from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../helper/globalStyles";

const CustomButton = (props) => {
  const { onPress, buttonName } = props;

  return (
    <View>
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <Animated.View style={globalStyles.customButtonView}>
          <Text style={globalStyles.customButtonText}>{buttonName}</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
