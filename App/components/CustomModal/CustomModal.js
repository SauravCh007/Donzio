import React, { useState } from "react";
import { ToastAndroid } from "react-native";
import { FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View, Alert, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "../../../App/components/CustomLoader/CustomLoader";
import defaultText from "../../helper/defaultText";
import globalImages from "../../helper/globalImages";
import globalStyles from "../../helper/globalStyles";
import Api from "../../util/api";
import authApi from "../../util/authApi";
import Toast from "react-native-simple-toast";

const CustomModal = (props) => {
  const {
    onPressCross,
    isModalForDelete,
    onPressDeleteButton,
    onPressSelectEmploye,
    nameData,
  } = props;

  const [modalVisible, setModalVisible] = useState(false)
  const [hasMultipleTrue, setHasMultipleTrue] = useState('');
  const [showLoader, setLoader] = useState(false);



  const getUserDetails = async (num, item) => {
    setLoader(true);
    // let userNum
    // try {
    //   if (num.length >= 10) {
    //     let number = num.replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g, '');
    //     let hyphenRemove = number.replaceAll('-', '')
    //     console.log("hyphenRemove", hyphenRemove)
    //     let f = hyphenRemove.replaceAll(" ", "").slice(-10)
    //     console.log(f, "value")
    //     userNum = f
    //   }
    //   else {
    //     userNum = num
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
    const payload = {
      mobile: num,
      displayName: item.displayName
    };
    console.log("payload", payload)

    const { data, message } = await authApi.postDataToServer(Api.GetRegisteredUser, payload);
    console.log("res", data?.data?.company)
    setLoader(false);


    if (!data) {
      Toast.show(message);
    }
    setLoader(false);
    let res = {
      "thumbnailPath": item.thumbnailPath,
      "first_name": data?.data?.first_name,
      "last_name": data?.data?.last_name,
      "phoneNumbers": data?.data?.mobile,
      "RegisteredCompany": data?.data?.company,
      "company_id": data?.data?.company_id,
    };
    onPressSelectEmploye(res)
    setModalVisible(false)
    // if (data.data?.company == null) {
    // }
    // else {
    //   setLoader(false);
    //   let data = {
    //     "thumbnailPath": item.thumbnailPath,
    //     "displayName": fullName,

    //     "phoneNumbers":userNUm,
    //     "RegisteredCompany": companyNme,
    //   };
    //   onPressSelectEmploye(data)
    // }
  };

  const renderItem = ({ item }) => (

    <View style={globalStyles.modalView}>
      {/*  item.profile_image,item.phoneNumbers[0]?.number , item.id */}
      <TouchableOpacity
        onPress={() => {
          if (item.phoneNumbers?.length > 1) {
            setHasMultipleTrue(item)
            setModalVisible(true)
          }
          else {
            console.log(item)
            let num = item.phoneNumbers[0]?.number

            getUserDetails(num, item)
            // onPressSelectEmploye(item)
          }
        }}
      >
        <View>
          <Image
            style={globalStyles.modalImageStyle}
            source={
              item.thumbnailPath
                ? { uri: item.thumbnailPath }
                : globalImages.pro1
            }
          />
          <Text style={globalStyles.modalNameText}>
            {item && item.displayName}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (

    <Modal
      animationType="none"
      transparent={true}
      visible={true}
      backdropOpacity={1}
      backdropColor={"green"}
      hasBackdrop={false}
    >
      {showLoader && <Loader />}

      <Modal transparent={true} visible={modalVisible}>
        <Pressable
          onPress={() => {
            setModalVisible(false);
          }}
          style={{
            backgroundColor: '#000000aa',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              marginVertical: 10,
              borderRadius: 15,
              width: '50%',
              // flexDirection:'row',
              justifyContent: 'space-between'
            }}>

            {hasMultipleTrue &&
              hasMultipleTrue.phoneNumbers?.map((i) => {

                return (
                  <View>
                    <TouchableOpacity style={{ flexDirection: 'row', margin: 2, marginTop: 8 }} onPress={() => {
                      let data = {
                        "thumbnailPath": hasMultipleTrue.thumbnailPath,
                        "displayName": hasMultipleTrue.displayName
                      };
                      let item = { ...data, ...i }
                      // let number = i.number.replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g, '');
                      // let hyphenRemove = number.replaceAll('-', '')
                      // console.log("hyphenRemove", hyphenRemove)
                      // let f = hyphenRemove.replaceAll(" ", "").slice(-10)
                      // console.log(f, "value")
                      let num = i.number
                      getUserDetails(num, item)
                      setModalVisible(false)
                    }}>
                      <Text style={globalStyles.defaultText}>{i.label}
                      </Text>
                      <Text style={globalStyles.defaultText}> {i.number}
                      </Text>
                    </TouchableOpacity>

                  </View>
                )
              })}

          </View>
        </Pressable>


      </Modal>
      {isModalForDelete ? (
        <View style={globalStyles.cModalMainView}>
          <View style={globalStyles.cModalButtonView}>
            <View style={globalStyles.cModalButtonFirstView}>
              <View style={globalStyles.cModalWidthHaff}>
                <TouchableOpacity onPress={onPressCross}>
                  <Image
                    style={globalStyles.cModalButtonImageStyle}
                    source={globalImages.crossSign}
                  />
                </TouchableOpacity>
                <Text style={globalStyles.darkText}>
                  {defaultText.deleteMessage}
                </Text>
              </View>
              <View style={globalStyles.cModalButtonSecondView}>
                <TouchableOpacity onPress={onPressDeleteButton}>
                  <View style={globalStyles.cModalButtonStyle}>
                    <Text style={globalStyles.cModalButtonText1}>
                      {defaultText.delete}
                    </Text>
                    <Text style={globalStyles.cModalButtonText2}>
                      (Send to Parking Lot)
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={globalStyles.cModalMainView}>
          <View style={globalStyles.cModalListView}>
            <TouchableOpacity onPress={onPressCross}>
              <Image
                style={globalStyles.cModalListImageStyle}
                source={globalImages.crossSign}
              />
            </TouchableOpacity>
            <ScrollView>
              <View style={globalStyles.cModalListText}>
                <Text style={globalStyles.darkText}>
                  {defaultText.pushTaskMessage}
                </Text>
              </View>
              <FlatList
                data={nameData && nameData}
                renderItem={renderItem}
                numColumns={2}
                keyExtractor={(item) => item.displayName}
              />
              {nameData.length == 0 && (
                <View style={globalStyles.modalTeamError}>
                  <Text style={globalStyles.boldText}>
                    {defaultText.notRecordFound}
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      )}
    </Modal>
  );
};

export default CustomModal;


// import React, { useState } from "react";
// import { FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import defaultText from "../../helper/defaultText";
// import globalImages from "../../helper/globalImages";
// import globalStyles from "../../helper/globalStyles";

// const CustomModal = (props) => {
//   const {
//     onPressCross,
//     isModalForDelete,
//     onPressDeleteButton,
//     onPressSelectEmploye,
//     nameData,
//   } = props;
//   const [modalVisible, setModalVisible] = useState(true);

//   const renderItem = ({ item }) => (
//     console.log("item",item),
//     <View style={globalStyles.modalView}>
//       <TouchableOpacity
//         onPress={() => onPressSelectEmploye(item)}
//       >
//         <View>
//         <Image
//             style={globalStyles.modalImageStyle}
//             source={
//               item.thumbnailPath
//                 ? { uri: item.thumbnailPath }
//                 : globalImages.pro1
//             }
//           />
//           <Text style={globalStyles.modalNameText}>
//             {item.displayName}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <Modal
//       animationType="none"
//       transparent={true}
//       visible={true}
//       backdropOpacity={1}
//       backdropColor={"green"}
//       hasBackdrop={false}
//     >
//       {isModalForDelete ? (
//         <View style={globalStyles.cModalMainView}>
//           <View style={globalStyles.cModalButtonView}>
//             <View style={globalStyles.cModalButtonFirstView}>
//               <View style={globalStyles.cModalWidthHaff}>
//                 <TouchableOpacity onPress={onPressCross}>
//                   <Image
//                     style={globalStyles.cModalButtonImageStyle}
//                     source={globalImages.crossSign}
//                   />
//                 </TouchableOpacity>
//                 <Text style={globalStyles.darkText}>
//                   {defaultText.deleteMessage}
//                 </Text>
//               </View>
//               <View style={globalStyles.cModalButtonSecondView}>
//                 <TouchableOpacity onPress={onPressDeleteButton}>
//                   <View style={globalStyles.cModalButtonStyle}>
//                     <Text style={globalStyles.cModalButtonText1}>
//                       {defaultText.delete}
//                     </Text>
//                     <Text style={globalStyles.cModalButtonText2}>
//                       (Send to Parking Lot)
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </View>
//       ) : (
//         <View style={globalStyles.cModalMainView}>
//           <View style={globalStyles.cModalListView}>
//             <TouchableOpacity onPress={onPressCross}>
//               <Image
//                 style={globalStyles.cModalListImageStyle}
//                 source={globalImages.crossSign}
//               />
//             </TouchableOpacity>
//             <ScrollView>
//               <View style={globalStyles.cModalListText}>
//                 <Text style={globalStyles.darkText}>
//                   {defaultText.pushTaskMessage}
//                 </Text>
//               </View>
//               <FlatList
//                 data={nameData}
//                 renderItem={renderItem}
//                 numColumns={2}
//                 keyExtractor={(item) => item.name}
//               />
//               {nameData.length == 0 && (
//                 <View style={globalStyles.modalTeamError}>
//                   <Text style={globalStyles.boldText}>
//                     {defaultText.notRecordFound}
//                   </Text>
//                 </View>
//               )}
//             </ScrollView>
//           </View>
//         </View>
//       )}
//     </Modal>
//   );
// };

// export default CustomModal;
