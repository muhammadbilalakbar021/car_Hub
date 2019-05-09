const express = require('express');
const router=express.Router();
var path = require('path');

router.use(express.json()) //For json data Transformation
router.use(express.urlencoded({ extended: true }))

router.get('/', (req, resp) => {   
    var result=[]   
    async function getCar()
    {
        // resp.sendFile(path.join(__dirname+'carHub.com/views/index.pug'));
         resp.render('index',{items : result})
    }
    getCar();

}); 
module.exports=router;
