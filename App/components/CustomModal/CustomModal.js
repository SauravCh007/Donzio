import React, { useState } from "react";
import { FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import defaultText from "../../helper/defaultText";
import globalImages from "../../helper/globalImages";
import globalStyles from "../../helper/globalStyles";

const CustomModal = (props) => {
  const {
    onPressCross,
    isModalForDelete,
    onPressDeleteButton,
    onPressSelectEmploye,
    nameData,
  } = props;
  const [modalVisible, setModalVisible] = useState(true);

  const renderItem = ({ item }) => (
  
    <View style={globalStyles.modalView}>
      {/*  item.profile_image,item.phoneNumbers[0]?.number , item.id */}
      <TouchableOpacity
        onPress={() => onPressSelectEmploye(item)}
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
