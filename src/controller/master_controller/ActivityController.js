const model = require('../../model/activity.model')
const api = require('../../tools/common')

getAllActivity = async (req, res) => {
    let data = await model.getAll();
    return api.ok(res, data);
}

getActivityById = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getById(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

getActivityByMachineId = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getByMachineId(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

getActivityByAreaId = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getByAreaId(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

insertActivity = async (req, res) => {
    let data = await model.insert(req.body.form_data);
    return api.ok(res, data);
}

updateActivity = async (req, res) => {
    let data = await model.update(req.params.id, req.body.form_data);
    return api.ok(res, data);
}

deleteActivity = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.deleteData(req.params.id)
        return api.ok(res, data)
    } else {
        return api.error(res, 'Bad Request', 400)
    }
}

module.exports = {
    getAllActivity,
    getActivityById,
    insertActivity,
    updateActivity,
    deleteActivity,
    getActivityByMachineId,
    getActivityByAreaId
};