const cilt = require("../database/cilt.config");

getAll = async () => await cilt.select("*").from("tasks")
getById = async (id) => await cilt.select("*").from("mst_task").where("task_id", id);
insert = async (data) => await cilt("mst_task").insert(data);
update = async (id, data) => await cilt("mst_task").where("task_id", id).update(data);
deleteData = async (id) => await cilt("mst_task").where("task_id", id).del()

getAllByDate = async (month, year) => await cilt.select("*").from("tasks").where(cilt.raw(`DATE_FORMAT(date, '%m-%Y')`), `${month}-${year}`)

getCountTaskActivityByTaskId = async (id) => await cilt.select(cilt.raw(
    `mt.date, mta.task_id, mar.name AS area, COUNT(mta.task_activity_id) AS total_activity, COUNT(mta.condition) AS checklist
    FROM mst_task_activity mta
    LEFT JOIN mst_task mt ON mta.task_id = mt.task_id
    LEFT JOIN mst_area mar ON mt.area_id = mar.area_id
    WHERE mta.task_id = ${id}`
))

module.exports = {
    getAll,
    getById,
    insert,
    update,
    deleteData,
    getAllByDate,
    getCountTaskActivityByTaskId,
}