import React from "react";
import { Text, View, Modal, TouchableOpacity, StyleSheet } from "react-native";
import defaultText from "../../helper/defaultText";

const CustomModalLogin = (props) => {
  const { stateStatus, onPressSecondBtn, garyFristNextBlue, onCallUrl } = props;

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={stateStatus}
      backdropOpacity={1}
      backdropColor={"green"}
      hasBackdrop={false}
    >
      <View style={stateStatus ? styles.modalShade : { flex: 1 }}>
        <View style={styles.containerHeight}>
          <View style={styles.modalContainer}>
            <View style={styles.modalTitle}>
              <Text style={styles.centerTitleByModal}>
                {defaultText.invalidTextNew}{" "}
                <Text
                  style={{ color: "#1485FF", textDecorationLine: "underline" }}
                  onPress={() => onCallUrl()}
                >
                  donzio.com
                </Text>{" "}
                {defaultText.invalidTextNew1}
              </Text>
            </View>
            <View style={styles.modalBtns}>
              <TouchableOpacity
                style={styles.logCancel}
                onPress={() => onPressSecondBtn()}
              >
                <Text style={styles.BtnTxt}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default CustomModalLogin;

const styles = StyleSheet.create({
  modalShade: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  containerHeight: { height: "100%" },
  modalContainer: {
    padding: 20,
    width: "90%",
    backgroundColor: "#fff",
    alignSelf: "center",
    top: "40%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
  modalTitle: { paddingBottom: 15, paddingTop: 5 },
  centerTitleByModal: { textAlign: "center" },
  modalBtns: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  Btn: {
    padding: 10,
    backgroundColor: "#aaa",
    margin: 5,
    borderRadius: 3,
  },
  BtnTxt: {
    color: "#FFF",
    textAlign: "center",
  },
  logCancel: {
    padding: 10,
    width: 80,
    backgroundColor: "#1485FF",
    margin: 5,
    borderRadius: 3,
  },
});
