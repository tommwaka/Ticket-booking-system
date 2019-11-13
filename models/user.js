import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      //let mongoose know that two models are related, it'll merge data automatically. I'm passing in the name of my other model that I've defined in event.js
      ref: "Event"
    }
  ]
});

export default model("User", userSchema);
