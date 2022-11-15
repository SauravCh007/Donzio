import React from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const Calender = (props) => {
    const {markedDates}=props
  return (
    <View>
        <Calendar
            //onDayPress={(day)=>onPressDay(day)}
            markedDates={markedDates}
        />
    </View>
  );
};

export default Calender;
