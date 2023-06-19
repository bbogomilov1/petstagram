const photoManager = require("../managers/photoManager");
const { getErrorMessage } = require("../utils/errorHelpers");
const { isAuth } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/catalog", async (req, res) => {
  const photos = await photoManager.getAll().lean();

  res.render("photos/catalog", { photos });
});

router.get("/create", isAuth, (req, res) => {
  res.render("photos/create");
});

router.post("/create", isAuth, async (req, res) => {
  const photoData = { ...req.body, owner: req.user._id };

  try {
    await photoManager.create(photoData);

    res.redirect("/photos/catalog");
  } catch (error) {
    res.render("photos/create", { error: getErrorMessage(error), photoData });
  }
});

router.get("/:photoId/details", async (req, res) => {
  const photoId = req.params.photoId;
  const photo = await photoManager
    .getOne(photoId)
    .populate("commentList.user")
    .lean();
  const isOwner = req.user?._id == photo.owner._id;

  res.render("photos/details", { photo, isOwner });
});

router.get("/:photoId/delete", isAuth, async (req, res) => {
  const photoId = req.params.photoId;

  try {
    await photoManager.delete(photoId);

    res.redirect("/photos/catalog");
  } catch (error) {
    res.render("photos/details", {
      error: "Could not delete photo :(",
    });
  }
});

router.get("/:photoId/edit", isAuth, async (req, res) => {
  const photoId = req.params.photoId;
  const photo = await photoManager.getOne(photoId).lean();

  res.render("photos/edit", { photo });
});

router.post("/:photoId/edit", isAuth, async (req, res) => {
  const photoId = req.params.photoId;
  const photoData = req.body;

  try {
    await photoManager.edit(photoId, photoData);

    res.redirect(`/photos/${photoId}/details`);
  } catch (error) {
    res.render(`photos/details`, {
      error: "Could not edit photo :(",
      ...photoData,
    });
  }
});

router.post("/:photoId/comment", isAuth, async (req, res) => {
  const photoId = req.params.photoId;
  const { comment } = req.body;
  const user = req.user._id;

  await photoManager.addComment(photoId, { user, comment });

  res.redirect(`/photos/${photoId}/details`);
});

module.exports = router;
