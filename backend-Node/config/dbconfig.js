const mangoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const ConnectDB = async () => {
    try {
        const conn = await mangoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}
module.exports = { ConnectDB };