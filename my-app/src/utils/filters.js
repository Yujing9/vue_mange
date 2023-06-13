const dayjs = require("dayjs");
//import dayjs from 'dayjs' // ES 2015
// import dayjs from "dayjs";
dayjs("YYYY-MM-DD");
const filterTime = (value, format = "YYYY-MM-DD") => {
  if (!isNull(value)) {
    value = parseInt(value) * 1000;
    return dayjs(value).format(format);
  } else {
    return "--";
  }
};

export const isNull = (date) => {
  if (!date) return true;
  if (JSON.stringify(date) === "{}") return true;
  if (JSON.stringify(date) === "[]") return true;
};

export default (app) => {
  app.config.globalProperties.$filters = {
    filterTime
  };
};
