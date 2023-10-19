const model = require('../../model/finding-condition.model')
const api = require('../../tools/common')

const getFindingCount = async(req, res) => {
    let data = await model.getFindingCount()
    return api.ok(res, data)
}

const getFindingCountByDate = async(req, res) => {
    if (!isNaN(req.params.month) && !isNaN(req.params.year)) {
        let month = ``
        let year = `${req.params.year}`
        if (req.params.month < 10) {
            month = `0${req.params.month}`
        } else month = req.params.month
        let data = await model.getFindingCountByDate(month, year);
        if (data.length > 0) {
            return api.ok(res, data);
        } else return api.error(res, `Couldn't find data on ${month}-${year}`, 404)
        
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

const getFindingNotOkActivity = async(req, res) => {
    let data = await model.getFindingNotOkActivity()
    return api.ok(res, data)
}

const getFindingNotOkActivityByDate = async(req, res) => {
    if (!isNaN(req.params.month) && !isNaN(req.params.year)) {
        let month = ``
        let year = `${req.params.year}`
        if (req.params.month < 10) {
            month = `0${req.params.month}`
        } else month = req.params.month
        let data = await model.getFindingNotOkActivityByDate(month, year);
        if (data.length > 0 || data.length == 0) {
            return api.ok(res, data);
        } else return api.error(res, `Couldn't find data on ${month}-${year}`, 404)
        
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

const getFindingNotOkActivityByTaskId = async(req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getFindingNotOkActivityByTaskId(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

const getFindingUndoneActivity = async(req, res) => {
    let data = await model.getFindingUndoneActivity()
    return api.ok(res, data)
}

const getFindingUndoneActivityByDate = async(req, res) => {
    if (!isNaN(req.params.month) && !isNaN(req.params.year)) {
        let month = ``
        let year = `${req.params.year}`
        if (req.params.month < 10) {
            month = `0${req.params.month}`
        } else month = req.params.month
        let data = await model.getFindingUndoneActivityByDate(month, year);
        if (data.length > 0 || data.length == 0) {
            return api.ok(res, data);
        } else return api.error(res, `Couldn't find data on ${month}-${year}`, 404)
        
    } else {
        return api.error(res, "Bad Request", 400);
    }
}
const getFindingUndoneActivityByTaskId = async(req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getFindingUndoneActivityByTaskId(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

const getChecklistPerTaskMachine = async(req, res) => {
    let data = await model.getChecklistPerTaskMachine()
    return api.ok(res, data)
}

const getChecklistPerTaskMachineByDate = async(req, res) => {
    if (!isNaN(req.params.month) && !isNaN(req.params.year)) {
        let month = ``
        let year = `${req.params.year}`
        if (req.params.month < 10) {
            month = `0${req.params.month}`
        } else month = req.params.month
        let data = await model.getChecklistPerTaskMachineByDate(month, year);
        if (data.length > 0) {
            return api.ok(res, data);
        } else return api.error(res, `Couldn't find data on ${month}-${year}`, 404)
        
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

const getChecklistPerTaskMachineById = async(req, res) => {
    if (!isNaN(req.params.areaid) && !isNaN(req.params.month) && !isNaN(req.params.year)) {
        let areaId = req.params.areaid
        let month = `${req.params.month}`
        let year = `${req.params.year}`
        console.log(`id: ${areaId}, month: ${month}, year: ${year}`)
        if (req.params.month < 10) month = `0${req.params.month}`
        const date = `${month}-${year}`
        console.log(date)
        let data = await model.getChecklistPerTaskMachineById(areaId, date);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

const getChecklistPerCategoryByDate = async(req, res) => {
    if (!isNaN(req.params.month) && !isNaN(req.params.year)) {
        let month = ``
        let year = `${req.params.year}`
        if (req.params.month < 10) {
            month = `0${req.params.month}`
        } else month = req.params.month
        let data = await model.getChecklistPerCategoryByDate(month, year);
        if (data.length > 0) {
            return api.ok(res, data);
        } else return api.error(res, `Couldn't find data on ${month}-${year}`, 404)
        
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

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