// import React, { Fragment, useEffect, useState } from "react";
// import {
//   SafeAreaView,
//   ScrollView, Text, View,
//   PermissionsAndroid, Platform,
// } from "react-native";
// import Toast from "react-native-simple-toast";
// import CustomFooter from "../../components/CustomFooter/CustomFooter";
// import CustomHeader from "../../components/CustomHeader/CustomHeader";
// import Loader from "../../components/CustomLoader/CustomLoader";
// import CustomModal from "../../components/CustomModal/CustomModal";
// import CustomWorkScreen from "../../components/CustomWorkScreen/CustomWorkScreen";
// import defaultText from "../../helper/defaultText";
// import globalStyles from "../../helper/globalStyles";
// import Responce from "../../helper/sampleData";
// import Api from "../../util/api";
// import AuthApi from "../../util/authApi";
// import Contacts from 'react-native-contacts';
// const DelegateAssignScreen = (props) => {
//   let dataAssign = Responce.assignDelegate;

//   const [modalOpen, setModalOpen] = useState(false);
//   const [isSource, setSource] = useState();
//   const [name, setName] = useState("");
//   const [getImage, setGetImage] = useState();
//   const [isMember, setMember] = useState([]);
//   const [showLoader, setLoader] = useState(false);
//   const [isDataLoaded, setDataLoaded] = useState(false);
//   const [listingData, setData] = useState([]);
//   const [assignName, setAsignName] = useState('');
//   const [assignPhone, setAsignPhone] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [taskId, setTaskId] = useState('');
//   const [delegatePhone, setDelegatePhone] = useState('');
//   const [paginationData, setPaginationData] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     pageLimit: 10,
//     totalCount: 0,
//   });

//   useEffect(() => {
//     getTaskList();
//     console.log("hi")
//   }, []);


//   let [contacts, setContacts] = useState([]);

//   // useEffect(() => {
//   //   if (Platform.OS === 'android') {
//   //     PermissionsAndroid.request(
//   //       PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
//   //       title: 'Contacts',
//   //       message: 'This app would like to view your contacts.',
//   //     }).then(() => {
//   //       loadContacts();
//   //     }
//   //     );
//   //   } else {
//   //     loadContacts();
//   //   }
//   // }, []);
//   const PermissionContact = () => {
//     if (Platform.OS === 'android') {
//       PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
//         title: 'Contacts',
//         message: 'This app would like to view your contacts.',
//       }).then(() => {
//         loadContacts();
//       }
//       );
//     } else {
//       loadContacts();
//     }
//   }



//   const loadContacts = () => {
//     Contacts.getAll()
//       .then(contacts => {
//         contacts.sort(
//           (a, b) =>
//             a.givenName.toLowerCase() > b.givenName.toLowerCase(),
//         );
//         setContacts(contacts);
//       })
//       .catch(e => {
//         alert('Permission to access contacts was denied');
//         console.warn('Permission to access contacts was denied');
//       });
//   };



//   console.log("contacts", contacts)

//   const getTaskList = async (currentPage = 1) => {
//     setLoader(true);
//     let page = currentPage ? currentPage : paginationData.currentPage;
//     let limit = paginationData.pageLimit;
//     const taskContent = currentPage == 1 ? [] : listingData;
//     const getDelegateTask = `${Api.tasks}?heart_dollar=1&status=1&is_task_assigned=2&sort_direction=descending&my_task=1&page=${page}&limit=${limit}`;
//     const { data, message } = await AuthApi.getDataFromServer(getDelegateTask);
//     console.log("getDelegateTask", getDelegateTask)
//     console.log("getDelegateTaskdata", data)
//     setLoader(false);
//     if (!data) {
//       setDataLoaded(true);
//       Toast.show(message);
//       return;
//     }
//     setData([...taskContent, ...data.data]);
//     setPaginationData({
//       currentPage: data.paginator.current_page + 1,
//       pageLimit: data.paginator.limit,
//       totalPages: data.paginator.total_pages,
//       totalCount: data.paginator.total_count,
//     });
//     setDataLoaded(true);
//   };

