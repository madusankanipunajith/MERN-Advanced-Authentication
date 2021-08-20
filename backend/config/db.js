const mongoose = require('mongoose');
const connectDB = async ()=>{
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false
    })

    console.log("Connected");
}

module.exports = connectDB;