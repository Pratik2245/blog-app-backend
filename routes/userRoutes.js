const express =
    require("express");

const router =
    express.Router();

const authMiddleware =
    require(
        "../middleware/authMiddleware"
    );

const {
    getProfile,
    updateProfile,
    getMyBlogs,
    getDashboard
} = require(
    "../controllers/userController"
);

router.get(
    "/profile",
    authMiddleware,
    getProfile
);

router.put(
    "/profile",
    authMiddleware,
    updateProfile
);

router.get(
    "/my-blogs",
    authMiddleware,
    getMyBlogs
);

router.get(
    "/dashboard",
    authMiddleware,
    getDashboard
);

module.exports =
    router;