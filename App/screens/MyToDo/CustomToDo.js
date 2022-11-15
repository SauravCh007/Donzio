import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Color from "../../helper/defaultColor";
import globalStyles from "../../helper/globalStyles";

const CustomToDo = (props) => {
  const { ToDoList, onPress, radioSelected } = props;

  return (
    <View style={globalStyles.customToDoView}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={[
            globalStyles.customToDoRadioButton,
            {
              backgroundColor: radioSelected ? Color.primaryColor : Color.white,
            },
          ]}
        />
      </TouchableOpacity>

      <View style={globalStyles.paddingLeft_10}>
        <Text style={globalStyles.fontSize_16}>{ToDoList}</Text>
      </View>
    </View>
  );
};

export default CustomToDo;
