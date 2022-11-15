/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, LogBox, Text, TextInput} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import interceptor from './App/services/Interceptor/index';
import NetworkService from './App/services/Networkservices/index';

LogBox.ignoreAllLogs(true);

interceptor.setupInterceptors();

NetworkService.checkNetworkConnection();

if (Text.defaultProps == null) {
  Text.defaultProps = {};
}
Text.defaultProps.allowFontScaling = false;

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
}
TextInput.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);
