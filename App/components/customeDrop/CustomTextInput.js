//import liraries
import React, { Component, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
const up = <Image source={require('../../assets/up.png')} style={{ width: 20, height: 20, resizeMode: "contain", marginLeft: 30 }} />
const down = <Image source={require('../../assets/down.png')} style={{ width: 30, height: 30, resizeMode: "contain", marginLeft: 30 }} />

// create a component
const CustomTextInput = ({
  icon,
  rightIcon,
  country,
  halfDowwn,
  onPress,
  type = 'input',
  placeholder,
  value = null,
  onChangeText,
  onSelect = () => { },
  myDropStyle = {},
  myDropDownViewStyle = {},
  dropView = {},
  loading = false,
  loaderColor = '',
  isErrors,
  data,
  isTouched,
  onBlur,
  Inlinestyle,
  iconType = 'image',
  placeholderTextColor,
  keyboardType,
  secureTextEntry,
  maxLength,
  circle,
  lable,
  lableStyle,
  ...props
}) => {

  const [ShowOption, setShowOption] = useState(false);
  // console.log("Drop Down Data", placeholder);
  const onSelectedItem = (item) => {
    setShowOption(false);
    onSelect(item);
  };

  return (
    <>
      <Text style={[styles.labeltxt, { ...lableStyle }]}>{lable}</Text>
      {type === 'dropdown' ? (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              setShowOption(!ShowOption);
            }}
            style={[styles.dropContainer, { ...myDropStyle }]}
          >
            {loading ? (
              <View style={{ ...myDropStyle, paddingVertical: 0 }}>
                <ActivityIndicator
                  size="small"
                  color={'blue'}
                  style={{ alignSelf: 'center' }}
                />
              </View>
            ) : (
              <>
                <View style={styles.contentRow}>
                  {icon ? (
                    iconType === 'image' ? (
                      <Image
                        source={icon}
                        style={{ width: 20, height: 20, resizeMode: 'contain', marginHorizontal: 5 }}
                      />
                    ) : (
                      <TouchableOpacity style={styles.icon}>
                        {icon}
                      </TouchableOpacity>
                    )
                  ) : null}
                  <Text numberOfLines={1} style={styles.selectedText}>
                    {value && Object.keys(value).length ? value.label || value.reason : placeholder}
                  </Text>
                </View>
                {ShowOption == false ? (
                  down
                ) : (
                  up
                )}
              </>
            )}
          </TouchableOpacity>
          <View
            style={[
              styles.myView,
              {
                // height: ShowOption ? BaseStyle.DEVICE_WIDTH * 0.4 : null,
                ...dropView,
              },
            ]}
          >
            {ShowOption == true ? (
              <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{ height: 100 }}>
                {data?.map((item) => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => onSelectedItem(item)}
                      style={[
                        styles.itemBtn,
                        {
                          backgroundColor: value != null && item.value == value.value
                            ? "#fffaec"
                            : '#69696950',
                          borderWidth: value != null && item.value == value.value ? 1 : 0,
                          borderColor:
                            value != null && item.value == value.value
                              ? 'blue'
                              : '#696969',
                          ...myDropDownViewStyle,
                        },
                      ]}
                    >
                      {value != null && item.value == value.value ? (
                        <View style={styles.circle}>
                          <Image source={require('../../assets/checkRank.png')} style={{ width: 20, height: 20, resizeMode: "contain" }} />
                        </View>
                      ) : null}
                      <Text
                        key={item.value}
                        style={{
                          marginLeft: 8,
                          fontWeight: value != null && item.value == value.value ? 'bold' : null,
                          fontSize: 14,
                          color:
                            value != null && item.value == value.value ? '#000' : '#696969',
                        }}
                      >
                        {item.label || item.reason}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            ) : null}
          </View>
        </View>
      ) : type == 'halfDrop' ? (
        <TouchableOpacity style={[styles.halfDrop, { ...halfDowwn }]}>
          <Text style={{ color: '#80A6B4' }}>{country}</Text>
          <Ionicons name="chevron-down" color={'white'} size={20} />
        </TouchableOpacity>
      ) :

        <>
          <Text style={{ color: '#fff', textAlign: 'left' }}>{lable}</Text>

          <View style={[styles.TextInput, { ...Inlinestyle }]}>
            {icon ? (
              iconType === 'image' ? (
                <Image
                  source={icon}
                  style={{ width: 20, height: 20, resizeMode: 'contain', marginHorizontal: 5 }}
                />
              ) : (
                <TouchableOpacity style={styles.icon}>
                  {icon}
                </TouchableOpacity>
              )
            ) : null}

            <TextInput
              style={{ width: rightIcon ? '75%' : '80%', }}
              secureTextEntry={type == 'password' ? true : false}
              placeholder={placeholder}
              value={value}
              placeholderTextColor={placeholderTextColor}
              keyboardType={keyboardType}
              onChangeText={text => {
                onChangeText(text);
              }}
              maxLength={maxLength}
              {...props}
            />
            {rightIcon && rightIcon}
          </View>
        </>
      }
      {isErrors && isTouched && (
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            paddingVertical: 5,
          }}>
          <Text style={{ fontSize: 12, color: 'orange' }}>{isErrors}</Text>
        </View>
      )}

    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  TextInput: {
    width: '100%',
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8
  },
  halfDrop: {
    width: '28%',
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  icon: {
    marginHorizontal: 5
  },
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 12,
    paddingHorizontal: 10
  },
  dropContainer: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#69696950',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -15
  },
  itemBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 300,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  imageStyle: {
    height: 20,
    width: 20,
    backgroundColor: "green",
    resizeMode: 'contain',
    marginRight: 15,
  },
  circle: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'green'
  },
  myView: {
    width: '80%',
  },
  selectedText: {
    width: '75%',
    // ...FONTFAMILY.RubikRegular,
    fontSize: 14,

    color: '#000',
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  // labeltxt:{color: '#fff', textAlign: 'left', marginVertical: 5}
});

//make this component available to the app
export default CustomTextInput;


