let arc = require('@architect/functions')

module.exports = async function getNotes(id) {
  let data = await arc.tables()
  return data.notes.scan({})
}