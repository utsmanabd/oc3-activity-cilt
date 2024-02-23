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

const getFindingNotOkActivityByDateRange = async (req, res) => {
    try {
        const fromDate = req.query.from || null
        const toDate = req.query.to || null
        if (fromDate && toDate) {
            let data = await model.getFindingNotOkActivityByDateRange(fromDate, toDate)
            return api.ok(res, data)
        } else {
            return api.ok(res, [])
        }
    } catch (err) {
        api.catchError(res, err)
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

const getFindingUndoneActivityByDateRange = async(req, res) => {
    try {
        const fromDate = req.query.from || null
        const toDate = req.query.to || null
        if (fromDate && toDate) {
            let data = await model.getFindingUndoneActivityByDateRange(fromDate, toDate)
            return api.ok(res, data)
        } else {
            return api.ok(res, [])
        }
    } catch (err) {
        api.catchError(res, err)
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
        if (req.params.month < 10) month = `0${req.params.month}`
        const date = `${month}-${year}`
        let data = await model.getChecklistPerTaskMachineById(areaId, date);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

const getChecklistPerTaskMachineByIdRange = async (req, res) => {
    try {
        const areaId = parseInt(req.params.areaid) || 0
        const fromDate = req.query.from || null
        const toDate = req.query.to || null
        if (fromDate && toDate) {
            let data = await model.getChecklistPerTaskMachineByIdRange(areaId, fromDate, toDate)
            return api.ok(res, data)
        } else {
            return api.ok(res, [])
        }
    } catch (err) {
        api.catchError(res, err)
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

const getChecklistPerCategoryByDateRange = async(req, res) => {
    try {
        const fromDate = req.query.from || null
        const toDate = req.query.to || null
        if (fromDate && toDate) {
            let data = await model.getChecklistPerCategoryByDateRange(fromDate, toDate)
            return api.ok(res, data)
        } else {
            return api.ok(res, [])
        }
    } catch (err) {
        api.catchError(res, err)
    }
}

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