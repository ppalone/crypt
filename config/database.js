const mongoose = require('mongoose');
const URI = process.env.MONGO_URI;

(async () => {
  try {
    await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB connected!');
  } catch (err) {
    console.log('Error:' + err);
  }
})();

// module.exports = mongoose;
