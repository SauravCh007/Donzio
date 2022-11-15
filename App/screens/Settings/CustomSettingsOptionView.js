import React from "react";
import { Image, Text, View } from "react-native";
import globalImages from "../../helper/globalImages";
import globalStyles from "../../helper/globalStyles";

const CustomSettingsOptionView = (props) => {
  const { optionsTitle, imageSource1, imageSource2, style, single } = props;

  return (
    <View style={globalStyles.settingsOptionsView}>
      <View style={globalStyles.settingOptionsLeft}>
        <View style={globalStyles.p1}>
          <Image
            source={imageSource1}
            style={
              single
                ? globalStyles.settingsBigIcon
                : globalStyles.settingsSmallIcon
            }
          />
        </View>

        <View style={globalStyles.p1}>
          <Image
            source={imageSource2}
            style={
              single
                ? globalStyles.settingsBigIcon
                : globalStyles.settingsSmallIcon
            }
          />
        </View>
      </View>

      <View style={globalStyles.settingOptionsMiddle}>
        <Text style={globalStyles.settingOptionTitle}>{optionsTitle}</Text>
      </View>

      <View style={globalStyles.settingArrowRight}>
        <Image
          source={globalImages.arrowRight}
          style={globalStyles.settingArrowRightStyle}
        />
      </View>
    </View>
  );
};

export default CustomSettingsOptionView;
