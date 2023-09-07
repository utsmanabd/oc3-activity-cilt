const cilt = require("../database/cilt.config");

getAll = async () => await cilt.select("*").from("mst_task_activity").where("is_removed", 0)
getById = async (id) => await cilt.select("*").from("mst_task_activity").where("task_activity_id", id);
insert = async (data) => await cilt("mst_task_activity").insert(data);
update = async (id, data) => await cilt("mst_task_activity").where("task_activity_id", id).update(data);
deleteData = async (id) => await cilt("mst_task_activity").where("task_activity_id", id).del()

getByMachineAreaIdQueried = async (taskId, mAreaId) => await cilt.select(cilt.raw(
    `ma.name AS activity, mc.name AS category, ma.standard, ma.periode, mta.condition, mta.comment, mta.picture, mta.pic, 
    mta.task_activity_id, mta.task_id, ma.activity_id, ma.m_area_id 
    FROM mst_task_activity mta 
    LEFT JOIN mst_activity ma ON mta.activity_id = ma.activity_id 
    LEFT JOIN mst_category mc ON ma.category_id = mc.category_id 
    WHERE mta.is_removed = 0 AND ma.is_removed = 0 AND ma.m_area_id = ${mAreaId} AND mta.task_id = ${taskId}`
))

module.exports = {
    getAll,
    getById,
    insert,
    update,
    deleteData,
    getByMachineAreaIdQueried
}