const cilt = require("../database/cilt.config");

getAll = async () => await cilt.select("*").from("mst_activity").where("is_removed", 0)
getById = async (id) => await cilt.select("*").from("mst_activity").where("activity_id", id);
insert = async (data) => await cilt("mst_activity").insert(data);
update = async (id, data) => await cilt("mst_activity").where("activity_id", id).update(data);
deleteData = async (id) => await cilt("mst_activity").where("activity_id", id).del()

getQueriedData = async () => await cilt.select(cilt.raw(
    `ac.activity_id, mar.name AS area, ar.name AS machine_area, ac.name AS activity, ct.name AS category, ac.standard, ac.periode 
    FROM mst_activity ac 
    LEFT JOIN mst_machine_area ar ON ac.m_area_id = ar.m_area_id 
    LEFT JOIN mst_category ct ON ac.category_id = ct.category_id 
    LEFT JOIN mst_area mar ON ar.area_id = mar.area_id
    WHERE ac.is_removed = 0`
))

getByMachineAreaIdQueried = async (id) => await cilt.select(cilt.raw(
    `ac.activity_id, ac.name AS activity, ct.name AS category, ac.standard, ac.periode FROM mst_activity ac LEFT JOIN mst_category ct ON ac.category_id = ct.category_id WHERE ac.m_area_id = ${id} AND ac.is_removed = 0`
))

module.exports = {
    getAll,
    getById,
    insert,
    update,
    deleteData,
    getQueriedData,
    getByMachineAreaIdQueried
}