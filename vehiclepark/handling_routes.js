const express=require("express")
const router=express.Router();
const {getcontact,createcontact,get2,calfare,finalpayment,farereader}=require('./createcontroller')

router.route('/find').post(getcontact);
router.route('/check').post(get2);
router.route('/fare').post(calfare);
router.route('/fale').post(farereader);
router.route('/final').post(finalpayment);
router.route('/submit').post(createcontact);
router.route('/:id').get();

module.exports=router;