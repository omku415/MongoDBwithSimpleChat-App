const mongoose = require("mongoose");
const Chat = require("./models/chat");

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

  async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsApp");
  }

let allChats=[{
  from: "sonu",
  to: "om",
  message: " send me notes",
  created_at: new Date(),
},
{
  from: "amoit",
  to: "omm",
  message: " send me pdf",
  created_at: new Date(),
},
{
  from: "mitthu",
  to: "kaju",
  message: " send me documents",
  created_at: new Date(),
},

]

Chat.insertMany(allChats);


 