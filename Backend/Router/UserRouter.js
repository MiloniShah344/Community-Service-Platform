let express = require('express')
let router = express.Router()
let jwt=require('jsonwebtoken')
require('dotenv').config()

const {createUser, loginUser, getUser} = require('../Controller/UserController')
const {createNGO, getNGO, getSpecificNGO} = require('../Controller/NGOController')
const {createContributor, getContributor} = require('../Controller/ContController')
const {createProject, getAllProjects, getSpecificProject, getOneProject, updateProject, deleteProject} = require('../Controller/ProjectController')
const {createVolGrowth, getVolGrowth} = require('../Controller/VolGrowthController')
const {createCompletedPrj, getCompletedPrj} = require('../Controller/CompletedPrjController')


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

router.post('/ContributorRegister', createContributor)
router.get('/getContributor', getContributor)

router.post('/NGORegister', createNGO)
router.get('/getNGO', getNGO)
router.post('/getSpecificNGo', getSpecificNGO)

router.post('/createProject', createProject)
router.get('/getAllProjects', getAllProjects)
router.post('/getSpecificProject', getSpecificProject)
router.post('/getOneProject', getOneProject)
router.put('/updateProject', updateProject)
router.delete('/deleteProject', deleteProject)

router.post('/createVolGrowth', createVolGrowth)
router.get('/getVolGrowth', getVolGrowth)

router.post('/createCompletedPrj', createCompletedPrj)
router.get('/getCompletedPrj', getCompletedPrj)


module.exports = router