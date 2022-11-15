import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image, Platform, SafeAreaView, TouchableNativeFeedback, TouchableOpacity, View, Alert } from 'react-native';
import globalImages from '../helper/globalImages';
import globalStyles from '../helper/globalStyles';
import AccomplishThisWeekScreen from '../screens/AccomplishThisWeekScreen/AccomplishThisWeekScreen';
import Dashboard from '../screens/Dashboard/Dashboard';
import DelaySceen from '../screens/DelaySceen/DelaySceen';
import DelegateAssignScreen from '../screens/DelegateAssignScreen/DelegateAssignScreen';
import DelegatedItemScreen from '../screens/DelegatedItemScreen/DelegatedItemScreen';
import DelegatePushScreen from '../screens/DelegatePushScreen/DelegatePushScreen';
import DelegateScreen from '../screens/DelegateScreen/DelegateScreen';
import DeleteScreen from '../screens/DeleteScreen/DeleteScreen';
import InviteByPhone from '../screens/InviteByPhone/InviteByPhone';
import LetsRanksThese from '../screens/LetsRanksThese/LetsRanksThese';
import ListingData from '../screens/ListingData/ListingData';
import MyTaskLists from '../screens/MyTaskList/MyTaskList';
import MyToDo from '../screens/MyToDo/MyToDo';
import Options from '../screens/Options/Options';
import OrderWeekScreen from '../screens/OrderWeekScreen/OrderWeekScreen';
import ParkingLot from '../screens/ParkingLot/ParkingLot';
import RankTheseScreen from '../screens/RankTheseScreen/RankTheseScreen';
import Settings from '../screens/Settings/Settings';
import TeamMembers from '../screens/TeamMembers/TeamMembers';
import ThisWeekScreen from '../screens/ThisWeekScreen/ThisWeekScreen';
import UserInfoScreen from '../screens/UserInfoScreen/UserInfoScreen';
import YourTaskScreen from '../screens/YourTaskScreen/YourTaskScreen';
import About from '../screens/About/About';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const StacksScreens = () => {
    return (
        <Stack.Navigator headerMode={'none'} initialRouteName={'Dashboard'}>
            <Stack.Screen name="Dashboard" component={Dashboard} options={{ gestureEnabled: false }} />
            <Stack.Screen name="ThisWeekScreen" component={ThisWeekScreen} options={{ gestureEnabled: false }} />
            <Stack.Screen name="MyTaskLists" component={MyTaskLists} options={{ gestureEnabled: false }} />

            <Stack.Screen name="LetsRanksThese" component={LetsRanksThese} options={{ gestureEnabled: false }} />

            <Stack.Screen name="RankTheseScreen" component={RankTheseScreen} options={{ gestureEnabled: false }} />

            <Stack.Screen name="OrderWeekScreen" component={OrderWeekScreen} options={{ gestureEnabled: false }} />
            <Stack.Screen name="ListingData" component={ListingData} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Settings" component={Settings} options={{ gestureEnabled: false }} />
            <Stack.Screen name="AccomplishThisWeekScreen" component={AccomplishThisWeekScreen} />
            <Stack.Screen name="DelegateAssignScreen" component={DelegateAssignScreen} />
            <Stack.Screen name="DelegateScreen" component={DelegateScreen} />
            <Stack.Screen name="DelegatePushScreen" component={DelegatePushScreen} />
            <Stack.Screen name="ParkingLot" component={ParkingLot} />
            <Stack.Screen name="DeleteScreen" component={DeleteScreen} />
            <Stack.Screen name="DelaySceen" component={DelaySceen} />
            <Stack.Screen name="DelegatedItemScreen" component={DelegatedItemScreen} />
            <Stack.Screen name="InviteByPhone" component={InviteByPhone} />
            <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} />
            <Stack.Screen name="YourTaskScreen" component={YourTaskScreen} />
            <Stack.Screen name="MyToDo" component={MyToDo} />
            <Stack.Screen name="TeamMembers" component={TeamMembers} />
            <Stack.Screen name="Options" component={Options} />
            <Stack.Screen name="About" component={About} options={{ gestureEnabled: false }} />
        </Stack.Navigator>
    );
};

function CustomDrawerContent({ drawerPosition, navigation }) {
    const onLogOutPress = async params => {
        Alert.alert(
            '',
            'Are you sure want to logout?',
            [{ text: 'Yes', onPress: () => confirmLogout() }, { text: 'No' }],
            { cancelable: true },
        );
    };
    const confirmLogout = async () => {
        await AsyncStorage.removeItem('usertoken');
        navigation.closeDrawer();
        navigation.replace('LoginScreen');
    };
    return (
        <>
            <SafeAreaView></SafeAreaView>
            <SafeAreaView>
                <View
                    style={{
                        height: 80,
                        width: '100%',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                    }}
                >
                    {Platform.OS == 'ios' ? (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.closeDrawer();
                            }}
                        >
                            <Image source={globalImages.closeIcon} style={globalStyles.drawerCloseIcon} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableNativeFeedback
                            onPress={() => {
                                navigation.closeDrawer();
                            }}
                        >
                            <Image source={globalImages.closeIcon} style={globalStyles.drawerCloseIcon} />
                        </TouchableNativeFeedback>
                    )}
                    <View style={globalStyles.alignSelfCenter}>
                        <Image
                            //source={require("../assets/robotDog.png")}
                            // style={globalStyles.drawerDogIcon}
                            source={require('../assets/Clock.png')}
                            resizeMode="contain"
                            style={{ height: 90, width: 90 }}
                        />
                    </View>
                </View>

                <DrawerItem
                    activeTintColor={'red'}
                    label="All To Do's"
                    onPress={() => {
                        navigation.closeDrawer();
                        navigation.navigate('Dashboard');
                    }}
                />
                <DrawerItem
                    label="My Tasks"
                    onPress={() => {
                        navigation.closeDrawer();
                        navigation.navigate('MyTaskLists');
                    }}
                />
                <DrawerItem
                    label="All Tasks"
                    onPress={() => {
                        navigation.closeDrawer();
                        navigation.navigate('ListingData');
                    }}
                />
                <DrawerItem
                    label="Settings"
                    onPress={() => {
                        navigation.closeDrawer();
                        navigation.navigate('Settings');
                    }}
                />
                <DrawerItem
                    label="About"
                    onPress={() => {
                        navigation.closeDrawer();
                        navigation.navigate('About');
                    }}
                />
                <DrawerItem label="Logout" onPress={() => onLogOutPress()} />
            </SafeAreaView>
        </>
    );
}
function DrawerNav() {
    return (
        <Drawer.Navigator
            initialRouteName={'ThisWeekScreen'}
            drawerStyle={globalStyles.drawerWidth}
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="StacksScreens" component={StacksScreens} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
}
export default DrawerNav;
