import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import defaultText from "../../helper/defaultText";
import globalImages from "../../helper/globalImages";
import globalStyles from "../../helper/globalStyles";
import Responce from "../../helper/sampleData";

const CustomWorkScreen = (props) => {
  const {
    no,
    word,
    title,
    dollar,
    heart,
    delegateImg,
    delayImg,
    deleteImg,
    Img,
    assignTask,
    onPressImage,
    arrowCheck,
    isDelete,
    onPressDelete,
    delayFor,
    onChangeTextMonth,
    onChangeTextWeek,
    onChangeTextDay,
    isTask,
    onPressCheckSign,
    isCheck,
    assignSource,
    assignName,
    assignCheck,
    assigncheckImg,
    onPressItem,
    disabled,
    onPressItemNew,
    defaultValueMonth,
    defaultValueWeek,
    defaultValueDay,
  } = props;
  const dataDollar = Responce.dollarSign;
  const dataHeart = Responce.heartSign;

  return (
    <SafeAreaView>
      <View style={globalStyles.cWMainView}>
        <View style={globalStyles.cWContainer}>
          <View style={globalStyles.cWNoView}>
            <Text style={globalStyles.cWNoText}>{no}</Text>
          </View>

          <View style={globalStyles.cWWordView}>
            <Text style={globalStyles.cWWordText}>{word}</Text>
            <View style={globalStyles.cWImageView}>
              <View style={globalStyles.cWImageListView}>
                {dataDollar &&
                  dataDollar
                    .filter((item, index) => index < dollar)
                    .map((item, index) => (
                      <View
                        style={globalStyles.cWImageListViewContainer}
                        key={index}
                      >
                        <Image
                          style={globalStyles.cWDollarHeartImageStyle}
                          source={item.source}
                        />
                        {dollar == index + 1 && (
                          <Text style={globalStyles.cWDollarHeartText}>
                            {dollar}
                          </Text>
                        )}
                      </View>
                    ))}
              </View>

              <View style={globalStyles.cWImageListView}>
                {dataHeart &&
                  dataHeart
                    .filter((item, index) => index < heart)
                    .map((item, index) => (
                      <View
                        style={globalStyles.cWImageListViewContainer}
                        key={index}
                      >
                        <Image
                          style={globalStyles.cWDollarHeartImageStyle}
                          source={item.source}
                        />
                        {heart == index + 1 && (
                          <Text style={globalStyles.cWDollarHeartText}>
                            {heart}
                          </Text>
                        )}
                      </View>
                    ))}
              </View>

              <View style={globalStyles.cWLastView}>
                <View
                  style={
                    assigncheckImg
                      ? globalStyles.cWCheckImageView
                      : globalStyles.cWCheckImageView_1
                  }
                >
                  {Img && (
                    <TouchableOpacity onPress={onPressItem}>
                      <Image
                        style={
                          delegateImg
                            ? globalStyles.cWDelegateImageStyle
                            : delayImg
                            ? globalStyles.cWDelayImageStyle
                            : deleteImg
                            ? globalStyles.cWDeleteImageStyle
                            : arrowCheck
                            ? globalStyles.cWArrowImageStyle
                            : null
                        }
                        source={
                          delegateImg
                            ? globalImages.delegate
                            : delayImg
                            ? globalImages.delay
                            : deleteImg
                            ? globalImages.delete
                            : arrowCheck
                            ? globalImages.arrowRight
                            : null
                        }
                      />
                    </TouchableOpacity>
                  )}
                  {assigncheckImg && (
                    <TouchableOpacity
                      onPress={onPressItemNew}
                      style={globalStyles.cWCheckImageStyle}
                    >
                      {assignCheck && (
                        <Image
                          style={globalStyles.cWCheckImageStyle}
                          source={globalImages.tick}
                        />
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>

            {isDelete && (
              <View style={globalStyles.cWIsDeleteMainView}>
                <View style={globalStyles.cWIsDeleteFirstView}>
                  <View style={globalStyles.cWIsDeleteDelayImageView}>
                    <TouchableOpacity>
                      <Image
                        style={globalStyles.cWIsDeleteDelayImageStyle}
                        source={globalImages.delay}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={globalStyles.cWIsDeleteDelegateImageView}>
                    <TouchableOpacity>
                      <Image
                        style={globalStyles.cWIsDeleteDelegateImageStyle}
                        source={globalImages.delegate}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={globalStyles.cWIsDeleteCheckImageView}>
                    <TouchableOpacity>
                      <Image
                        style={globalStyles.cWIsDeleteCheckImageStyle}
                        source={globalImages.checkCircle}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={globalStyles.cWIsDeleteImageView}>
                  <TouchableOpacity onPress={onPressDelete}>
                    <Image
                      style={globalStyles.cWIsDeleteImageStyle}
                      source={globalImages.delete}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
      {isTask && (
        <View style={globalStyles.cWIsTaskMainView}>
          <View style={globalStyles.cWIsTaskImageView}>
            <Image
              style={globalStyles.cWIsTaskDealyImageStyle}
              source={globalImages.delay}
            />
          </View>

          <View style={globalStyles.cWIsTaskImageView}>
            <View style={globalStyles.cWIsTaskBorderImage}>
              <TouchableOpacity onPress={onPressCheckSign}>
                <Image
                  style={globalStyles.cWIsTaskCheckMarkImage}
                  source={isCheck && globalImages.checkMark}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={globalStyles.cWIsTaskImageView}>
            <Image
              style={globalStyles.cWIsTaskDelegateImage}
              source={globalImages.delegate}
            />
          </View>
        </View>
      )}

      {assignTask && (
        <View style={globalStyles.cWAssignMainView}>
          <TouchableOpacity
            onPress={onPressImage}
            activeOpacity={0.6}
           
            disabled={disabled}
          >
            <View style={globalStyles.cWassignView}>
              <View style={globalStyles.cWAssign70}>
                <View style={globalStyles.row}>
                  <View style={globalStyles.cWAssignTextView}>
                    <Text style={globalStyles.cWAssignText}>Assigned to:</Text>
                  </View>

                  <View>
                    {assignSource ? (
                      <View style={globalStyles.cWAssignImg}>
                        <Image
                          style={globalStyles.cWAssignImgStyle}
                          // source={renderImageSource(assignSource)}
                          source={{ uri: assignSource }}
                        />
                      </View>
                    ) : (
                      <View style={globalStyles.cWAssignImg}>
                        <Image
                          style={globalStyles.cWAssignImgStyleNew}
                          source={globalImages.profileBlue}
                        />
                      </View>
                    )}
                  </View>
                </View>

                {assignName ? (
                  <View>
                    <Text style={globalStyles.cWTapAssignTextNew}>
                      {assignName}
                    </Text>
                    <Text style={globalStyles.cWTapAssignTextNew}></Text>
                  </View>
                ) : (
                  <View>
                    <Text style={globalStyles.cWTapAssignText}>
                      {defaultText.tapToAssign}
                    </Text>
                  </View>
                )}
              </View>

              <View style={globalStyles.cWAssignLastArrow}>
                <Image
                  style={globalStyles.cWAssignLastArrowStyle}
                  source={globalImages.arrowRight}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <View>
        {delayFor && (
          <View>
            <View style={globalStyles.cWDForMainViewNew}>
              <View style={globalStyles.row}>
                <View style={globalStyles.cWDForTextView}>
                  <Text style={globalStyles.cWDForText}>Delay For:</Text>
                </View>

                <View style={globalStyles.cWDForFirstView}>
                  <View style={globalStyles.row}>
                    <View style={globalStyles.cWDForTextInputView}>
                      <TextInput
                        style={globalStyles.cWDForTextInputStyle}
                        maxLength={1}
                        defaultValue={defaultValueMonth}
                        keyboardType="numeric"
                        onChangeText={onChangeTextMonth}
                        returnKeyType="done"
                      />
                      <View style={globalStyles.cWDForMonthWeekDayView}>
                        <Text style={globalStyles.cWDForMonthWeekDayText}>
                          {defaultText.month}
                        </Text>
                      </View>
                    </View>

                    <View style={globalStyles.cWDForDarkBorder} />

                    <View style={globalStyles.cWDForTextInputView}>
                      <TextInput
                        style={globalStyles.cWDForTextInputStyle}
                        maxLength={1}
                        defaultValue={defaultValueWeek}
                        keyboardType="numeric"
                        onChangeText={onChangeTextWeek}
                        returnKeyType="done"
                      />
                      <View style={globalStyles.cWDForMonthWeekDayView}>
                        <Text style={globalStyles.cWDForMonthWeekDayText}>
                          {defaultText.week}
                        </Text>
                      </View>
                    </View>
                    <View style={globalStyles.cWDForDarkBorder} />
                    <View style={globalStyles.cWDForTextInputView}>
                      <TextInput
                        style={globalStyles.cWDForTextInputStyle}
                        maxLength={2}
                        defaultValue={defaultValueDay}
                        keyboardType="numeric"
                        onChangeText={onChangeTextDay}
                        returnKeyType="done"
                      />
                      <View style={globalStyles.cWDForMonthWeekDayView}>
                        <Text style={globalStyles.cWDForMonthWeekDayText}>
                          {defaultText.day}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View style={globalStyles.cWDForLastView}>
                <Text style={globalStyles.cWDForLastText}>
                  {defaultText.enterAmmOfTime}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CustomWorkScreen;
