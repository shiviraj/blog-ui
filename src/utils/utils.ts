import moment from 'moment'
import { Integer } from './extensions'

const formatDate = (date: Date, format?: string): string => {
  return moment(date)
    .local()
    .format(format ?? 'MMM DD, YYYY')
}

const formatDateTime = (date: Date): string => moment(date).local().format('MMM DD, YYYY hh:mm A')
const getNumbersFrom1 = (length: number): number[] => {
  return new Array(length).fill('').map((_str, index) => index + Integer.ONE)
}

export { formatDate, formatDateTime, getNumbersFrom1 }
