import React from "react";
import { Text, View, Modal } from "react-native";
import globalStyles from "../../helper/globalStyles";

const NetworkModal = (props) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.stateStatus}
        backdropOpacity={1}
        // backdropColor={color.green}
      >
        <View style={globalStyles.networkModalShade}>
          <View style={globalStyles.containerHeight}>
            <View style={globalStyles.modalContainerSide}>
              <View>
                <Text style={globalStyles.networkForConnectionText}>
                  Internert Connection Failed !
                </Text>
              </View>
              <View style={globalStyles.marginAbove}>
                <Text style={globalStyles.alignText}>
                  Oops! Please check your internet
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NetworkModal;
