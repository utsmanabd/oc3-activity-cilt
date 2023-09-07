const model = require('../../model/machine-area.model')
const api = require('../../tools/common')

getAllMachineArea = async (req, res) => {
    let data = await model.getQueriedData();
    return api.ok(res, data);
}

getMachineAreaById = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getById(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

insertMachineArea = async (req, res) => {
    let data = await model.insert(req.body.form_data);
    return api.ok(res, data);
}

updateMachineArea = async (req, res) => {
    let data = await model.update(req.params.id, req.body.form_data);
    return api.ok(res, data);
}

deleteMachineArea = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.deleteData(req.params.id)
        return api.ok(res, data)
    } else {
        return api.error(res, 'Bad Request', 400)
    }
}

module.exports = {
    getAllMachineArea,
    getMachineAreaById,
    insertMachineArea,
    updateMachineArea,
    deleteMachineArea
};