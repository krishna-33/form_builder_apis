const mongoose = require("mongoose");

const dbConnection = () => {
    mongoose.connect('mongodb+srv://krishna:krishna123@cluster0.tzpkfqe.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => {
    console.log("connection build");
}).catch(() => {
    console.log("connection failed");
})
}

module.exports = dbConnection