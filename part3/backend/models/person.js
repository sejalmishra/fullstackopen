const mongoose = require('mongoose');

const phonebookSchema = new mongoose.Schema({
    name: {
    type: String,
    minLength: 3,
    require: true,
    },
    number: {
    type: String,
    min: [8, 'too few digits in number'],
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{5,15}/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
    },
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('PhoneBook', phonebookSchema)

