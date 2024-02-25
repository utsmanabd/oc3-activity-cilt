const cilt = require("../database/cilt.config");

const getFindingCount = async () => await cilt.select('*').from('finding_count')
const getFindingCountByDate = async (month, year) => await cilt.select('*').from('finding_count').where('month', `${month}`).where('year', `${year}`)
const getAreaCountByDate = async (month, year) => await cilt.select(cilt.raw(
    `mt.area_id, mar.name AS area, COUNT(DISTINCT mta.activity_id) AS total_activity, 
    COUNT(mta.condition) AS checklist 
    FROM mst_task_activity mta 
    LEFT JOIN mst_activity ma ON mta.activity_id = ma.activity_id 
    LEFT JOIN mst_machine_area mma ON ma.m_area_id = mma.m_area_id 
    LEFT JOIN mst_area mar ON mma.area_id = mar.area_id 
    LEFT JOIN mst_task mt ON mta.task_id = mt.task_id 
    WHERE mta.is_removed = 0 AND ma.is_removed = 0 AND DATE_FORMAT(mt.date, '%m-%Y') = '${month}-${year}'
    GROUP BY mt.area_id;`
))

const getFindingNotOkActivity = async () => await cilt.select('*').from('finding_not_ok_activity')
const getFindingNotOkActivityByDate = async (month, year) => await cilt.select('*').from('finding_not_ok_activity').where('month', `${month}`).where('year', `${year}`) // TODO: Week Filter
const getFindingNotOkActivityByDateRange = async (fromDate, toDate) =>
    await cilt('finding_not_ok_activity')
    .select('*')
    .whereBetween('date', [`${fromDate}`, `${toDate}`]);
const getFindingNotOkActivityByTaskId = async (taskId) => await cilt.select('*').from('finding_not_ok_activity').where('task_id', `${taskId}`)

const getFindingUndoneActivity = async () => await cilt.select('*').from('finding_undone_activity')
const getFindingUndoneActivityByDate = async (month, year) => await cilt.select('*').from('finding_undone_activity').where('month', `${month}`).where('year', `${year}`)  // TODO: Week Filter
const getFindingUndoneActivityByDateRange = async (fromDate, toDate) =>
    await cilt.select('*').from('finding_undone_activity').whereBetween('date', [`${fromDate}`, `${toDate}`])
const getFindingUndoneActivityByTaskId = async (taskId) => await cilt.select('*').from('finding_undone_activity').where('task_id', `${taskId}`)

const getChecklistPerTaskMachine = async () => await cilt.select('*').from('checklist_per_task_machine')
const getChecklistPerTaskMachineByDate = async (month, year) => await cilt.select('*').from('checklist_per_task_machine').where(cilt.raw(`DATE_FORMAT(date, '%m-%Y')`), `${month}-${year}`)
const getChecklistPerTaskMachineById = async (areaId, date) => await cilt.select('*').from('checklist_per_task_machine').where('area_id', `${areaId}`).where('date', `${date}`) // TODO: Week Filter
const getChecklistPerTaskMachineByIdRange = async (areaId, fromDate, toDate) => 
    await cilt('mst_task_activity as mta')
    .select('mma.area_id', 'mar.name as area', 'mma.name as machine_area')
    .count('mta.task_activity_id as total_activity')
    .count('mta.condition as checklist')
    .leftJoin('mst_activity as ma', 'mta.activity_id', 'ma.activity_id')
    .leftJoin('mst_machine_area as mma', 'ma.m_area_id', 'mma.m_area_id')
    .leftJoin('mst_task as mt', 'mta.task_id', 'mt.task_id')
    .leftJoin('mst_area as mar', 'mt.area_id', 'mar.area_id')
    .where('mta.is_removed', 0)
    .andWhere('ma.is_removed', 0)
    .andWhere('mt.area_id', areaId)
    .andWhereBetween('mt.date', [`${fromDate}`, `${toDate}`])
    .groupBy('mma.area_id', 'ma.m_area_id');

const getChecklistPerCategoryByDate = async(month, year) => await cilt.select(cilt.raw(
    `ta.category, COUNT(ta.condition) AS checklist, COUNT(ta.task_activity_id) AS total_activity 
    FROM task_activity ta 
    LEFT JOIN mst_task mt ON ta.task_id = mt.task_id 
    WHERE DATE_FORMAT(mt.date, "%m-%Y") = "${month}-${year}" 
    GROUP BY ta.category`
)) // TODO: Week Filter
const getChecklistPerCategoryByDateRange = async (fromDate, toDate) =>
    await cilt('task_activity as ta')
    .select('ta.category')
    .count('ta.condition as checklist')
    .count('ta.task_activity_id as total_activity')
    .leftJoin('mst_task as mt', 'ta.task_id', 'mt.task_id')
    .whereBetween('mt.date', [`${fromDate}`, `${toDate}`])
    .groupBy('ta.category');

module.exports = {
    getFindingCount,
    getFindingCountByDate,
    getFindingNotOkActivity,
    getFindingNotOkActivityByDate,
    getFindingNotOkActivityByDateRange,
    getFindingNotOkActivityByTaskId,
    getFindingUndoneActivity,
    getFindingUndoneActivityByDate,
    getFindingUndoneActivityByDateRange,
    getFindingUndoneActivityByTaskId,
    getChecklistPerTaskMachine,
    getChecklistPerTaskMachineByDate,
    getChecklistPerTaskMachineById,
    getChecklistPerTaskMachineByIdRange,
    getChecklistPerCategoryByDate,
    getChecklistPerCategoryByDateRange
}
