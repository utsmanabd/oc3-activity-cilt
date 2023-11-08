const cilt = require("../database/cilt.config");

getAll = async () => await cilt.select("*").from("mst_area").where("is_removed", 0).where(cilt.raw("area_id > 0"))
getById = async (id) => await cilt.select("*").from("mst_area").where("area_id", id);
insert = async (data) => await cilt("mst_area").insert(data);
update = async (id, data) => await cilt("mst_area").where("area_id", id).update(data);
deleteData = async (id) => await cilt("mst_area").where("area_id", id).del()

module.exports = {
    getAll,
    getById,
    insert,
    update,
    deleteData,
}