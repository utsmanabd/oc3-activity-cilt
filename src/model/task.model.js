const cilt = require("../database/cilt.config");

getAll = async () => await cilt.select("*").from("mst_task")
getById = async (id) => await cilt.select("*").from("mst_task").where("task_id", id);
insert = async (data) => await cilt("mst_task").insert(data);
update = async (id, data) => await cilt("mst_task").where("task_id", id).update(data);
deleteData = async (id) => await cilt("mst_task").where("task_id", id).del()

module.exports = {
    getAll,
    getById,
    insert,
    update,
    deleteData,
}