const mongoose = require('mongoose');

if(process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
}

const password = process.argv[2]

const url = `mongodb+srv://sejal:${password}@cluster0.4fabis1.mongodb.net/?retryWrites=true&w=majority`

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const PhoneBook = mongoose.model('PhoneBook', phonebookSchema)

mongoose.connect(url)
    .then((result) => {
        if(process.argv.length==3){
            PhoneBook.find({})
            .then(persons => {
                console.log("phonebook:")
                persons.forEach((person) => {
                    console.log(`${person.name} ${person.number}`);
                })
                return mongoose.connection.close()
            }) 
        }else{
        const newPerson = new PhoneBook({
            name: process.argv[3],
            number: process.argv[4]
        })
        return newPerson.save()
        }
    })
    .then((data) => {
        console.log(`added ${data.name} number ${data.number} to phonebook`)
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))