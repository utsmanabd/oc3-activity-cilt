const model = require('../../model/task-activity.model')
const api = require('../../tools/common')

getAllTaskActivity = async (req, res) => {
    let data = await model.getAll();
    return api.ok(res, data);
}

getTaskActivityById = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getById(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

getTaskActivityByTaskIdAndMachineId = async (req, res) => {
    if (!isNaN(req.params.taskid) && !isNaN(req.params.mareaid)) {
        let data = await model.getByMachineAreaIdAndTaskId(req.params.taskid, req.params.mareaid);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

insertTaskActivity = async (req, res) => {
    let data = await model.insert(req.body.form_data);
    return api.ok(res, data);
}

updateTaskActivity = async (req, res) => {
    let data = await model.update(req.params.id, req.body.form_data);
    return api.ok(res, data);
}

deleteTaskActivity = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.deleteData(req.params.id)
        return api.ok(res, data)
    } else {
        return api.error(res, 'Bad Request', 400)
    }
}

module.exports = {
    getAllTaskActivity,
    getTaskActivityById,
    getTaskActivityByTaskIdAndMachineId,
    insertTaskActivity,
    updateTaskActivity,
    deleteTaskActivity
};