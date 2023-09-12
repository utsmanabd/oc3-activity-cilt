var express = require('express');
var router = express.Router();

const ActivityController = require('../../controller/master_controller/ActivityController')
const AreaController = require('../../controller/master_controller/AreaController')
const MachineAreaController = require('../../controller/master_controller/MachineAreaController')
const TaskActivityController = require('../../controller/master_controller/TaskActivityController')
const TaskController = require('../../controller/master_controller/TaskController')

const { uploadImage } = require('../../services/file-handler.service');
const ImageHandlerController = require('../../controller/master_controller/ImageHandlerController')

// Image Handler
router.post('/image', uploadImage.single('file'), ImageHandlerController.uploadImage)
router.delete('/image/:filename', ImageHandlerController.deleteImage)

// Activity
router.get('/activity', ActivityController.getAllActivity)
router.get('/activity/:id', ActivityController.getActivityById)
router.get('/activity/machine/:id', ActivityController.getActivityByMachineId)
router.get('/activity/area/:id', ActivityController.getActivityByAreaId)
router.post('/activity', ActivityController.insertActivity)
router.put('/activity/:id', ActivityController.updateActivity)

// Area
router.get('/area', AreaController.getAllArea)
router.get('/area/:id', AreaController.getAreaById)
router.post('/area', AreaController.insertArea)
router.put('/area/:id', AreaController.updateArea)

// Machine Area
router.get('/machine', MachineAreaController.getAllMachineArea)
router.get('/machine/:id', MachineAreaController.getMachineAreaById)
router.get('/machine/area/:id', MachineAreaController.getMachineAreaByAreaId)
router.post('/machine', MachineAreaController.insertMachineArea)
router.put('/machine/:id', MachineAreaController.updateMachineArea)

// Task Activity
router.get('/task-activity', TaskActivityController.getAllTaskActivity)
router.get('/task-activity/:id', TaskActivityController.getTaskActivityById)
router.get('/task-activity/id/:taskid/:mareaid', TaskActivityController.getTaskActivityByTaskIdAndMachineId)
router.get('/task-activity/count/:taskid/:mareaid', TaskActivityController.getCountTaskActivityById)
router.post('/task-activity', TaskActivityController.insertTaskActivity)
router.put('/task-activity/:id', TaskActivityController.updateTaskActivity)

// Task Controller
router.get('/task', TaskController.getAllTask)
router.get('/task/:id', TaskController.getTaskById)
router.get('/task/count/:id', TaskController.getCountTaskActivityByTaskId)
router.post('/task', TaskController.insertTask)
router.put('/task/:id', TaskController.updateTask)
router.delete('/task/:id', TaskController.deleteTask)

module.exports = router;