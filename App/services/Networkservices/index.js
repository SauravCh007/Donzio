import NetInfo from "@react-native-community/netinfo";
import { Component } from "react";
import AuthApi from "../../util/authApi";
import SharedService from "../SharedService/sharedServices";
export default class NetworkService extends Component {
  static netChanged = true;

  static checkNetworkConnection() {
    NetInfo.addEventListener(NetworkService.handleConnectionChange);
    NetInfo.fetch().then((isConnected) => {
      AuthApi.isConnected = isConnected;
      NetworkService.netChanged = isConnected;
    });
  }
  static handleConnectionChange(isConnected) {
    AuthApi.isConnected = isConnected;
    NetworkService.netChanged = isConnected;
    SharedService.networkChanged.next(isConnected);
  }

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillUnmount() {
    NetInfo.removeEventListener("connectionChange", handleConnectionChange);
  }
}
