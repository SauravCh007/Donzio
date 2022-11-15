import React, { Fragment, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-simple-toast";
import DropDown from "../../components/CustomDropDown/customDropDownForRole";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import Loader from "../../components/CustomLoader/CustomLoader";
import defaultText from "../../helper/defaultText";
import globalImages from "../../helper/globalImages";
import globalStyles from "../../helper/globalStyles";
import Responce from "../../helper/sampleData";
import Api from "../../util/api";
import AuthApi from "../../util/authApi";

const userRole = [
  { value: "Normal", label: "Normal" },
  { value: "Admin", label: "Admin" },
  { value: "Super Admin", label: "Super Admin" },
];

const UserInfoScreen = (props) => {
  let data = Responce.userProject;

  const [userInfo, setUserInfo] = useState([]);
  const [showLoader, setLoader] = useState(false);
  const [userId, setUserId] = useState();
  const [taskInfo, setTaskInfo] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [isEmail, setEmail] = useState("johnsmith@gmail.com");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isProfileImage, setProfileImage] = useState("");
  const [isRollId, setRollId] = useState("");
  const [rollData, setRollData] = useState([]);
  const [employeId, setEmployeId] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isDataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    onPageInit();
  }, []);

  useEffect(() => {
    onCheck();
  }, [selectedItem]);

  const onCheck = () => {
    selectedItem && isRollId && onChangeRole();
  };

  const onPageInit = async () => {
    const getUserId = await props.route.params.selectedUserId;
    //
    setUserId(getUserId);
    getUserDetails(getUserId);
    getUserTasks(getUserId);
    await getUserRollDetails();
  };

  const getUserDetails = async (getUserId) => {
    setLoader(true);
    const getUserInfo = `${Api.employee}${getUserId}/`;
    const { data, message } = await AuthApi.getDataFromServer(getUserInfo);
    setLoader(false);
    if (!data) {
      props.navigation.goBack();
      return;
    }
    await setUserInfo(data.data);
    await setSelectedItem(data.data.role_name);
    await setRollId(data.data.role);
  };

  const getUserRollDetails = async () => {
    setLoader(true);
    const { data, message } = await AuthApi.getDataFromServer(Api.roles);
    setLoader(false);
    if (!data) {
      return;
    }
    const allData = [];
    data.data.map((item, index) => {
      allData.push({ id: item.id, value: item.name });
    });
    setRollData([...allData]);
    setLoader(false);
  };

  const getUserTasks = async (getUserId) => {
    setLoader(true);
    const getUserTaskInfo = `${Api.tasks}?assigned_to=${getUserId}`;
    const { data, message } = await AuthApi.getDataFromServer(getUserTaskInfo);
    setLoader(false);
    if (!data) {
      props.navigation.goBack();
      return;
    }
    setTaskInfo(data.data && data.data);
  };

  const onCallRemoveUser = async () => {
    setLoader(true);
    let endpoint = `${Api.employee}${userId}/`;
    const { data, message } = await AuthApi.deleteDataFromServer(endpoint);

    setLoader(false);
    if (!data) {
      return;
    }
    Toast.show("user removed successFully");
    props.navigation.navigate("TeamMembers");
  };

  const onChangeRole = async () => {
    const payload = {
      id: userId,
      role: selectedItem == "Employee" ? 3 : 2,
    };
    setLoader(true);
    const { data, message } = await AuthApi.putDataToServer(
      Api.employee,
      payload
    );
    setLoader(false);
    if (!data) {
      Toast.show("something is wrong");
      return;
    }
    Toast.show(data.message[0]);
  };

  return (
    <Fragment>
      <SafeAreaView style={globalStyles.fragmentStyle_1} />
      <SafeAreaView style={globalStyles.topMainContainer}>
        <View>
          <CustomHeader
            onPressBack={() => props.navigation.goBack()}
            name={
              userInfo &&
              userInfo.first_name &&
              userInfo.first_name + " " + userInfo.last_name
            }
            additional={true}
            onPressDrawer={() => props.navigation.openDrawer()}
            showDrawerIcon={true}
          />
        </View>
        {showLoader && <Loader />}
        <ScrollView style={globalStyles.scroll}>
          <View style={globalStyles.uINameMainView}>
            <View style={globalStyles.uINameView}>
              <View>
                <Image
                  style={globalStyles.uIUserImageStyle}
                  source={
                    userInfo && userInfo.profile_image
                      ? { uri: userInfo.profile_image }
                      : globalImages.pro1
                  }
                />
              </View>
              <View style={globalStyles.uIUserTextView}>
                <Text style={globalStyles.uIUserTextName}>
                  {userInfo.first_name && userInfo.first_name}{" "}
                  {userInfo.last_name && userInfo.last_name}
                </Text>
                <Text style={globalStyles.uIUserTextEmail}>
                  {/* {isEmail} */}
                </Text>
              </View>
            </View>
          </View>
          <View style={[globalStyles.uIBorder, globalStyles.zIndex_1]}>
            <View style={globalStyles.uIProjectMainView}>
              <View style={globalStyles.uIProjectView}>
                <Text style={globalStyles.uIProjectText}>
                  {defaultText.role}
                </Text>
              </View>
              <View style={globalStyles.uIProjectViewLast}>
                <DropDown
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  data={rollData && rollData}
                />
              </View>
            </View>
          </View>

          <View style={globalStyles.uIBorder}>
            <View style={globalStyles.uIProjectMainView}>
              <View style={globalStyles.uIProjectView}>
                <Text style={globalStyles.uIProjectText}>
                  {defaultText.currentToDo}
                </Text>
              </View>

              <View style={globalStyles.uIProjectViewLast}>
                {taskInfo &&
                  taskInfo.map((item, index) => (
                    <View
                      style={[globalStyles.uIMarginL20, globalStyles.row]}
                      key={index}
                    >
                      <Text style={globalStyles.uIProjectViewLastText}>
                        {"\u2B24"}{" "}
                      </Text>
                      <Text>{item.content}</Text>
                    </View>
                  ))}
              </View>
            </View>
          </View>

          <View style={globalStyles.uIBorder}>
            <View style={globalStyles.uIRemoveMargin}>
              <View style={globalStyles.uIAlignCenter}>
                <TouchableOpacity onPress={() => onCallRemoveUser()}>
                  <Text style={globalStyles.uIRemoveText}>
                    {defaultText.removeUser}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default UserInfoScreen;
