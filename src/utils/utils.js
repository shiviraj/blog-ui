import moment from 'moment'

const formatDate = (date) => moment(date).local().format('MMM DD, YYYY')

const formatDateTime = (date) => moment(date).local().format('MMM DD, YYYY hh:mm A')

export { formatDate, formatDateTime }
