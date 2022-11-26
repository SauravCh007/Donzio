import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import Navigation from "./config/Navigation";
import defaultColor from "./helper/defaultColor";
import SharedService from "./services/SharedService/sharedServices";
import NetworkModal from "./components/NetworkModal/NetworkModal";
const AppContainer = () => {
  const [networkModal, setNetworkModal] = useState(false);

  useEffect(() => {
    SharedService.networkChanged.subscribe(async (changed) => {
      if (changed.isInternetReachable == null) {
        return;
      }
      if (!changed.isInternetReachable) {
        await setNetworkModal(true);
      } else {
        await setNetworkModal(false);
      }
    });
  }, []);
  return (
    <>
      <StatusBar
        backgroundColor={defaultColor.skyBlue}
        barStyle={'default'}
      />
      <NetworkModal stateStatus={networkModal} />
      <Navigation />
    </>
  );
};

export default AppContainer;
