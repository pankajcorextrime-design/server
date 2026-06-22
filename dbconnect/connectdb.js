// const mongoose= require("mongoose")

// const db = () => {
//     try {
//         mongoose.connect("mongodb+srv://pankajcorextrime_db_user:5P2vZRbQJD5QreuN@cluster0.0ezev0f.mongodb.net/?appName=Cluster0")
//     } catch () {

//     }
// }

// module.exports=db

const mongoose = require("mongoose");
const dns = require("dns");
// Force Google DNS because Node is using 127.0.0.1
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const db = async () => {
  try {
    await mongoose.connect(process.env.MONDB_URL);

    
  } catch (error) {
    console.log("MongoDB Connection Error:", error.message);
    process.exit(1); // Stop the application if DB connection fails
  }
};

module.exports = db;
