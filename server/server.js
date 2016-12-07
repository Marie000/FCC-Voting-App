var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('lodash');
var bcrypt = require('bcryptjs');
var path = require('path');

var {mongoose} = require('./database/database');
var {User} = require ('./models/user');
var {Survey} = require('./models/survey');
var {authenticate} = require('./middleware/authenticate');

var PORT = process.env.PORT || 9000;

app.use(express.static(__dirname+"/../index.html"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'x-auth, Content-Type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});



// USERS

// Create a user
app.post('/api/users', function(req,res){
  var body = _.pick(req.body,['email','password']);
  var newUser = new User(body);
  newUser.save().then(function(user){
    res.send(user);
  }).catch(function(e){
    res.status(400).send(e)
  })
});

//login
app.post('/api/users/login',function(req,res){
  User.findOne({email:req.body.email}).then(function(user){
    if(!user){
      return res.status(400).send('email invalid')
    }
    bcrypt.compare(req.body.password, user.password, function(err,response){
      if (response){
        user.generateAuthToken().then(function(token){
          res.header('x-auth',token).json(user);
        })
      } else {
        return res.status(400).json('wrong password')
      }
    })
  }).catch(function(e){
    res.status(400).send(e);
  })
});


app.get('/dashboard', authenticate, function(req,res){
  console.log('dashboard')
  res.send('this is the dashboard')
});

// GET Surveys
app.get('/api/surveys',function(req,res){
  Survey.find({}).then(function(list){
    res.send(list)
  })
});

// GET Survey
app.get('/api/surveys/:id',function(req,res){
  Survey.findOne({_id:req.params.id}).then(function(survey){
    if(!survey){return res.status(404).send('survey not found')}
    res.send(survey)
  }).catch(function(err){
    res.status(400).send(err)
  })
});

// POST new survey
app.post('/api/surveys', authenticate, function(req,res){
  var body = req.body;
  body._creator = req.user._id;
  var newSurvey = new Survey(body);
  newSurvey.save().then(function(survey){
    res.send(survey);
  }).catch(function(err){
    res.status(400).send(err)
  })
});

app.delete('/api/surveys/:id', authenticate, function(req,res){
  console.log(req.user._id);
  Survey.findOneAndRemove({_id:req.params.id, _creator:req.user._id}).then(function(survey){
    if(!survey){return res.status(404).send('survey not found or you are not the author')}
    res.send(survey)
  }).catch(function(err){
    res.status(400).send(err)
  })
});

// Submit answer - no body needed
app.put('/api/surveys/:survey_id/options/:option_id', function(req,res){
  var survey_id = req.params.survey_id;
  var option_id = req.params.option_id;
  Survey.findOne({_id:survey_id}).then(function(survey){
    if(!survey){return res.status(404).send('survey not found')}
    for (var x=0; x<survey.options.length; x++){
      if(survey.options[x]._id.equals(option_id)){
        survey.options[x].count++
      }
    }
    survey.save().then(function(survey){
      res.send(survey)
    }).catch(function(err){ res.status(400).send(err) })
  })
});

// POST new option for a survey
// body: {"text":String} - count will be set to 1
app.post('/api/surveys/:id/options', function(req,res){
  var body = _.pick(req.body,['text']);
  body.count = 1;
  Survey.findByIdAndUpdate(
    req.params.id,
    {$push: {'options': body}},
    {safe: true, new: true}
  ).then(function(survey){
    if(!survey){return res.status(404).send('survey not found')}
    res.send(survey)
  }).catch(function(err){
    res.status(400).send(err)
  })
});


app.listen(PORT,function(){
  console.log('server started on port '+PORT)
})
