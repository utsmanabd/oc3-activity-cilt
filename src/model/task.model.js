const cilt = require("../database/cilt.config");

getAll = async () => await cilt.select("*").from("tasks")
getById = async (id) => await cilt.select("*").from("mst_task").where("task_id", id);
insert = async (data) => await cilt("mst_task").insert(data);
update = async (id, data) => await cilt("mst_task").where("task_id", id).update(data);
deleteData = async (id) => await cilt("mst_task").where("task_id", id).del()

getAllByDate = async (month, year) => await cilt.select("*").from("task_count_by_area").where(`date`, `${month}-${year}`) // TODO: Week Filter

const getAllByDateRange = async (fromDate, toDate) =>
    cilt('mst_task_activity as mta')
    .select('mt.date', 'mma.area_id', 'mar.name as area')
    .count('mta.task_activity_id as total_activity')
    .count('mta.condition as checklist')
    .leftJoin('mst_activity as ma', 'mta.activity_id', 'ma.activity_id')
    .leftJoin('mst_machine_area as mma', 'ma.m_area_id', 'mma.m_area_id')
    .leftJoin('mst_area as mar', 'mma.area_id', 'mar.area_id')
    .leftJoin('mst_task as mt', 'mta.task_id', 'mt.task_id')
    .where('mta.is_removed', 0)
    .andWhere('mt.is_removed', 0)
    .andWhere('ma.is_removed', 0)
    .andWhereBetween('mt.date', [`${fromDate}`, `${toDate}`])  // yyyy-mm-dd
    .groupBy('mma.area_id')
  

getAllCount = async () => await cilt.select("*").from("task_count")

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
    getAllCount,
    getAllByDate,
    getAllByDateRange,
    getCountTaskActivityByTaskId,
}