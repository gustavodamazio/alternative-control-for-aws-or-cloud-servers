import { format } from 'date-fns'
import { ValueGetterParams } from 'ag-grid-community'

export function GridFormatDate<T = any>(params: ValueGetterParams, key: keyof T): string {
  return format(new Date(params.data[key]), 'dd/MM/yyyy HH:mm')
}
