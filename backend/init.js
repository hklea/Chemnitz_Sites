const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./model/User"); // make sure path is correct

// Connect to your local MongoDB
mongoose.connect("mongodb://localhost:27017/chemnitz", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function insertSampleUser() {
  try {
    const hashedPassword = await bcrypt.hash("test123", 10); // password: test123

    const sampleUser = new User({
      username: "testuser",
      email: "test@example.com",
      password: hashedPassword,
      location: "Chemnitz",
      favorites: [] // you can also add some example site IDs here if you want
    });

    await sampleUser.save();
    console.log("✅ Sample user inserted successfully");

  } catch (err) {
    console.error("❌ Error inserting sample user:", err.message);
  } finally {
    mongoose.connection.close();
  }
}

insertSampleUser();
