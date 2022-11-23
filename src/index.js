import express from "express";
import dotenv from "dotenv";
import connectdb from "./services/mongoDB/connectdb"
dotenv.config()
const { User } = require("../mongoDB/models/user");
const { Todos } = require("../mongoDB/models/todos");

const app = express();
const port = process.env.PORT || 3000;

connectdb();

app.use(express.json())

app.post('/addtodos', async (req,res) => {
  try {
    const { authorization } = req.headers;
    const [, token] = authorization.split(" ");
    const [username, password] = token.split(":");
    const todosItems = new req.body;
    const user = await User.findOne({ username }).exec();
    if (!user || user.password !== password) {
      res.status(403);
      res.json({
        message: "invalid access",
      });
      return;
    }
    const todos = await Todos.findOne({ username });
    if (!todos) {
      await Todos.create({
        userId: user._id,
        todos: todosItems,
      });
    } else {
      todos.todos = todosItems;
      await todos.save();
    }
    res.json(todosItems);
  } catch (error) {
    console.log(error)
    res.send(error.message)
  }
})

app.get('/login/:email',async (req,res) => {
  try {
    const { email } = req.params
    const user = await User.findOne({ email })
    if(!(user)){
      res.send("user does not exist, Please register first")
    }else{
      console.log(user)
      res.send(user)
    }
  } catch (error) {
    console.log(error)
    res.send(error.message)
  }
})

app.post('/signup',async (req,res) => {
  try {
    const user = new User(req.body)
    console.log(user)
    await user.save()
    res.send("Signed in successfully")
  } catch (error) {
    console.log(error)
    res.send(error.message)
  }
})

// console.log(User.username);

app.listen(port, (req,res) => {
    console.log(`The server is running at ${port}`)
})
