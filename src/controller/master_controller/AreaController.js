const model = require('../../model/area.model')
const api = require('../../tools/common')

getAllArea = async (req, res) => {
    let data = await model.getAll();
    return api.ok(res, data);
}

getAreaById = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getById(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

insertArea = async (req, res) => {
    let data = await model.insert(req.body.form_data);
    return api.ok(res, data);
}

updateArea = async (req, res) => {
    let data = await model.update(req.params.id, req.body.form_data);
    return api.ok(res, data);
}

deleteArea = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.deleteData(req.params.id)
        return api.ok(res, data)
    } else {
        return api.error(res, 'Bad Request', 400)
    }
}

module.exports = {
    getAllArea,
    getAreaById,
    insertArea,
    updateArea,
    deleteArea
};