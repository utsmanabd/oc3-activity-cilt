const cilt = require("../database/cilt.config");

getAll = async () => await cilt.select("*").from("mst_machine_area")
getById = async (id) => await cilt.select("*").from("mst_machine_area").where("m_area_id", id);
insert = async (data) => await cilt("mst_machine_area").insert(data);
update = async (id, data) => await cilt("mst_machine_area").where("m_area_id", id).update(data);
deleteData = async (id) => await cilt("mst_machine_area").where("m_area_id", id).del()

module.exports = {
    getAll,
    getById,
    insert,
    update,
    deleteData,
}