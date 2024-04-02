const express = require("express");
const router = express.Router();
const foods = require("../models/userSchema");



// router.get("/",(req,res)=>{
//     console.log("connect");
// });

// register user

router.post("/add",async(req,res)=>{
    // console.log(req.body);
    const { description, kcal, protein, fat, carbs } = req.body;

    if(!description || !kcal || !protein || !fat || !carbs){
        res.status(422).json("plz fill the data");
    }

    try {
        
        const preuser = await foods.findOne({description:description});
        console.log(preuser);

        if(preuser){
            res.status(422).json("this is food is already present");
        }else{
            const adduser = new foods({
                description, kcal, protein, fat, carbs
            });

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }

    } catch (error) {
        res.status(422).json(error);
    }
})


// get userdata

router.get("/getdata",async(req,res)=>{
    try {
        const userdata = await foods.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

// get individual food

router.get("/getfood/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await foods.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})


// update user data 

router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await foods.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})


// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deleteuser = await foods.findByIdAndDelete({_id:id})
        console.log(deleteuser);
        res.status(201).json(deleteuser);

    } catch (error) {
        res.status(422).json(error);
    }
})


module.exports = router;