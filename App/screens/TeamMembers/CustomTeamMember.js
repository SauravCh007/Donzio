import React from "react";
import {
  Image, Text, TouchableOpacity, View
} from "react-native";
import defaultText from "../../helper/defaultText";
import globalImages from "../../helper/globalImages";
import globalStyles from "../../helper/globalStyles";

const CustomTeamMember = (props) => {
  const { image, onPress, imageSource, memberFirstName, memberLastName } =
    props;

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={globalStyles.customTeamMember}>
          {image ? (
            <>
              <View style={globalStyles.TeamMemberProfile}>
                <Image
                  source={imageSource}
                  style={globalStyles.TeamMemberProfileStyle}
                />
              </View>

              <View style={globalStyles.customTeamMemberMiddle}>
                <Text style={globalStyles.TeamMemberTitle} numberOfLines={1}>
                  {memberFirstName} {memberLastName}
                </Text>
              </View>
            </>
          ) : (
            <>
              <View style={globalStyles.addNewTeamMember}>
                <Text style={globalStyles.TeamMemberTitle}>
                  {defaultText.addNewTeamMember}
                </Text>
              </View>
            </>
          )}

          <View style={globalStyles.settingArrowRight}>
            <Image
              source={globalImages.arrowRight}
              style={globalStyles.settingArrowRightStyle}
            />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default CustomTeamMember;
