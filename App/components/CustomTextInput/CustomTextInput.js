import React from "react";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import globalStyles from "../../helper/globalStyles";

const CustomTextInput = (props) => {
  const {
    placeholder,
    check,
    keyboardType,
    onChangeText,
    onChange,
    defaultValue,
    pattern,
    onBlur,
    maxLength,
    editable,
    value,
    multiNumber,
    number,
  } = props;

  return (
    <SafeAreaView>
      <View
        style={
          multiNumber
            ? globalStyles.customTextInputMainViewForNumber
            : globalStyles.customTextInputMainView
        }
      >
        {multiNumber && (
          <View style={globalStyles.customTextInputNumberView}>
            <Text style={globalStyles.customTextInputNumberText}>{number}</Text>
          </View>
        )}

        <View
          style={
            multiNumber
              ? globalStyles.customTextInputWriteViewNew
              : globalStyles.customTextInputWriteView
          }
        >
          <TextInput
            style={
              multiNumber
                ? globalStyles.customTextInputWriteTextNew
                : globalStyles.customTextInputWriteText
            }
            placeholder={placeholder}
            placeholderTextColor={'#00000070'}
            secureTextEntry={check}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            onChange={onChange}
            defaultValue={defaultValue}
            pattern={pattern}
            onBlur={onBlur}
            maxLength={maxLength}
            editable={editable}
            // clearButtonMode="always"
            value={value}
            returnKeyType="done"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default CustomTextInput;
