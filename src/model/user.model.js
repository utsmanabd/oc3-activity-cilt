const cilt = require("../database/cilt.config")

getAll = async () => await cilt.select('role_id', 'user_id', 'area_id', 'nik', 'email', 'name', 'photo', 'role_name', 'role_detail', 'level', 'area').from('users')
getByNik = async (nik) => await cilt.select('role_id', 'nik', 'user_id', 'area_id', 'name', 'photo', 'role_name', 'role_detail', 'level', 'area').from('users').where('nik', nik)
insert = async (data) => await cilt('mst_user').insert(data)
updateUser = async (id, data) => await cilt('mst_user').where('user_id', id).update(data)
deleteUser = async (id) => await cilt('mst_user').where('user_id', id).del()

getAllRole = async () => await cilt('*').from("mst_user_role").where("is_removed", 0).orderBy("role_name")
getAllByNik = async (nik) => await cilt.select("*").from("mst_user").where("nik", nik)

module.exports = {
    getAll,
    getByNik,
    insert,
    updateUser,
    deleteUser,
    getAllRole,
    getAllByNik
}