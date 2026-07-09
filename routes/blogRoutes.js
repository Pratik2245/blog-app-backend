const express =
    require("express");

const router =
    express.Router();

const authMiddleware =
    require(
        "../middleware/authMiddleware"
    );

const {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    toggleLike,
    getMyBlogs
} = require(
    "../controllers/blogController"
);

router.post(
    "/",
    authMiddleware,
    createBlog
);

router.get(
    "/",
    getBlogs
);

router.get(
    "/myblogs",
    authMiddleware,
    getMyBlogs
);

router.get(
    "/:id",
    authMiddleware,
    getBlogById
);

router.put(
    "/:id",
    authMiddleware,
    updateBlog
);

router.delete(
    "/:id",
    authMiddleware,
    deleteBlog
);

router.post(
    "/:id/like",
    authMiddleware,
    toggleLike
);

module.exports =
    router;