const model = require('../../model/user.model');
const { encryptPassword } = require('../../services/auth.service');
const api = require('../../tools/common')

getAllUsers = async (req, res) => {
    let data = await model.getAll();
    return api.ok(res, data);
}

getUserByNik = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getByNik(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

insertUser = async (req, res) => {
    let formData = req.body.form_data

    if (Array.isArray(formData)) {
        for (let data of formData) {
            const nik = await model.getAllByNik(data.nik)
            if (nik.length > 0) {
                return api.error(res, "NIK is already exists!", 200)
            }

            let hashedPassword = await encryptPassword(data.password)
            data.password = hashedPassword
        }
        let data = await model.insert(formData)
        return api.ok(res, data);
    } else {
        const userNik = await model.getAllByNik(req.body.form_data.nik)

        if (userNik.length > 0) {
            return api.error(res, "NIK is already exists!", 200)
        }

        let hashedPassword = await encryptPassword(formData.password)
        formData.password = hashedPassword
        let data = await model.insert(formData);
        return api.ok(res, data);
    }
}

updateUser = async (req, res) => {
    const userId = req.params.id
    let formData = req.body.form_data

    if (formData.password) {
        const hashedPassword = await encryptPassword(formData.password)
        formData.password = hashedPassword
    }

    let data = await model.updateUser(userId, formData);
    return api.ok(res, data);
}

isNIKExists = async (req, res) => {
    const nik = await model.getAllByNik(req.params.nik)
    if (nik.length > 0) {
        return api.error(res, "NIK is already exists!", 200)
    } else {
        return api.ok(res, { message: "NIK is available!" })
    }
}

getAllRole = async (req, res) => {
    let data = await model.getAllRole();
    return api.ok(res, data);
}

module.exports = {
    getAllUsers,
    getUserByNik,
    insertUser,
    updateUser,
    getAllRole,
    isNIKExists
}