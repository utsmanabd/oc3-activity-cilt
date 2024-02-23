const cilt = require("../database/cilt.config");

getAll = async () => await cilt.select("*").from("task_activity")
getById = async (id) => await cilt.select("*").from("task_activity").where("task_activity_id", id);
insert = async (data) => await cilt("mst_task_activity").insert(data);
update = async (id, data) => await cilt("mst_task_activity").where("task_activity_id", id).update(data);
deleteData = async (id) => await cilt("mst_task_activity").where("task_activity_id", id).del()

getByTaskId = async (taskId) => await cilt.select("*").from("task_activity").where("task_id", taskId)

getByMachineAreaIdAndTaskId = async (taskId, mAreaId) => await cilt.select(cilt.raw(
    `ma.name AS activity, mc.name AS category, ma.standard, ma.periode, mta.condition, mta.comment, mta.picture, mta.pic, 
    mta.task_activity_id, mta.task_id, ma.activity_id, ma.m_area_id
    FROM mst_task_activity mta 
    LEFT JOIN mst_task mt ON mta.task_id = mt.task_id
    LEFT JOIN mst_activity ma ON mta.activity_id = ma.activity_id 
    LEFT JOIN mst_category mc ON ma.category_id = mc.category_id
    LEFT JOIN mst_machine_area mma ON ma.m_area_id = mma.m_area_id 
    WHERE mta.is_removed = 0 AND ma.is_removed = 0 AND ma.m_area_id = ${mAreaId} AND mta.task_id = ${taskId}`
))

getCountTaskActivityById = async (taskId, mAreaId) => await cilt.select(cilt.raw(
    `mt.date, mta.task_id, mma.name AS machine_area, COUNT(mta.task_activity_id) AS total_activity, COUNT(mta.condition) AS checklist, mt.is_three_days
    FROM mst_task_activity mta 
    LEFT JOIN mst_activity ma ON mta.activity_id = ma.activity_id 
    LEFT JOIN mst_machine_area mma ON ma.m_area_id = mma.m_area_id 
    LEFT JOIN mst_task mt ON mta.task_id = mt.task_id
    WHERE ma.m_area_id = ${mAreaId} AND mta.task_id = ${taskId} AND mta.is_removed = 0 AND ma.is_removed = 0`
))

getCountActivityPeriodByDate = async (year, month) => await cilt.select("periode", "checklist", "total_activity").from("period_activity_month").where("month_year", `${year}-${month}`) // TODO: Week Filter

const getCountActivityPeriodByDateRange = async (fromDate, toDate) =>
    await cilt('mst_task_activity as mta')
    .select('ma.periode', cilt.raw('sum((CASE WHEN (mta.condition = 1) THEN 1 ELSE 0 END)) as checklist'))
    .count('mta.task_activity_id as total_activity')
    .leftJoin('mst_activity as ma', 'mta.activity_id', 'ma.activity_id')
    .leftJoin('mst_task as mt', 'mta.task_id', 'mt.task_id')
    .where('ma.is_removed', 0)
    .andWhere('mta.is_removed', 0)
    .andWhereBetween('mt.date', [`${fromDate}`, `${toDate}`]) // yyyy-mm-dd
    .groupBy("ma.periode");
  

getCountActivityPeriodByYear = async (year) => await cilt.select("periode", "checklist", "total_activity").from("period_activity_year").where("years", `${year}`)

updateByTaskId = async (taskId, data) => await cilt("mst_task_activity").where("task_id", taskId).update(data)

module.exports = {
    getAll,
    getById,
    insert,
    update,
    deleteData,
    getByTaskId,
    getByMachineAreaIdAndTaskId,
    getCountTaskActivityById,
    getCountActivityPeriodByDate,
    getCountActivityPeriodByDateRange,
    getCountActivityPeriodByYear,
    updateByTaskId
}