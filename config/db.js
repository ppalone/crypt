const mongoose = require('mongoose');
const URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@crypt.eqhl0.mongodb.net/<dbname>?retryWrites=true&w=majority`

mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

module.exports = mongoose;