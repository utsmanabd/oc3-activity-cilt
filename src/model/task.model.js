const cilt = require("../database/cilt.config");

getAll = async () => await cilt.select("*").from("mst_task").where("is_removed", 0)
getById = async (id) => await cilt.select("*").from("mst_task").where("task_id", id);
insert = async (data) => await cilt("mst_task").insert(data);
update = async (id, data) => await cilt("mst_task").where("task_id", id).update(data);
deleteData = async (id) => await cilt("mst_task").where("task_id", id).del()

getAllQueried = async () => await cilt.select(cilt.raw(
    `mt.task_id, ma.area_id, mt.date, ma.name AS area, mp.name AS progress 
    FROM mst_task mt 
    LEFT JOIN mst_area ma ON mt.area_id = ma.area_id 
    LEFT JOIN mst_progress mp ON mt.progress_id = mp.progress_id
    WHERE mt.is_removed = 0`
));

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
    getAllQueried,
    getCountTaskActivityByTaskId
}