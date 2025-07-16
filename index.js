const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Chat = require("./models/chat");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set(" view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

// const chat1 = new Chat({
//   from: "sonu",
//   to: "om",
//   message: " send me notes",
//   created_at: new Date(),
// });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsApp");
}
// chat1
//   .save()
//   .then(() => {
//     console.log("chat saved");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// NEW ROUTE
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/chat", (req, res) => {
  let { from, to, msg } = req.body;
  let chat = new Chat({
    from: from,
    message: msg,
    to: to,
    created_at: new Date(),
  });
  // console.log(chat);
  chat
    .save()
    .then(() => {
      console.log("chat saved");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

//Index route for getting all the chats
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  // console.log(chats);
  res.render("index.ejs", { chats });
});

//EDIT ROUTE
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let editChat = await Chat.findById(id);
  res.render("edit.ejs", { editChat });
});

//update route
app.put("/chat/:id", async (req, res) => {
  let { id } = req.params;
  let { message: newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { message: newMsg },
    { runValidators: true, new: true }
  );
  console.log(updatedChat);
  res.redirect("/chats");
});
//DESTROY ROUTE

app.delete("/chat/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});

app.get("/", (req, res) => {
  res.send("working");
});

app.listen(8080, () => {
  console.log("server is listening on the port number 8080");
});
