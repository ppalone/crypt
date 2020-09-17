module.exports = function (isoString) {
  // console.log(isoString);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  let date = new Date(isoString);

  let dd = date.getDate();
  let mm = months[date.getMonth()]
  let yy = date.getFullYear();

  // Format 17 Sept, 2020
  return `${dd} ${mm}, ${yy}`
}
