const cilt = require("../database/cilt.config");

getAll = async () => await cilt.select("*").from("mst_activity")
getById = async (id) => await cilt.select("*").from("mst_activity").where("activity_id", id);
insert = async (data) => await cilt("mst_activity").insert(data);
update = async (id, data) => await cilt("mst_activity").where("activity_id", id).update(data);
deleteData = async (id) => await cilt("mst_activity").where("activity_id", id).del()

module.exports = {
    getAll,
    getById,
    insert,
    update,
    deleteData,
}