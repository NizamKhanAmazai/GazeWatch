import mongoose from "mongoose"

// const MongoURI = process.env.MONGO_URL;

let Check_Connection = false;
const connectToDB = async () => {
    try {
        if(!Check_Connection){
            await mongoose.connect(process.env.MONGO_URL);
            console.log("database Connected Successfully!") 
            Check_Connection = true;
        }else{
            console.log("database already Connected!")
        }
    } catch (error) {
        Check_Connection = false;
        console.log(error)
    }
}

export default connectToDB;