import moment from 'moment'

const formatDate = date => {
  return moment(date).format('MMM DD, YYYY')
}

const formatDateTime = date => {
  return moment(date).format('MMM DD, YYYY hh:mm A')
}

export { formatDate, formatDateTime }
