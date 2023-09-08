const cilt = require("../database/cilt.config");

getAll = async () => await cilt.select("*").from("mst_machine_area").where("is_removed", 0)
getById = async (id) => await cilt.select("*").from("mst_machine_area").where("m_area_id", id);
insert = async (data) => await cilt("mst_machine_area").insert(data);
update = async (id, data) => await cilt("mst_machine_area").where("m_area_id", id).update(data);
deleteData = async (id) => await cilt("mst_machine_area").where("m_area_id", id).del()

getAllQueried = async () => await cilt.select(cilt.raw(
    `ma.m_area_id, ma.name AS machine_area, a.name AS area 
    FROM mst_machine_area ma 
    LEFT JOIN mst_area a ON ma.area_id = a.area_id
    WHERE ma.is_removed = 0`
))

getByAreaId = async (areaId) => await cilt.select(cilt.raw(
    `m_area_id, name AS machine_area
    FROM mst_machine_area
    WHERE is_removed = 0 AND area_id = ${areaId}`
))



module.exports = {
    getAll,
    getById,
    insert,
    update,
    deleteData,
    getAllQueried,
    getByAreaId
}