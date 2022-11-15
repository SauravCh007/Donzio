import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Date(props) {
  const getContainerStyle = () => ({
    ...styles.container,
    ...(props.isActive ? styles.containerActive : {}),
  });

  const getDayStyle = () => ({
    ...styles.text,
    ...styles.day,
    ...(props.isActive ? styles.textActive : {}),
  });

  const getDateStyle = () => ({
    ...styles.text,
    ...styles.date,
    ...(props.isActive ? styles.textActive : {}),
  });

  // Call `onPress` passed from the parent component when date is pressed
  const onPress = () => {
    const { index, onPress } = props;
    onPress(index);
  };

  const { date, jobTypes } = props;
  const getType = (jobType) => {
    return String(jobType).replace(" ", "").toLowerCase();
  };
  return (
    <>
      <TouchableOpacity style={getContainerStyle()} onPress={onPress}>
        <Text style={getDayStyle()}>{date.format("ddd").toUpperCase()}</Text>
        <Text style={getDateStyle()}>{date.format("DD")}</Text>
        <View style={props.isActive ? styles._dot : {}}></View>
        <View style={styles.dotContainer}>
          {jobTypes &&
            jobTypes.length > 0 &&
            jobTypes.map((type, typeIndex) => (
              <View
                style={[styles.dot, styles[getType(type)]]}
                key={`${getType(type)}-${typeIndex}`}
              />
            ))}
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = {
  container: {
    width: 60,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  containerActive: {
    borderBottomColor: "blue",
  },
  day: {
    fontSize: 12,
  },
  date: {
    fontSize: 14,
  },
  text: {
    color: "black",
    textAlign: "center",
    marginTop: 15,
  },
  textActive: {
    color: "#0795FF",
  },
  _dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "#0795FF",
    alignSelf: "center",
    marginTop: 5,
  },
  dot: {
    borderWidth: 1,
    height: 5,
    width: 5,
    backgroundColor: "red",
    borderRadius: 10,
    borderColor: "red",
    margin: 1,
  },
  dotContainer: {
    flexDirection: "row",
    alignSelf: "center",
    height: 5,
  },
  offered: {
    backgroundColor: "orange",
    borderColor: "orange",
  },
  offline: {
    backgroundColor: "#cccccc",
    borderColor: "#cccccc",
  },
  online: {
    backgroundColor: "blue",
    borderColor: "blue",
  },
  scheduled: {
    backgroundColor: "blue",
    borderColor: "blue",
  },
  unscheduled: {
    backgroundColor: "#cccccc",
    borderColor: "#cccccc",
  },
  completed: {
    backgroundColor: "green",
    borderColor: "green",
  },
  inprogress: {
    backgroundColor: "yellow",
    borderColor: "yellow",
  },
  //IF WANTED TO ADD NEW STATUS IN IT ADD NEW STYLE WITH THAT NAME HERE e.g : paused!!
};
