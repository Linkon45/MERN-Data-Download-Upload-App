const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `MongoDB Connected: ${connection.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
