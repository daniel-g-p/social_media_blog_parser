export default (monthString) => {
  return monthString === "January" || monthString === "Jan"
    ? 0
    : monthString === "February" || monthString === "Feb"
    ? 1
    : monthString === "March" || monthString === "Mar"
    ? 2
    : monthString === "April" || monthString === "Apr"
    ? 3
    : monthString === "May"
    ? 4
    : monthString === "June" || monthString === "Jun"
    ? 5
    : monthString === "July" || monthString === "Jul"
    ? 6
    : monthString === "August" || monthString === "Aug"
    ? 7
    : monthString === "September" || monthString === "Sep"
    ? 8
    : monthString === "October" || monthString === "Oct"
    ? 9
    : monthString === "November" || monthString === "Nov"
    ? 10
    : monthString === "December" || monthString === "Dec"
    ? 11
    : null;
};
