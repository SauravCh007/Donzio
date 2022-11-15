import React from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import globalImages from "../../helper/globalImages";
import globalStyles from "../../helper/globalStyles";
import Responce from "../../helper/sampleData";

const CustomDelegateItem = (props) => {
  let heartSign = Responce.heartSignYourTask;
  let dollarSign = Responce.dollarSignYourTask;
  const {
    isChechbox,
    isCheck,
    onPressCheckbox,
    onPressCheckboxSelected,
    getDollar,
    getHeart,
    word,
    onPresDelay,
    onPresDelegate,
    onPresCheck,
    check,
    indexNumber,
    marginBottom,
    delayNew,
    delegateNew,
    unCheckSource,
    checkNew,
    checkNewSource,
    delayOption,
    delegateOption,
  } = props;

  return (
    <>
      <View style={[globalStyles.p10, globalStyles.lightBorder]}>
        <View style={[globalStyles.row, globalStyles.pb_10]}>
          {isChechbox && (
            <View style={globalStyles.checkboxButton}>
              <Text>{indexNumber}</Text>
            </View>
          )}
          <View
            style={[
              isChechbox ? globalStyles.width_90 : globalStyles.width_100,
            ]}
          >
            <Text style={globalStyles.fontSize_15}>{word}</Text>
            <View style={globalStyles.pt10}>
              <View style={globalStyles.customDelegateItemRank}>
                <View style={globalStyles.row}>
                  <View style={globalStyles.customDelegateItemRankView}>
                    {heartSign &&
                      heartSign.map((i, j) => {
                        if (j + 1 == getHeart) {
                          return (
                            <>
                              <Image
                                key={j}
                                source={i.source}
                                style={
                                  globalStyles.customDelegateItemScreenImage
                                }
                              />
                              <Text style={globalStyles.paddingLeft_10} key={j}>
                                {getHeart}
                              </Text>
                            </>
                          );
                        }
                      })}
                  </View>

                  <View style={globalStyles.customDelegateItemRankView}>
                    {dollarSign &&
                      dollarSign.map((i, j) => {
                        if (j +1  == getDollar) {
                          return (
                            <>
                              <Image
                                key={j}
                                source={i.source}
                                style={
                                  globalStyles.customDelegateItemScreenImage
                                }
                              />
                              <Text style={globalStyles.paddingLeft_10} key={j}>
                                {getDollar}
                              </Text>
                            </>
                          );
                        }
                      })}
                  </View>
                </View>

                {isCheck && (
                  <View
                    style={[globalStyles.row, globalStyles.alignItemsCenter]}
                  >
                    {delayOption &&
                      <View style={globalStyles.pl5}>
                        <TouchableOpacity onPress={onPresDelay}>
                          <Image
                            source={
                              delayNew
                                ? globalImages.delayRed
                                : globalImages.delayNew
                            }
                            style={globalStyles.customDelegateItemScreenImageNew}
                          />
                        </TouchableOpacity>
                      </View>}

                    {delegateOption &&
                      <View style={globalStyles.pl5}>
                        <TouchableOpacity onPress={onPresDelegate}>
                          <Image
                            source={
                              delegateNew
                                ? globalImages.delegateRed
                                : globalImages.delegateNew
                            }
                            style={globalStyles.customDelegateItemScreenImageNew}
                          />
                        </TouchableOpacity>
                      </View>}

                    {
                      <View style={globalStyles.pl5}>
                        <TouchableOpacity onPress={onPresCheck}>
                          <Image
                            source={
                              check
                                ? globalImages.checkSign
                                : checkNew
                                  ? checkNewSource
                                  : globalImages.unCheck
                            }
                            style={globalStyles.customDelegateItemScreenImageNew}
                          />
                        </TouchableOpacity>
                      </View>
                    }
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default CustomDelegateItem;
