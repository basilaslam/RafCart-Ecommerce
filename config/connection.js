const mongoose = require('mongoose');
const user_schema = require('../models/user_schema');
const admin_schema = require('../models/admin_schema');

module.exports.database = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(
      'mongodb+srv://basilaslamnp:jvRq1L63xNDTw5r6@cluster0.bzlrifq.mongodb.net/RafCart?retryWrites=true&w=majority',
      connectionParams
    ).then(async (connection) => {
        console.log('Database connected');
    }).catch((err) => {
        console.log(err);
    })
    
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};
