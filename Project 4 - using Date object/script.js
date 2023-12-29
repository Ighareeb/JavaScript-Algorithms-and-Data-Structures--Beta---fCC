// Assign variables for DOM elements
const currentDateParagraph = document.getElementById('current-date'); //<p>
const dateOptionsSelectElement = document.getElementById('date-options'); //<select>
//create date object using constructor
const date = new Date();
// console.log(date); Fri Dec 29 2023 06:11:32 GMT+0400 (Gulf Standard Time)
// Date object methods (get date, time in different formats)
const day = date.getDate(); //# 1-31
const month = date.getMonth() + 1; //# 0-11 *{zero indexed so use + 1}*
const year = date.getFullYear(); //#yyyy
const hours = date.getHours(); //#0-23 {zero indexed; 0 = midnight}
const minutes = date.getMinutes(); //#0-59 {starts from 0}

//Option 1
const formattedDate = `${day}-${month}-${year}`;
// console.log(formattedDate); //29 - 12 - 2023;
currentDateParagraph.textContent = formattedDate;
//eventListener for <select>
dateOptionsSelectElement.addEventListener('change', () => {});
