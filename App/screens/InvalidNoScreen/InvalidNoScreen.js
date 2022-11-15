import React, { Fragment } from "react";
import { View, Text, SafeAreaView, ScrollView, Image ,Linking } from "react-native";
import globalStyles from "../../helper/globalStyles";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import defaultText from "../../helper/defaultText";
import globalImages from "../../helper/globalImages";

const InvalidNoScreen = (props) => {

  const supportedURL = "https://donzio.com";

  const onCallUrl = async( url ) => {
        await Linking.openURL(url);
  };

  return (
    <Fragment>
      <SafeAreaView style={globalStyles.fragmentStyle_1} />
      <SafeAreaView style={globalStyles.topMainContainer}>
        <View>
          <CustomHeader
            headerTitle={defaultText.signIn}
            onPressDrawer={() => props.navigation.openDrawer()}
            //showDrawerIcon={true}
          />
        </View>
        <ScrollView style={{height:'100%'}}>
          <View style={globalStyles.invalidNoTextView}>
            <Text style={globalStyles.invalidNoText}>
              {defaultText.invalidTextNew} 
              <Text 
                style={{color:'blue'}} 
                onPress={()=>onCallUrl(supportedURL)}
              > donzio.com </Text> 
              {defaultText.invalidTextNew1}
            </Text>
          </View>

          <View style={globalStyles.mt_20per}>
            <Text
              onPress={() => {
                props.navigation.replace("LoginScreen");
              }}
              style={globalStyles.textAlignCenter}
            >
              Back
            </Text>
          </View>
        </ScrollView>
        <View style={globalStyles.invalidNoBottom}>
          <Image
            style={globalStyles.invalidNoImageStyle}
            source={globalImages.clock}
          />
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default InvalidNoScreen;
