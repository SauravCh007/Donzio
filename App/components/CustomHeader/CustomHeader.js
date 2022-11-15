import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import globalImages from "../../helper/globalImages";
import globalStyles from "../../helper/globalStyles";
const CustomHeader = (props) => {
  const {
    headerTitle,
    title,
    additional,
    name,
    plusIcon,
    onPressPlus,
    onPressBack,
    optionHeader,
    showDrawerIcon,
    onPressBackOption,
    delgItem,
  } = props;

  const onCallDrawerBottom = () => {
    props.navigation.navigate("Options");
  };

  return (
    <SafeAreaView>
      {additional ? (
        <View style={globalStyles.customHeaderView}>
          <View style={globalStyles.customHeaderViewNew}>
            <View style={globalStyles.customHeaderRow}>
              <View style={globalStyles.customHeaderIconView}>
                <TouchableOpacity onPress={onPressBack}>
                  <Image
                    style={globalStyles.customHeaderIconStyle}
                    source={globalImages.leftArrow}
                  />
                </TouchableOpacity>
              </View>
              <View style={globalStyles.customHeaderMiddleView}>
                <Text
                  style={
                    delgItem
                      ? globalStyles.customHeaderMiddleTextNewforDelg
                      : globalStyles.customHeaderMiddleTextNew
                  }
                >
                  {name}
                </Text>
              </View>
              <View style={globalStyles.customHeaderIconView}>
                {plusIcon && (
                  <TouchableOpacity onPress={onPressPlus}>
                    <Image
                      style={globalStyles.customHeaderIconStyle}
                      source={globalImages.add}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      ) : optionHeader ? (
        <View style={globalStyles.customHeaderView}>
          <View style={globalStyles.customHeaderViewLastNew}>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <View style={{ width: "15%" }}>
                <TouchableOpacity onPress={onPressBackOption}>
                  <Image
                    style={globalStyles.customHeaderIconStyleBackNew}
                    source={globalImages.leftArrow}
                  />
                </TouchableOpacity>
              </View>
              <View style={globalStyles.customHeaderOpview}>
                <View style={globalStyles.customHeaderOpFirstView}>
                  <Image
                    style={globalStyles.customHeaderOpImageStyle}
                    //source={globalImages.heartFive}
                    source={globalImages.blueHeartNew}
                  />
                </View>
                <View style={globalStyles.customHeaderOpMiddleview}>
                  <Text style={globalStyles.customHeaderMiddleText}>
                    {title}
                  </Text>
                </View>
                <View style={globalStyles.customHeaderOpFirstView}>
                  <Image
                    style={globalStyles.customHeaderOpImageStyle}
                    //source={globalImages.dollarFive}
                    source={globalImages.blueDollarNew}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={globalStyles.customHeader}>
          {showDrawerIcon && (
            <TouchableOpacity
              onPress={() => {
                props.onPressDrawer();
              }}
              style={globalStyles.customHeaderIcon}
            >
              <Image
                source={globalImages.headerIcon}
                style={globalStyles.customHeaderIconStyleNew}
              />
            </TouchableOpacity>
          )}

          <View
            style={[
              globalStyles.width_75,
              !showDrawerIcon ? globalStyles.ml_15per : {},
            ]}
          >
            <Text style={globalStyles.customHeaderTitle}>{headerTitle}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CustomHeader;
