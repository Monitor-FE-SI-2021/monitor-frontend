export const fields = [
  { name: "avgRamUsage", label: "Average RAM Usage", inputType: 'number' },
  { name: "avgGpuUsage", label: "Average GPU Usage", inputType: 'number' },
  { name: "quarterlyCpuUsage", label: "Quarterly CPU Usage", inputType: 'number' },
  { name: "diskUtilization", label: "Disk Utilization", inputType: 'number' },
  { name: "name", label: "Name" },
  { name: "location", label: "Location" },
  { name: "latitude", label: "Latitude", inputType: 'number' },
  { name: "longitude", label: "Longitude", inputType: 'number' },
  { name: "status", label: "Status" },
  //{ name: "lastTimeOnline", label: "Last Time Online" },
  //{ name: "timeLog", label: "Time Log" },
  //{ name: "groupName", label: "Group Name" },
];

export const frequencies = [
  { name: "noEmail", label: "No email" },
  { name: "day", label: "Daily" },
  { name: "week", label: "Weekly" },
  { name: "month", label: "Monthly" },
  { name: "year", label: "Yearly" },
];

export const frequenciesFilter = [
  { name: "noFilter", label: "No filter" },
  { name: "Daily", label: "Daily" },
  { name: "Weekly", label: "Weekly" },
  { name: "Monthly", label: "Monthly" },
  { name: "Yearly", label: "Yearly" },
];

export const devices = [
  { name: "1", label: "dev 1" },
  { name: "2", label: "dev 2" },
  { name: "3", label: "dev 3" },
  { name: "4", label: "dev 4" },
  { name: "5", label: "dev 5" },
];

export const options = [
  {
      label: "Daily",
      value: "daily",
  },
  {
      label: "Weekly",
      value: "weekly",
  },
  {
      label: "Monthly",
      value: "monthly",
  },
  {
      label: "Yearly",
      value: "yearly",
  },
];

export const days = [
  {
      label: "Monday",
      value: "Mon",
  },
  {
      label: "Tuesday",
      value: "Tue",
  },
  {
      label: "Wednesday",
      value: "Wed",
  },
  {
      label: "Thursday",
      value: "Thu",
  },
  {
      label: "Friday",
      value: "Fri",
  },
  {
      label: "Saturday",
      value: "Sat",
  },
  {
      label: "Sunday",
      value: "Sun",
  },
];

export const months = [
  {
      label: "January",
      value: "january",
      days: 31,
  },
  {
      label: "February",
      value: "february",
      days: 28,
  },
  {
      label: "March",
      value: "march",
      days: 31,
  },
  {
      label: "April",
      value: "april",
      days: 30,
  },
  {
      label: "May",
      value: "may",
      days: 31,
  },
  {
      label: "June",
      value: "june",
      days: 30,
  },
  {
      label: "July",
      value: "july",
      days: 31,
  },
  {
      label: "August",
      value: "august",
      days: 31,
  },
  {
      label: "September",
      value: "september",
      days: 30,
  },
  {
      label: "October",
      value: "october",
      days: 31,
  },
  {
      label: "November",
      value: "november",
      days: 30,
  },
  {
      label: "December",
      value: "december",
      days: 31,
  },
];

export const times = [
  {
      label: "12:00 am",
      value: "00:00:00",
  },
  {
      label: "1:00 am",
      value: "01:00:00",
  },
  {
      label: "2:00 am",
      value: "02:00:00",
  },
  {
      label: "3:00 am",
      value: "03:00:00",
  },
  {
      label: "4:00 am",
      value: "04:00:00",
  },
  {
      label: "5:00 am",
      value: "05:00:00",
  },
  {
      label: "6:00 am",
      value: "06:00:00",
  },
  {
      label: "7:00 am",
      value: "07:00:00",
  },
  {
      label: "8:00 am",
      value: "08:00:00",
  },
  {
      label: "9:00 am",
      value: "09:00:00",
  },
  {
      label: "10:00 am",
      value: "10:00:00",
  },
  {
      label: "11:00 am",
      value: "11:00:00",
  },
  {
      label: "12:00 pm",
      value: "12:00:00",
  },
  {
      label: "1:00 pm",
      value: "13:00:00",
  },
  {
      label: "2:00 pm",
      value: "14:00:00",
  },
  {
      label: "3:00 pm",
      value: "15:00:00",
  },
  {
      label: "4:00 pm",
      value: "16:00:00",
  },
  {
      label: "5:00 pm",
      value: "17:00:00",
  },
  {
      label: "6:00 pm",
      value: "18:00:00",
  },
  {
      label: "7:00 pm",
      value: "19:00:00",
  },
  {
      label: "8:00 pm",
      value: "20:00:00",
  },
  {
      label: "9:00 pm",
      value: "21:00:00",
  },
  {
      label: "10:00 pm",
      value: "22:00:00",
  },
  {
      label: "11:00 pm",
      value: "23:00:00",
  },
];

export const queryFields = [
    { name: "(SELECT avg(RamUsage) FROM DEVICE_STATUS_LOG dsl where BEGIN_PLACEHOLDER < dsl.TimeStamp and dsl.TimeStamp < END_PLACEHOLDER and dsl.DeviceId = d.DeviceId)", label: "Average RAM Usage", inputType: 'number' },
    { name: "(SELECT avg(GPUUsage) FROM DEVICE_STATUS_LOG dsl where BEGIN_PLACEHOLDER < dsl.TimeStamp and dsl.TimeStamp < END_PLACEHOLDER and dsl.DeviceId = d.DeviceId))", label: "Average GPU Usage", inputType: 'number' },
    { name: "(SELECT avg(CpuUsage) FROM DEVICE_STATUS_LOG dsl where BEGIN_PLACEHOLDER < dsl.TimeStamp and dsl.TimeStamp < END_PLACEHOLDER and dsl.DeviceId = d.DeviceId))", label: "Quarterly CPU Usage", inputType: 'number' },
    { name: "(SELECT avg(HDDUsage) FROM DEVICE_STATUS_LOG dsl where BEGIN_PLACEHOLDER < dsl.TimeStamp and dsl.TimeStamp < END_PLACEHOLDER and dsl.DeviceId = d.DeviceId))", label: "Disk Utilization", inputType: 'number' },
    { name: "d.name", label: "Name" },
    { name: "d.location", label: "Location" },
    { name: "d.latitude", label: "Latitude", inputType: 'number' },
    { name: "d.longitude", label: "Longitude", inputType: 'number' },
    { name: "d.status", label: "Status" },
    //{ name: "d.lastTimeOnline", label: "Last Time Online" },
    //{ name: "d.timeLog", label: "Time Log" },
    { name: "d.groupName", label: "Group Name" },
];

