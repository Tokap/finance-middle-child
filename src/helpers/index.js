const R = require('ramda')

const tap = (item) => {
  console.log('Tap_tap: ', item)
  return item
}

module.exports = {
  tap
}
