const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  imageUrl: {
    type: String,
    required: [true, "Link to image is required"],
    match: [/^https?:\/\//, "Invalid link to image"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: 1,
    max: 100,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minLength: 5,
    maxLength: 50,
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    minLength: 5,
    maxLength: 50,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  commentList: [
    {
      user: { type: mongoose.Types.ObjectId, ref: "User" },
      comment: {
        type: String,
        required: [true, "Text message is required"],
      },
    },
  ],
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
