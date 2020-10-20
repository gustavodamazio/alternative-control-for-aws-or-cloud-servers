import { parse } from 'date-fns'

export function GridDateComparator(date1: string, date2: string) {
  var date1Number = parse(date1, 'dd/MM/yyyy HH:mm', new Date()).getTime();
  var date2Number = parse(date2, 'dd/MM/yyyy HH:mm', new Date()).getTime();
  if (date1Number === null && date2Number === null) {
    return 0;
  }
  if (date1Number === null) {
    return -1;
  }
  if (date2Number === null) {
    return 1;
  }
  return date1Number - date2Number;
}
