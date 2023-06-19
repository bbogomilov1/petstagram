const Photo = require("../models/photoModel");

exports.getAll = () => Photo.find().populate("owner");

exports.getOne = (photoId) => Photo.findById(photoId).populate("owner");

exports.getByOwner = (userId) => Photo.find({ owner: userId });

exports.create = (photoData) => Photo.create(photoData);

exports.edit = (photoId, photoData) =>
  Photo.findByIdAndUpdate(photoId, photoData);

exports.addComment = async (photoId, commentData) => {
  const photo = await Photo.findById(photoId);

  photo.commentList.push(commentData);

  return photo.save();
};

exports.delete = (photoId) => Photo.findByIdAndDelete(photoId);
