const express =
    require("express");

const router =
    express.Router();

const authMiddleware =
    require(
        "../middleware/authMiddleware"
    );


const { addComment, deleteComment, getComments } = require("../controllers/commendController")





router.post(
    "/",
    authMiddleware,
    addComment
);


router.get(
    "/:blogId",
    getComments
);


router.delete(
    "/:id",
    authMiddleware,
    deleteComment
);


module.exports =
    router;