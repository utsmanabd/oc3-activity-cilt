const model = require('../../model/task.model')
const api = require('../../tools/common')

getAllTask = async (req, res) => {
    let data = await model.getAllQueried();
    return api.ok(res, data);
}

getTaskById = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getById(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

getCountTaskActivityByTaskId = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getCountTaskActivityByTaskId(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

insertTask = async (req, res) => {
    let data = await model.insert(req.body.form_data);
    return api.ok(res, data);
}

updateTask = async (req, res) => {
    let data = await model.update(req.params.id, req.body.form_data);
    return api.ok(res, data);
}

deleteTask = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.deleteData(req.params.id)
        return api.ok(res, data)
    } else {
        return api.error(res, 'Bad Request', 400)
    }
}

module.exports = {
    getAllTask,
    getTaskById,
    getCountTaskActivityByTaskId,
    insertTask,
    updateTask,
    deleteTask
};