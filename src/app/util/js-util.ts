export function dateToDateString(today: Date) {
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!    
  var yyyy = today.getFullYear();

  return yyyy + '-' + (mm<10 ? '0' : '') + mm + '-' + (dd<10 ? '0' : '') + dd;
}