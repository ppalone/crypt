module.exports = {
  dateFormat: (isoString) => {
    // console.log(isoString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    let date = new Date(isoString);

    let D = date.getDate();
    let Month = months[date.getMonth()];
    let Yr = date.getFullYear();

    // Format 17 Sept, 2020
    return `${D} ${Month}, ${Yr}`;
  },
  // https://www.ibm.com/support/knowledgecenter/SSLVMB_sub/statistics_reference_project_ddita/spss/base/syn_date_and_time_date_time_formats.html
  timeFormat: (isoString) => {
    // Format 12:03 AM, Thurs, 17 Sept, 2020
    const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
    let date = new Date(isoString);

    let h = (date.getHours() + 24) % 12 || 12;
    let hh = h < 10 ? "0" + h : h;
    let suffix = date.getHours() < 12 ? "AM" : "PM";
    let mm =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let day = days[date.getDay()];

    return `${hh}:${mm} ${suffix}, ${day}`;
  },
  compareTime: (str1, str2) => {
    let date1 = new Date(str1);
    let date2 = new Date(str2);

    return date1.getTime() === date2.getTime();
  },
};
