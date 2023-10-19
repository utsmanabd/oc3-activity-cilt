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
const getFindingNotOkActivityByDate = async (month, year) => await cilt.select('*').from('finding_not_ok_activity').where('month', `${month}`).where('year', `${year}`)
const getFindingNotOkActivityByTaskId = async (taskId) => await cilt.select('*').from('finding_not_ok_activity').where('task_id', `${taskId}`)

const getFindingUndoneActivity = async () => await cilt.select('*').from('finding_undone_activity')
const getFindingUndoneActivityByDate = async (month, year) => await cilt.select('*').from('finding_undone_activity').where('month', `${month}`).where('year', `${year}`)
const getFindingUndoneActivityByTaskId = async (taskId) => await cilt.select('*').from('finding_undone_activity').where('task_id', `${taskId}`)

const getChecklistPerTaskMachine = async () => await cilt.select('*').from('checklist_per_task_machine')
const getChecklistPerTaskMachineByDate = async (month, year) => await cilt.select('*').from('checklist_per_task_machine').where(cilt.raw(`DATE_FORMAT(date, '%m-%Y')`), `${month}-${year}`)
const getChecklistPerTaskMachineById = async (areaId, date) => await cilt.select('*').from('checklist_per_task_machine').where('area_id', `${areaId}`).where('date', `${date}`)

const getChecklistPerCategoryByDate = async(month, year) => await cilt.select(cilt.raw(
    `ta.category, COUNT(ta.condition) AS checklist, COUNT(ta.task_activity_id) AS total_activity 
    FROM task_activity ta 
    LEFT JOIN mst_task mt ON ta.task_id = mt.task_id 
    WHERE DATE_FORMAT(mt.date, "%m-%Y") = "${month}-${year}" 
    GROUP BY ta.category`
))

module.exports = {
    getFindingCount,
    getFindingCountByDate,
    getFindingNotOkActivity,
    getFindingNotOkActivityByDate,
    getFindingNotOkActivityByTaskId,
    getFindingUndoneActivity,
    getFindingUndoneActivityByDate,
    getFindingUndoneActivityByTaskId,
    getChecklistPerTaskMachine,
    getChecklistPerTaskMachineByDate,
    getChecklistPerTaskMachineById,
    getChecklistPerCategoryByDate
}
