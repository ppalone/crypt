const router = require("express").Router();
const ensureAuthenticated = require("../middlewares/auth").ensureAuthenticated;
const blogsController = require("../controllers/blogs/blogs");

router.use(ensureAuthenticated);

// Hack to make Delete and Edit requests from a tagss
router.use(function (req, res, next) {
  if (req.query._method === "DELETE" || req.query._method === "PATCH") {
    req.method = req.query._method;
    req.url = req.path;
  }
  next();
});

router
  .get("/", blogsController.getAllBlogs)
  .post("/", blogsController.createBlog)
  .get("/new", blogsController.getBlogForm)
  .get("/:id", blogsController.getBlogById)
  .get("/:id/edit", blogsController.getEditBlog)
  .patch("/:id/edit", blogsController.editBlog)
  .delete("/:id/delete", blogsController.deleteBlog);

module.exports = router;
