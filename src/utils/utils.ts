import moment from 'moment'
import { Integer } from './extensions'

const formatDate = (date: string): string => moment(date).local().format('MMM DD, YYYY')

const formatDateTime = (date: string): string => moment(date).local().format('MMM DD, YYYY hh:mm A')
const getNumbersFrom1 = (length: number): number[] => {
  return new Array(length).fill('').map((_str, index) => index + Integer.ONE)
}

export { formatDate, formatDateTime, getNumbersFrom1 }
