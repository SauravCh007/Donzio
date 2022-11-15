import React from "react";
import { View } from "react-native";
import globalStyles from "../../helper/globalStyles";
import Date from "./Date";
const defaultProps = {
  dateStatusData: [],
};

export default function Dates(props) {
  const { currentDateIndex, dates, onSelectDay, dateStatusData } = {
    ...defaultProps,
    ...props,
  };

  const getDateStatuses = (date) => {
    const result = dateStatusData.filter((ds) => {
      return date.format("YYYY-MM-DD") === ds.updated_at;
    });
    
    if (result && result.length) {
      return result[0].WorkStatus;
    }
    return [];
  };

  return (
    <>
      <View style={globalStyles.row}>
        {dates.map((date, index) => (
          <View key={index}>
            <Date
              date={date}
              index={index}
              isActive={index === currentDateIndex}
              onPress={onSelectDay}
              key={index}
              // jobTypes={getDateStatuses(date)}
            />
          </View>
        ))}
      </View>
    </>
  );
}
