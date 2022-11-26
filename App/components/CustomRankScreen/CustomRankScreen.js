import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import globalImages from "../../helper/globalImages";
import globalStyles from "../../helper/globalStyles";
import Responce from "../../helper/sampleData";

const CustomRankScreen = (props) => {
  const { words, onCallDollarPress, onCallHeartPress, dollarRank, heartRank } =
    props;

  const dataDollar = Responce.dollarSign;
  const dataHeart = Responce.heartSign;
  const dataNo = [1, 2, 3, 4, 5];

  return (
    <View style={globalStyles.cRankMainViewBorder}>
      <View style={globalStyles.cRankMainView}>
        <Text style={globalStyles.cRankWordText}>{words}</Text>
        <View style={globalStyles.cRankMarVertical}>
          <Text style={globalStyles.cRankTextDollarHeartText}>Dollar</Text>
          <View>
            <View style={globalStyles.cRankView}>
              {dataDollar &&
                dataDollar.map((item, index) => (
                  <View style={globalStyles.cRankImageView} key={index}>
                    <TouchableOpacity
                      onPress={() => onCallDollarPress(index + 1)}
                    >
                      <Image
                        style={globalStyles.cRankImageStyle}
                        source={
                          dollarRank !== 0
                            ? dollarRank <= index
                              ? globalImages.dollarZero
                              : globalImages.blueDollar
                            : globalImages.dollarZero
                        }
                      />
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
          </View>
          <View style={globalStyles.cRankMarVertical}>
            <Text style={globalStyles.cRankTextDollarHeartText}>Heart</Text>
            <View style={globalStyles.cRankView}>
              {dataHeart &&
                dataHeart.map((item, index) => (
                  <View style={globalStyles.cRankImageView} key={index}>
                    <TouchableOpacity
                      onPress={() => onCallHeartPress(index + 1)}
                    >
                      <Image
                        style={globalStyles.cRankImageStyle}
                        source={
                          heartRank !== 0
                            ? heartRank <= index
                              ? globalImages.heartZero
                              : globalImages.blueHeart
                            : globalImages.heartZero
                        }
                      />
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
          </View>
          <View>
            <View style={globalStyles.cRankView}>
              {dataNo &&
                dataNo.map((item, index) => (
                  <View style={globalStyles.cRankNoView} key={index}>
                    <Text style={globalStyles.defaultText}>{item}</Text>
                  </View>
                ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CustomRankScreen;