//   const teamMemberList = async (id) => {
//     setLoader(true);
//     const getActiveEmployee = `${Api.employee}?status=1&task_id=${id}`;
//     const { data, message } = await AuthApi.getDataFromServer(
//       getActiveEmployee
//     );
//     setLoader(false);
//     console.log("teamMemberList", data)
//     if (!data) {
//       setTimeout(() => {
//         Toast.show(message);
//       }, 1000);
//       return;
//     }
//     setMember(data.data);
//   };



//   const onCallModalSelect = (item) => {
//     let assignName = item.displayName
//     setAsignName(assignName)
//     setAsignPhone(item && item.phoneNumbers[0].number)

//     // if (name.first_name && name.last_name) {
//     //   assignName = `${name.first_name}` + " " + `${name.last_name}`;
//     // } else {
//     //   assignName = name.first_name || name.last_name;
//     // }
//     listingData[currentIndex].profilePicture = item.thumbnailPath;
//     listingData[currentIndex].name = assignName;
//     // listingData[currentIndex].assigned_to_id = id;
//     setModalOpen(false);
//     // setContacts('')
//   };

//   const onCallTapToAssign = (item, index) => {
//       setModalOpen(true);
//     setTaskId(item.id)
//     // setDelegatePhone(item.assigned_to_id)
//     setCurrentIndex(index);
//   };

//   const onCompleteTask = async () => {

//     const payload = {
//       data:listingData,
//       // "data": [
//       //   {
//       //     "id": taskId,
//       //     "mobile": assignPhone.length == 10 ? "+91" + assignPhone : assignPhone
//       //   },
//       // ]
//     };
//     console.log("payload", payload)
//     return
//     setLoader(true);
//     const { data, message } = await AuthApi.putDataToServer(Api.taskAsign, payload);
//     console.log("onCompleteTask", data)
//     setLoader(false);
//     if (!data) {
//       setTimeout(() => {
//         Toast.show(message);
//       }, 1000);
//       return;
//     }
//     //Toast.show("Please assign atleast one team member to task")
//     props.navigation.navigate("Dashboard");
//   };

//   const isCloseToBottom = ({
//     layoutMeasurement,
//     contentOffset,
//     contentSize,
//   }) => {
//     const paddingToBottom = 20;
//     if (contentOffset.y > 0) {
//       return (
//         layoutMeasurement.height + contentOffset.y >=
//         contentSize.height - paddingToBottom
//       );
//     }
//   };
//   return (
//     <Fragment>
//       <SafeAreaView style={globalStyles.fragmentStyle_1} />
//       <SafeAreaView style={globalStyles.fragmentStyle_2}>
//         <SafeAreaView style={globalStyles.topMainContainer}>
//           <View>
//             <CustomHeader
//               headerTitle={defaultText.delegate}
//               onPressDrawer={() => props.navigation.openDrawer()}
//               showDrawerIcon={true}
//             />
//           </View>
//           {showLoader && <Loader />}
//           {listingData.length !== 0 ? (
//             <ScrollView
//               style={globalStyles.scroll}
//               onScroll={async ({ nativeEvent }) => {
//                 if (
//                   isCloseToBottom(nativeEvent) &&
//                   paginationData.currentPage <= paginationData.totalPages
//                 ) {
//                   await getTaskList(paginationData.currentPage);
//                 }
//               }}
//             >
//               <View style={globalStyles.margintop10}>
//                 {listingData &&

//                   listingData.map((item, index) => (
//                     console.log("firstitem", item),
//                     <View key={index}>
//                       <CustomWorkScreen
//                         no={index + 1}
//                         word={item.content}
//                         dollar={item.dollar}
//                         heart={item.heart}
//                         assignTask={true}
//                         onPressImage={async () => {
//                           // await teamMemberList(item.id);
//                           await onCallTapToAssign(item, index);
//                           PermissionContact()
//                           console.log("first", item)

