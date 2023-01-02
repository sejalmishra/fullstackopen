const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const PhoneBook = require('./models/person')
const app = express()

const url =
  "mongodb+srv://sejal:sejal@cluster0.4fabis1.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(url, {
    useNewUrlParser: true,
  })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
//npm run dev -> to start backend server

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`listening on port ${PORT}`);

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(morgan(":method :url :body"));

app.get("/api/persons", (request, response) => {
  PhoneBook.find({}, (err, result) => {
    if (err) {
      response.send(err);
    }
    response.json(result);
  });
});

app.get("/info", (request, response) => {
  PhoneBook.find({}, (err, result) => {
    if (err) {
      response.send(err);
    }
    response.send(
      `<div><p>Phonebook has info for ${
        result.length
      } people</p><p>${new Date()}</p></div>`
    );
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  PhoneBook.findById(id, function (err, data) {
    if (err) {
      response.status(404).end();
    } else {
      response.json(data);
    }
  });
});

app.post("/api/persons", async (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }
  let phoneExists = await PhoneBook.exists({ number: body.number });
  if (phoneExists) {
    console.log("exists");
    return response.status(400).json({
      error: "number already exists",
    });
  }
  const person = new PhoneBook({
    name: body.name,
    number: body.number,
  });
  try {
    const result = await person.save();
    response.json(result);
  } catch (err) {
    response.status(400).send(err);
  }
});

app.delete("/api/persons/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await PhoneBook.findByIdAndDelete(id).exec();
    res.json("deleted");
  } catch (err) {
    console.log(err);
  }
});

app.put("/api/persons/:id", async (req, res) => {
  const id = req.params.id;
  const newNumber = req.body.number;
  try {
    const data = await PhoneBook.findByIdAndUpdate(
      id,
      { number: newNumber },
      { new: true }
    );
    if (data) {
      res.json(data);
    }
  } catch (err) {
    console.log(err);
  }
});
