import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import Dates from "./Dates";

const defaultProps = {
  showDaysBeforeCurrent: 14,
  showDaysAfterCurrent: 14,
  dateStatusData: [],
};

export default function Calendars(props) {
  const {
    currentDate,
    showDaysBeforeCurrent,
    showDaysAfterCurrent,
    dateStatusData,
  } = { ...defaultProps, ...props };
  const [allDatesHaveRendered, setAllDatesHaveRendered] = useState(false);
  const [currentDateIndex, setCurrentDateIndex] = useState(
    showDaysBeforeCurrent
  );
  const [visibleMonths, setVisibleMonths] = useState([]);
  const [visibleYears, setVisibleYears] = useState([]);
  const [dates, setDates] = useState([]);
  const [dayWidths, setDayWidths] = useState(0);
  const [scrollPositionX, setScrollPositionX] = useState(0);
  const screenWidth = Dimensions.get("window").width;
  const formatMonth = (date) => date.format("MMMM");
  const formatYear = (date) => date.format("YYYY");
  const _scrollView = useRef(null);
  const dayWidth = 60;

  const getDates = () => {
    // Go `showDaysBeforeCurrent` ago before today or custom `currentDate`
    const startDay = moment(currentDate || undefined).subtract(
      showDaysBeforeCurrent + 1,
      "days"
    );
    const totalDaysCount = showDaysBeforeCurrent + showDaysAfterCurrent + 1;
    return [...Array(totalDaysCount)].map((_) =>
      startDay.add(1, "day").clone()
    );
  };

  useEffect(() => {
    let allDates = getDates();
    let notWeekend = [];
    // allDates.map((sat) => {
    //   var d = new Date(sat).getDay();
    //   if (Number(d) !== Number(0) && Number(d) !== Number(6)) {
    //     notWeekend.push(sat);
    //   }
    // });

    const dws = {};
    allDates.map((dt, dti) => {
      dws[Number(dti)] = dayWidth;
      // var todayDate = new Date();
      // var satDate = new Date(dt);
      // if (todayDate.toDateString() === satDate.toDateString()) {
      //   setCurrentDateIndex(dti);
      // }
      return dt;
    });
    // Array(allDates.length).map((_, index) => { dws[index] = dayWidth; return _; })
    setDayWidths(dws);
    setDates(allDates);
  }, []);
  const getVisibleDates = () => {
    if (!dayWidths) {
      return;
    }

    let datePositionX = 0;
    let firstVisibleDateIndex = undefined;
    let lastVisibleDateIndex = undefined;

    // Iterate through `dayWidths` to  $FlowFixMe
    Object.values(dayWidths).some((width, index) => {
      if (
        firstVisibleDateIndex === undefined && // not set yet
        datePositionX >= scrollPositionX // first date visible
      ) {
        firstVisibleDateIndex = index > 0 ? index - 1 : index;
      }

      if (
        lastVisibleDateIndex === undefined && // not set yet
        datePositionX >= scrollPositionX + screenWidth // first date not visible behind the right edge
      ) {
        lastVisibleDateIndex = index;
      }

      // Increment date position by its width for the next iteration
      datePositionX += width;

      // return true when both first and last visible days found to break out of loop
      return !!(firstVisibleDateIndex && lastVisibleDateIndex);
    });

    // Return a subset of visible dates only
    return dates.slice(firstVisibleDateIndex, lastVisibleDateIndex);
  };

  const getVisibleMonthAndYear = () => {
    if (!visibleMonths || !visibleYears) {
      if (dates) {
        const firstDate = dates[0];
        return `${formatMonth(firstDate)}, ${formatYear(firstDate)}`;
      }
      return undefined;
    }

    if (visibleYears.length === 1) {
      return `${visibleMonths.join(" – ")},  ${visibleYears[0]}`;
    }
    return visibleMonths
      .map((month, index) => `${month}, ${visibleYears[index]}`)
      .join(" – ");
  };

  const updateVisibleMonthAndYear = () => {
    if (!allDatesHaveRendered) {
      return;
    }

    const visibleDates = getVisibleDates();

    if (!visibleDates) {
      return;
    }

    let vMonths = [];
    let vYears = [];

    visibleDates.forEach((date) => {
      const month = formatMonth(date);
      const year = formatYear(date);
      if (!vMonths.includes(month)) {
        vMonths.push(month);
      }
      if (!vYears.includes(year)) {
        vYears.push(year);
      }
    });
    setVisibleMonths(vMonths);
    setVisibleYears(vYears);
  };

  const scrollToCurrentDay = () => {
    // Make sure we have all required values
    if (
      !allDatesHaveRendered ||
      currentDateIndex === undefined ||
      currentDateIndex === null
    ) {
      return;
    }

    // Put all day width values into a simple array $FlowFixMe
    const dayWidthsArray = Object.values(dayWidths);
    // Total width all days take
    const allDaysWidth = dayWidthsArray.reduce(
      (total, width) => width + total,
      0
    );
    const currentDayWidth = dayWidthsArray[currentDateIndex];
    const minX = 0;
    const maxX = allDaysWidth > screenWidth ? allDaysWidth - screenWidth : 0; // no scrolling if there's nowhere to scroll
    let scrollToX;
    scrollToX =
      dayWidthsArray
        .slice(0, currentDateIndex + 1)
        .reduce((total, width) => width + total, 0) -
      screenWidth / 2 -
      currentDayWidth / 2;

    if (scrollToX < minX) {
      scrollToX = 0;
    } else if (scrollToX > maxX) {
      scrollToX = maxX;
    }
    if (_scrollView) _scrollView.current.scrollTo({ x: scrollToX });
  };

  const onSelectDay = async (index) => {
    const { onSelectDate } = props;
    setCurrentDateIndex(index);
    if (onSelectDate) onSelectDate(dates[index]);
  };

  useEffect(() => {
    scrollToCurrentDay();
  }, [currentDateIndex, allDatesHaveRendered]);

  useEffect(() => {
    setTimeout(() => {
      setAllDatesHaveRendered(true);
    }, 2500);
  }, []);

  useEffect(() => {
    updateVisibleMonthAndYear();
  }, [allDatesHaveRendered]);

  const onScroll = ({ nativeEvent }) => {
    setScrollPositionX(nativeEvent.contentOffset.x);
  };
  const visibleMonthAndYear = getVisibleMonthAndYear();

  return (
    <>
      <View>
        <ScrollView
          ref={_scrollView}
          horizontal={true} // Enable horizontal scrolling
          showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicators
          automaticallyAdjustContentInsets={false} // Do not adjust content automatically
          scrollEventThrottle={100}
          onScroll={onScroll}
        >
          <Dates
            dates={dates}
            currentDateIndex={currentDateIndex}
            onSelectDay={onSelectDay}
          />
        </ScrollView>
      </View>
    </>
  );
}
