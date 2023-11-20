const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const app = express();
const port = 4000;

const uri = "mongodb+srv:@todoer.55a4wy1.mongodb.net/?retryWrites=true&w=majority"

const connectionParams = {
  useNewUrlParser:true,
  useUnifiedTopology:true
}

mongoose.connect(uri).then(()=>{
  console.log("Connected to DB")
  app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
}).catch((e) => {
  console.log(e);
})

app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
  username:String,
  password:String,
  email:String,
});

const User = mongoose.model("User",userSchema);


const todosSchema = new mongoose.Schema({
    userId:String,
    todos:[
      {
        id:Number,
        text:String,
        checked:Boolean,
      }
    ]
});

const Todos = mongoose.model("Todos",todosSchema);


app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const userexist = await User.findOne({username}).exec();
  if (userexist){
    res.status(500);
    res.json({
      message:"user already exists"
    });
    return;
  }
  const user = new User({username,password,email});
  await user.save();
  console.log("we are here");
  res.json({ message: "succes" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({username}).exec();
  if (!user || user.password !== password){
    res.status(401);
    res.json({
      message:"invalid login "
    });
    return;
  }
  console.log("we are here in login");
  res.json({ message: "succes" });
});


app.post("/todos",async (req,res) => {
  const {authorization} = req.headers;
  const [, token] = authorization.split(" ");
  const [username,password] = token.split(":");
  const todosItems = req.body;
  const user = await User.findOne({username}).exec();
  if (!user || user.password !== password){
    res.status(403);
    res.json({
      message:"invalid acess "
    });
    return;
  }

  const todos = await Todos.findOne({userId: user._id}).exec();
  if (!todos) {
    await Todos.create({
      userId:user._id,
      todos:todosItems,
    })
  }else {
    todos.todos = todosItems;
    await todos.save();
  }
  res.json(todos);
});


app.get("/todos",async (req,res) => {
  const {authorization} = req.headers;
  const [, token] = authorization.split(" ");
  const [username,password] = token.split(":");
  const todosItems = req.body;
  const user = await User.findOne({username}).exec();
  if (!user || user.password !== password){
    res.status(403);
    res.json({
      message:"invalid acess "
    });
    return;
  }
  const {todos} = await Todos.findOne({userId: user._id}).exec();
  if (!todos) {
    await Todos.create({
      userId:user._id,
      todos:[],
    })}
  res.json({
    message:todos
  });
});

