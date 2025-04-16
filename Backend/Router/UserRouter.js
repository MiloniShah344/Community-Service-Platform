let express = require('express')
let router = express.Router()
let jwt=require('jsonwebtoken')
require('dotenv').config()

const {createUser, loginUser, getUser, toggleUserVerification} = require('../Controller/UserController')
const {createNGO, getNGO, getSpecificNGO, updateNGO, updateNGOVerification, getUnverifiedNGOs} = require('../Controller/NGOController')
const {createContributor, getContributor, getSpecificCont, updateCont, updateContVerification, getUnverifiedConts} = require('../Controller/ContController')
const {createProject, getAllProjects, getSpecificProject, getOneProject, updateProject, deleteProject, getProjectByName} = require('../Controller/ProjectController')
const {createVolGrowth, getVolGrowth} = require('../Controller/VolGrowthController')
const {createCompletedPrj, getCompletedPrj} = require('../Controller/CompletedPrjController')
const {saveReceipt, getReceipts} = require('../Controller/RecieptController')


let mw = (req, res, next) =>{
try{
let jtoken=req.headers.authorization.split(' ')[1]
var decoded = jwt.verify(jtoken, process.env.PRIVATEKEY);
if(decoded){
  next()
}
else{
  res.send({
    isSuccess:false,
    msg:'Invalid User'
  })
}
}
catch(err){
  console.log('Error',err)
}
}
console.log('in user Router')

router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/getUser', mw, getUser)
router.put('/verifyUser', toggleUserVerification)

router.post('/ContributorRegister', createContributor)
router.get('/getContributor', getContributor)
router.get('/getSpecificCont', getSpecificCont)
router.put('/updateCont', updateCont)
router.put('/verifyCont', updateContVerification)
router.get('/unverifiedConts', getUnverifiedConts)

router.post('/NGORegister', createNGO)
router.get('/getNGO', getNGO)
router.get('/getSpecificNGO', getSpecificNGO)
router.put('/updateNGO', updateNGO)
router.put('/verifyNGO', updateNGOVerification)
router.get('/unverifiedNGOs', getUnverifiedNGOs)

router.post('/createProject', createProject)
router.get('/getAllProjects', getAllProjects)
router.post('/getSpecificProject', getSpecificProject)
router.post('/getOneProject', getOneProject)
router.put('/updateProject', updateProject)
router.delete('/deleteProject', deleteProject)
router.post('/getProjectByName', getProjectByName)

router.post('/createVolGrowth', createVolGrowth)
router.get('/getVolGrowth', getVolGrowth)

router.post('/createCompletedPrj', createCompletedPrj)
router.get('/getCompletedPrj', getCompletedPrj)

router.post('/saveReceipt', saveReceipt);
router.get('/getReceipts',getReceipts );


module.exports = router