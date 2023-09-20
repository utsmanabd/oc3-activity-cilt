var express = require('express');
var router = express.Router();

const ActivityController = require('../../controller/master_controller/ActivityController')
const AreaController = require('../../controller/master_controller/AreaController')
const MachineAreaController = require('../../controller/master_controller/MachineAreaController')
const TaskActivityController = require('../../controller/master_controller/TaskActivityController')
const TaskController = require('../../controller/master_controller/TaskController')

const { uploadImage } = require('../../services/file-handler.service');
const ImageHandlerController = require('../../controller/master_controller/ImageHandlerController')
const FindingController = require('../../controller/master_controller/FindingController')

// Image Handler
router.post('/image', uploadImage.single('file'), ImageHandlerController.uploadImage)
router.post('/image/multi', uploadImage.array('files', 100), ImageHandlerController.uploadMultipleImage)
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
router.post('/task-activity/batch', TaskActivityController.updateBatchTaskActivity)

// Task Controller
router.get('/task', TaskController.getAllTask)
router.get('/task/date/:month/:year', TaskController.getAllTaskByDate)
router.get('/task/:id', TaskController.getTaskById)
router.get('/task/count/:id', TaskController.getCountTaskActivityByTaskId)
router.post('/task', TaskController.insertTask)
router.put('/task/:id', TaskController.updateTask)
router.delete('/task/:id', TaskController.deleteTask)

// Finding
router.get('/finding', FindingController.getFindingCount)
router.get('/finding/date/:month/:year', FindingController.getFindingCountByDate)
router.get('/finding/not-ok', FindingController.getFindingNotOkActivity)
router.get('/finding/not-ok/date/:month/:year', FindingController.getFindingNotOkActivityByDate)
router.get('/finding/not-ok/:id', FindingController.getFindingNotOkActivityByTaskId)
router.get('/finding/undone', FindingController.getFindingUndoneActivity)
router.get('/finding/undone/date/:month/:year', FindingController.getFindingUndoneActivityByDate)
router.get('/finding/undone/:id', FindingController.getFindingUndoneActivityByTaskId)
router.get('/finding/checklist', FindingController.getChecklistPerTaskMachine)
router.get('/finding/checklist/date/:month/:year', FindingController.getChecklistPerTaskMachineByDate)
router.get('/finding/checklist/:id', FindingController.getChecklistPerTaskMachineByTaskId)

module.exports = router;