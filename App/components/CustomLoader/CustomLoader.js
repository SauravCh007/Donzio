import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import globalStyles from "../../helper/globalStyles";

const CustomLoader = () => {
  return (
    <Modal transparent>
      <View style={globalStyles.loaderContainer}>
        <ActivityIndicator size="large" color={'#3d95ff'} />
      </View>
    </Modal>
  );
};

export default CustomLoader;
