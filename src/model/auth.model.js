const cilt = require("../database/cilt.config")

login = async (nik) => await cilt.select('*').from('users').where('nik', nik)
register = async (data) => await cilt('users').insert(data)

module.exports = {
    login,
    register
}