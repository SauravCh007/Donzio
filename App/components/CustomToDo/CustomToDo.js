import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import globalStyles from "../../helper/globalStyles";

const CustomToDo = (props) => {
  const { radioButton, ToDoList, onPress, radioSelected } = props;

  return (
    <>
      {radioButton && (
        <View style={globalStyles.mt20}>
          <TouchableOpacity
            style={globalStyles.customToDoView}
            onPress={onPress}
          >
            <View style={globalStyles.customToDoRadioButton}>
              {radioSelected && (
                <View style={globalStyles.customToDoOnSelectRadio} />
              )}
            </View>
            <View style={globalStyles.paddingLeft_10}>
              <Text style={globalStyles.fontSize_16}>{ToDoList}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default CustomToDo;
