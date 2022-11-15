import { Component } from "react";

class CustomFunctions extends Component {
  jsonParse = (jsonString) => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return jsonString;
    }
  };

  getTime(dateTime) {
    //eslint-disable-line
    const today = new Date(dateTime);
    const time =
      (today.getHours() % 12 || 12) +
      ":" +
      (today.getMinutes() < 10 ? "0" : "") +
      today.getMinutes();
    const ampm = today.getHours() >= 12 ? "PM" : "AM";
    return time + " " + ampm;
  }

  getTimeHours(dateTime) {
    //eslint-disable-line
    const today = new Date(dateTime);
    const time = (today.getHours() % 12 || 12) + "." + today.getMinutes();
    const ampm = today.getHours() >= 12 ? "PM" : "AM";
    return time;
  }

  cleanObjects = (obj) => {
    return Object.entries(obj).reduce(
      (a, [k, v]) => (v || v === false || v === 0 ? ((a[k] = v), a) : a),
      {}
    );
  };
}

export default new CustomFunctions();
