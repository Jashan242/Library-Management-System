const mongoose = require("mongoose");
const dotenv=require("dotenv")
dotenv.config()
const connnectDB=async(db_name)=>{
    const url = `${process.env.MONGODB_URL}/${process.env.MONGO_DB || db_name}`;
    console.log(url)
    mongoose.connect(url).then(()=>{
        console.log("Connection succesfully")
    })
    .catch((err) => {
        console.log("Error connecting to mongoDB")
    })
}
module.exports=connnectDB    