//                         }}
//                         assignName={assignName}
//                         assignSource={item.profilePicture}
//                       />
//                     </View>
//                   ))}
//               </View>
//             </ScrollView>
//           ) : (
//             isDataLoaded && (
//               <View style={globalStyles.errorMessageNotFound}>
//                 <Text style={globalStyles.errorMessageNotFoundText}>
//                   {defaultText.notRecordFound}
//                 </Text>
//               </View>
//             )
//           )}

//           {isDataLoaded && listingData.length !== 0 && (
//             <View style={globalStyles.bottomTab}>
//               <CustomFooter
//                 title={defaultText.complete}
//                 onPress={() => onCompleteTask()}
//               />
//             </View>
//           )}
//           {modalOpen && (
//             <CustomModal
//               nameData={contacts}
//               onPressCross={() => setModalOpen(false)}
//               onPressSelectEmploye={(item) => {
//                 console.log("name", item)
//                 onCallModalSelect(item);
//               }}
//             />
//           )}
//         </SafeAreaView>
//       </SafeAreaView>
//     </Fragment>
//   );
// };

// export default DelegateAssignScreen;


import React, { Fragment, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView, Text, View,PermissionsAndroid , Platform
} from "react-native";
import Toast from "react-native-simple-toast";
import CustomFooter from "../../components/CustomFooter/CustomFooter";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import Loader from "../../components/CustomLoader/CustomLoader";
import CustomModal from "../../components/CustomModal/CustomModal";
import CustomWorkScreen from "../../components/CustomWorkScreen/CustomWorkScreen";
import defaultText from "../../helper/defaultText";
import globalStyles from "../../helper/globalStyles";
import Responce from "../../helper/sampleData";
import Api from "../../util/api";
import AuthApi from "../../util/authApi";
import Contacts from 'react-native-contacts';

