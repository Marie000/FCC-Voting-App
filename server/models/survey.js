var mongoose = require ('mongoose');

var SurveySchema = mongoose.Schema({
  title:{
    type:String,
    required:true,
    trim:true,
    minlength:1
  },
  _creator:{
    required: true,
    type: mongoose.Schema.Types.ObjectId
  },
  options:[
    {
      text:{
        type:String,
        required: true,
        trim: true,
        minlength:1
      },
      count:{
        type:Number,
        required: true,
        default: 0
      }
    }
  ],
  contributors:[
    {
      type: mongoose.Schema.Types.ObjectId
    }
  ],
  endDate: {
    type: Date
  }
})

var Survey = mongoose.model('Survey',SurveySchema);

module.exports = {Survey:Survey};