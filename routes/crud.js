const express = require('express');
const router=express.Router();
const Joi = require('joi') //For Validation
const mongoose = require('mongoose');
var fs=require('fs');
var http =require('http')


router.use(express.json()) //For json data Transformation
router.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/car_db')
.then(() => console.log("Connected to Mongoose"))
.catch(() => console.log("Could not connected to mongoDB.."))

let car_Array = [{
    "car_Company": "Nissan",
    "car_Name": "gtr",
    "car_Price": 80000,
    "model": 3,
    "generation": 4,
    "pros": "Veru fast",
    "cons": "Unbreakable",
    "review": "sexy",
    "overview": "hot",

    "horsepower": 748,
    "torque": 672,
    "topspeed": 240,
    "zeroto60": 2.4
}];

const carSchema=new mongoose.Schema({
    car_Company: String,
    car_Name: String,
    car_Price: Number,
    model: Number,
    generation: Number,
    pros: String,
    cons: String,
    review: String,
    overview: String,

    horsepower: Number,
    torque: Number,
    topspeed: Number,
    zeroto60: String
})

// const carModel=mongoose.model('carModel',carSchema);
const carModel=mongoose.model('carModeex',carSchema);


//App Request this url for get data
router.get('/', (req, resp) => {

    var result=[]
    async function getCar()
    {
        const car_Obj_Result = await carModel.find();
        car_Obj_Result.forEach(function(doc,err)
        {
            result.push(doc)
        })
        console.log(result)
        // resp.render('index',{items : result})
        resp.render('back_End',{items : result})

    }
    getCar();

}); 

router.get('/:car_Company', (req, resp) => {
    var result=[]
    const c=req.params.car_Company;   
    async function getCar(c)
    {
        const car_Obj_Result = await carModel.find({car_Company:req.params.car_Company});
        car_Obj_Result.forEach(function(doc,err)
            {
                result.push(doc.car_Name)
            })
        // console.log(result)
        // resp.render('index',{items : result})
        resp.send(result)
    }
    getCar();

});

router.post('/getCar', (req, resp) => {
    
    async function getCarDetail()
    {
        console.log("Event has been called" + req.body);   
        carCompany=req.body.carCompany;
        //carModel=req.body.carModel;

        console.log(carCompany + "************************");
        // console.log(carModel);
        const car_Obj_Result = await carModel.find({car_Company:req.body.carCompany });
        // car_Obj_Result.forEach(function(doc,err)
        //     {
        //         result.push(doc.car_Name)
        //     })
        console.log(car_Obj_Result)
        // resp.render('index',{items : result})
        resp.send(car_Obj_Result)
    }
    getCarDetail();

});


//App Request this url for insert Post data
router.post('/postdata', (req, resp) => {

    // const result = validateCars(req.body)
    // if (result.error) {
    //     resp.status(400).send("Validation required ! Please fill all Box")
    //     return;
    // }

    async function carObjectCreating(){
        const car_obj =new carModel
    ({
        car_Company: req.body.car_Company,
        car_Name: req.body.car_Name,
        car_Price: req.body.car_Price,
        model: req.body.model,
        generation: req.body.generation,
        pros: req.body.pros,
        cons: req.body.cons,
        review: req.body.review,
        overview: req.body.overview,
        horsepower: req.body.horsepower,
        torque: req.body.torque,
        topspeed: req.body.topspeed,
        zeroto60: req.body.zeroto60


    });

    const car_result = await car_obj.save();
    console.log(car_result)
    var result=[]
    const car_Obj_Result = await carModel.find();
    car_Obj_Result.forEach(function(doc,err)
    {
        result.push(doc)
    })
    // console.log(result)
    resp.render('back_End',{items : result})

}   
    carObjectCreating();
})

router.put('/:car', (req, resp) => {

    const car = car_Array.find(c => { return c.car_Name === (req.params.car) });
    console.log(req.body);
    console.log(car_Array);
    if (!car) {
        return resp.status(404).send("Car with given comapny is not found");
    }

    const result = validateCars(req.body)
    if (result.error) {
        resp.status(400).send("Validation required ! Please fill all Box")
        return;
    }

    car.car_Name = req.body.car_Name;
    console.log(car)
    resp.send(car)

})

router.delete('/:car_Name', (req, resp) => {
    const car = car_Array.find(c => { return c.car_Company === (req.params.car_Name) });
    console.log(car_Array)
    console.log(car)
    if (!car) {
        console.log(req.params.car_Name)
        resp.status(404).send("Car with given comapny is not found");
    }

    const index = car_Array.indexOf(car);
    car_Array.splice(index, 1)
    resp.send(car)
})

function validateCars(car_obj) {
    const checking_Joi =
    {
        car_Company: Joi.string().required(),
        car_Name: Joi.string().required(),
        car_Price: Joi.required(),
        model: Joi.required(),
        generation: Joi.required(),
        pros: Joi.string().required(),
        cons: Joi.string().required(),
        review: Joi.string().required(),
        overview: Joi.string().required(),
        horsepower: Joi.required(),
        torque: Joi.required(),
        topspeed: Joi.required(),
        zeroto60: Joi.required()
    };

    return result = Joi.validate(car_obj, checking_Joi);
}

module.exports=router;