const DelegateAssignScreen = (props) => {
  let dataAssign = Responce.assignDelegate;

  const [modalOpen, setModalOpen] = useState(false);
  const [isSource, setSource] = useState();
  const [name, setName] = useState("");
  const [getImage, setGetImage] = useState();
  const [isMember, setMember] = useState([]);
  const [showLoader, setLoader] = useState(false);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [listingData, setData] = useState([]);
  let [contacts, setContacts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPages: 1,
    pageLimit: 10,
    totalCount: 0,
  });

  useEffect(() => {
    getTaskList();
  }, []);

  const getTaskList = async (currentPage = 1) => {
    setLoader(true);
    let page = currentPage ? currentPage : paginationData.currentPage;
    let limit = paginationData.pageLimit;
    const taskContent = currentPage == 1 ? [] : listingData;
    const getDelegateTask = `${Api.tasks}?heart_dollar=1&status=1&is_task_assigned=2&sort_direction=descending&my_task=1&page=${page}&limit=${limit}`;
    const { data, message } = await AuthApi.getDataFromServer(getDelegateTask);
    console.log("taskContent",taskContent,data)
    setLoader(false);
    if (!data) {
      setDataLoaded(true);
      Toast.show(message);
      return;
    }
    setData([...taskContent, ...data.data]);
    setPaginationData({
      currentPage: data.paginator.current_page + 1,
      pageLimit: data.paginator.limit,
      totalPages: data.paginator.total_pages,
      totalCount: data.paginator.total_count,
    });
    setDataLoaded(true);
  };

  const teamMemberList = async (id) => {
    setLoader(true);
    const getActiveEmployee = `${Api.employee}?status=1&task_id=${id}`;
    const { data, message } = await AuthApi.getDataFromServer(
      getActiveEmployee
    );
    setLoader(false);
    if (!data) {
      setTimeout(() => {
        Toast.show(message);
      }, 1000);
      return;
    }
    setMember(data.data);
  };

  const PermissionContact = () => {
        if (Platform.OS === 'android') {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
          }).then(() => {
            loadContacts();
          }
          );
        } else {
          loadContacts();
        }
      }
    
      const loadContacts = () => {
        Contacts.getAll()
          .then(contacts => {
            contacts.sort(
              (a, b) =>
                a.givenName.toLowerCase() > b.givenName.toLowerCase(),
            );
            setContacts(contacts);
          })
          .catch(e => {
            alert('Permission to access contacts was denied');
            console.warn('Permission to access contacts was denied');
          });
      };
    

  const onCallModalSelect = (item) => {
    console.log("first",item)

    // let assignName;
    // if (name.first_name && name.last_name) {
    //   assignName = `${name.first_name}` + " " + `${name.last_name}`;
    // } else {
    //   assignName = name.first_name || name.last_name;
    // }
    listingData[currentIndex].profilePicture = item.thumbnailPath;
    listingData[currentIndex].name = item.displayName;
    listingData[currentIndex].id = taskId;
    listingData[currentIndex].mobile = item.phoneNumbers[0].number;
    setModalOpen(false);
  };

  const onCallTapToAssign = (item, index) => {
    setModalOpen(true);
    setTaskId(item.id)
    setCurrentIndex(index);
  };

  const onCompleteTask = async () => {
    const payload = {
      data: listingData,
    };
    console.log(payload)
    setLoader(true);
    const { data, message } = await AuthApi.putDataToServer(Api.taskAsign, payload);
    console.log("res",data,)
    setLoader(false);
    if (!data) {
      setTimeout(() => {
        Toast.show(message);
      }, 1000);
      return;
    }
    //Toast.show("Please assign atleast one team member to task")
    props.navigation.navigate("Dashboard");
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    if (contentOffset.y > 0) {
      return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      );
    }
  };
  return (
    <Fragment>
      <SafeAreaView style={globalStyles.fragmentStyle_1} />
      <SafeAreaView style={globalStyles.fragmentStyle_2}>
        <SafeAreaView style={globalStyles.topMainContainer}>
          <View>
            <CustomHeader
              headerTitle={defaultText.delegate}
              onPressDrawer={() => props.navigation.openDrawer()}
              showDrawerIcon={true}
            />
          </View>
          {showLoader && <Loader />}
          {listingData.length !== 0 ? (
            <ScrollView
              style={globalStyles.scroll}
              onScroll={async ({ nativeEvent }) => {
                if (
                  isCloseToBottom(nativeEvent) &&
                  paginationData.currentPage <= paginationData.totalPages
                ) {
                  await getTaskList(paginationData.currentPage);
                }
              }}
            >
              <View style={globalStyles.margintop10}>
                {listingData &&
                  listingData.map((item, index) => (
                    console.log("dataItem",item),
                    <View key={index}>
                      <CustomWorkScreen
                        no={index + 1}
                        word={item.content}
                        dollar={item.dollar}
                        heart={item.heart}
                        assignTask={true}
                        onPressImage={async () => {
                          // await teamMemberList(item.id);
                          await PermissionContact()
                          await onCallTapToAssign(item, index);

                        }}
                        assignName={item.name}
                        assignSource={item.profilePicture}
                      />
                    </View>
                  ))}
              </View>
            </ScrollView>
          ) : (
            isDataLoaded && (
              <View style={globalStyles.errorMessageNotFound}>
                <Text style={globalStyles.errorMessageNotFoundText}>
                  {defaultText.notRecordFound}
                </Text>
              </View>
            )
          )}

          {isDataLoaded && listingData.length !== 0 && (
            <View style={globalStyles.bottomTab}>
              <CustomFooter
                title={defaultText.complete}
                onPress={() => onCompleteTask()}
              />
            </View>
          )}
          {modalOpen && (
            <CustomModal
              nameData={contacts}
              onPressCross={() => setModalOpen(false)}
              onPressSelectEmploye={(item) => {
                onCallModalSelect(item);
              }}
            />
          )}
        </SafeAreaView>
      </SafeAreaView>
    </Fragment>
  );
};

export default DelegateAssignScreen;
