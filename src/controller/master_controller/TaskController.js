const model = require('../../model/task.model')
const api = require('../../tools/common')

getAllTask = async (req, res) => {
    let data = await model.getAll();
    return api.ok(res, data);
}

const getAllTaskByDate = async (req, res) => {
    if (!isNaN(req.params.month) && !isNaN(req.params.year)) {
        let month = ``
        let year = `${req.params.year}`
        if (req.params.month < 10) {
            month = `0${req.params.month}`
        } else month = req.params.month
        let data = await model.getAllByDate(month, year);
        if (data.length > 0) {
            return api.ok(res, data);
        } else return api.error(res, `Couldn't find data on ${month}-${year}`, 200)
        
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

const getAllTaskByDateRange = async (req, res) => {
    try {
        const fromDate = req.query.from || null
        const toDate = req.query.to || null

        if (fromDate && toDate) {
            let data = await model.getAllByDateRange(fromDate, toDate)
            return api.ok(res, data)
        } else {
            return api.ok(res, [])
        }
    } catch (err) {
        return api.catchError(res, err)
    }
}

getTaskById = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getById(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

getAllTaskCount = async (req, res) => {
    let data = await model.getAllCount()
    return api.ok(res, data);
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
    getAllTaskByDate,
    getAllTaskByDateRange,
    getTaskById,
    getAllTaskCount,
    getCountTaskActivityByTaskId,
    insertTask,
    updateTask,
    deleteTask
};