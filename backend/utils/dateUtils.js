const moment = require('moment');

exports.formatDate = (date) => moment(date).format('YYYY-MM-DD');