import React from "react";
import { Image, Text, View } from "react-native";
import globalImages from "../../helper/globalImages";
import globalStyles from "../../helper/globalStyles";

const CustomTaskMonth = (props) => {
  const { month, task } = props;
  return (
    <View style={globalStyles.cTMMainView}>
      <Text style={globalStyles.cTMMonthText}>{month}</Text>
      <View style={globalStyles.cTMLastMainView}>
        <View style={globalStyles.cTMLastView1}>
          <Text numberOfLines={1}>{task}</Text>
        </View>
        <View style={globalStyles.cTMImageView}>
          <Image
            style={globalStyles.cTMImagStyle}
            source={globalImages.arrowRight}
          />
        </View>
      </View>
    </View>
  );
};

export default CustomTaskMonth;
