const mongoose =require("mongoose");
const mongoURI="mongodb+srv://kanchanumang:Oppo1234@cluster1.fxuaw6s.mongodb.net/Notesify?retryWrites=true&w=majority";

const connectToMongo=async()=>{
    try{
        await mongoose.connect(mongoURI);
        console.log("Connected to mongo");
    } catch(e){
        console.log("error: "+e);
    }
}

module.exports=connectToMongo;