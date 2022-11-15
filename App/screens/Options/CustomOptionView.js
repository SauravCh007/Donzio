import React from "react";
import { Image, Text, View } from "react-native";
import globalStyles from "../../helper/globalStyles";

const CustomOptionView = (props) => {
  const {
    title,
    ImageSource1,
    ImageSource2,
    DropDownPropHeartFive,
    DropDownDollarFive,
  } = props;

  return (
    <View style={globalStyles.optionsCustomView}>
      <View style={globalStyles.optionsCustomText}>
        <Text style={globalStyles.optionsCustomTextStyle}>{title}</Text>
      </View>

      <View style={[globalStyles.optionsbelowTextView, globalStyles.zIndex_1]}>
        <View style={globalStyles.optionsImageView}>
          <Image
            source={ImageSource1}
            style={globalStyles.optionsImageStyle}
          />
        </View>
        <View style={globalStyles.optionsDropDownView}>
          {DropDownPropHeartFive}
        </View>
      </View>

      <View style={globalStyles.optionsbelowTextView}>
        <View style={globalStyles.optionsImageView}>
          <Image
            source={ImageSource2}
            style={globalStyles.optionsImageStyle}
          />
        </View>
        <View style={globalStyles.optionsDropDownView}>
          {DropDownDollarFive}
        </View>
      </View>
    </View>
  );
};

export default CustomOptionView;
