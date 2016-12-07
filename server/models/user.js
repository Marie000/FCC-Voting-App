var mongoose = require('mongoose');
var validator = require('validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var UserSchema = mongoose.Schema({
  email: {
    required: true,
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    },
    unique: true
  },
  password: {
    required: true,
    type: String,
    minLength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})


UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id:user._id.toHexString(), access:access},"secret123").toString();
  // remove any 'auth' token before pushing the new one
  _.pullAllBy(user.tokens,[{'access':'auth'}],'auth');
  user.tokens.push({access:access, token:token});
  return user.save().then(function(){
    return token
  }).catch(function(err){res.status(400).send(err)})
}

//middleware to salt and hash passwords
UserSchema.pre('save',function(next){
  var user = this;
  if(user.isModified('password')){
    bcrypt.genSalt(10,function(err,salt){
      bcrypt.hash(user.password, salt, function(err,hash){
        user.password=hash;
        next();
      })
    })
  } else {
    next();
  }
})

UserSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token,'secret123')
  } catch(e) {
    return Promise.reject('verify did not work');
  }
  return User.findOne({_id:decoded._id, 'tokens.token':token, 'tokens.access':'auth'});
}


var User = mongoose.model('User',UserSchema);

module.exports = {User:User};