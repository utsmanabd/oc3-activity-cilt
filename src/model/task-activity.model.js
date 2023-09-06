const cilt = require("../database/cilt.config");

getAll = async () => await cilt.select("*").from("mst_task_activity")
getById = async (id) => await cilt.select("*").from("mst_task_activity").where("task_activity_id", id);
insert = async (data) => await cilt("mst_task_activity").insert(data);
update = async (id, data) => await cilt("mst_task_activity").where("task_activity_id", id).update(data);
deleteData = async (id) => await cilt("mst_task_activity").where("task_activity_id", id).del()

module.exports = {
    getAll,
    getById,
    insert,
    update,
    deleteData,
}