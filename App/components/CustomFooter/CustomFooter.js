import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import globalImages from "../../helper/globalImages";
import globalStyles from "../../helper/globalStyles";

const CustomFooter = (props) => {
  const { title, onPress } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={globalStyles.customFooterView}
    >
      <Text style={globalStyles.customFooterText}>{title}</Text>
      <Image
        source={globalImages.arrowBack}
        style={globalStyles.customFooterIcon}
      />
    </TouchableOpacity>
  );
};

export default CustomFooter;
