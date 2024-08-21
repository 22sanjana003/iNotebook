const mongoose=require('mongoose');
const MONGODB_URL="mongodb://127.0.0.1:27017/iNotebook";
const connectToMongo = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log(`DB Connection Success`);
    } 
    catch (err) {
        console.log(`DB Connection Failed`);
        console.log(err);
    }
};
module.exports = connectToMongo;