const { model, Schema } = require('mongoose');

// we can specify required for a field here but we can even do it in graphQl

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String
});

module.exports = model('User', userSchema);

