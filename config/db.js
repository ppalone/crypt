const mongoose = require('mongoose');
const URI = process.env.MONGO_URI;

mongoose
  .connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log(err));

module.exports = mongoose;
