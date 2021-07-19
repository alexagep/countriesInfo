const express = require('express');
const logger = require('../config/winston');
const router = express.Router();
const customer = require('../models/customer')
var logger = require('../config/winston');




//get Customers List
router.get('/allCustomers', async (req, res) =>{
    
    try {
        let customers = await customer.findAll();
        res.render('index', {
            customers
        });
    } catch (err) {
        console.log(err);
    }
})


//delete Customer
router.delete('/allCustomers', async(req, res) =>{
    try {
        await customer.destroy({ where: {id: req.body.id}});
        res.send("done!")
    } catch (err) {
        console.log(err);
    }
})


//update Customers
router.put('/allCustomers', async(req, res, next) => {
    const ctm = await customer.findOne({ where:{id: req.body.id}})
    // const customer = await Customer.findByPk()
    const repeatedNum = await customer.findOne({ where:{mobileNum: req.body.mobileNum}})
    console.log(repeatedNum);
    if (repeatedNum) {
        logger.info("invalid update!! this mobile number has been used before")
        return next;
        
    }else{

        try {
            const { id, firstName, lastName, mobileNum, email, address } = req.body;

            ctm.id = id;
            ctm.firstName = firstName;
            ctm.lastName = lastName;
            ctm.mobileNum = mobileNum;
            ctm.email = email;
            ctm.address = address;

            await ctm.save();
            return res.send("done!")
        } catch (err) {
            console.log(err);;
        }
    }
})


//create a customer
router.post('/allCustomers', async(req, res, next) => {
    // console.log(req.body);
    // console.log(req.body.mobileNum);
    const repeatedNum = await customer.findOne({ where:{mobileNum: req.body.mobileNum}})
    console.log(repeatedNum);
    if (repeatedNum) {
        logger.info("invalid Request!! this mobile number has been used before")
        return next;
    }else{

    let {id, firstName, lastName, mobileNum, email, address } = req.body;
    let errors = [];

    if(!firstName){
        errors.push({text: 'please write firstName'})
    }
    if(!lastName){
        errors.push({text: 'please write lastName'})
    }
    if(!mobileNum){
        errors.push({text: 'please write mobileNum'})
    }
    if(!email){
        errors.push({text: 'please write email'})
    }
    if(!address){
        errors.push({text: 'please write address'})
    }

    // Check for errors
    if(errors.length > 0){
        res.status(403).send( {
            errors,
            id,
            firstName, 
            lastName, 
            mobileNum, 
            email,
            address
        });
    }else{
  
    //insert into table
    customer.create({
        firstName,
        lastName,
        mobileNum,
        email,
        address
    })
        .then(customer => res.send('Done!'))
        .catch(err => console.log(err))
    }
    }

    
});






module.exports = router;