const mongoose = require("mongoose");

const DB ="mongodb+srv://desi:Tzq9DokcIqy3EXkA@cluster0.qnvzeqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
;
// const DB = process.env.DATABASE


mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("connection start")).catch((error)=> console.log(error.message));