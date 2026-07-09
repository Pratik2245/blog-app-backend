const Blog = require("../models/Blog");
const User = require("../models/User");

exports.getProfile =
    async (req, res) => {

        try {

            const user =
                await User.findById(
                    req.user.id
                ).select("-password");

            res.status(200).json(
                user
            );

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });

        }

    };


exports.updateProfile = async (req, res) => {

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            req.body,
            {
                new: true
            }
        ).select("-password");

        res.status(200).json(
            updatedUser
        );
    } catch (error) {
        res.status(500).json({
            message:
                error.message
        });
    }
};


exports.getMyBlogs =
    async (req, res) => {

        try {

            const blogs =
                await Blog.find({
                    author: req.user.id
                })
                    .sort({
                        createdAt: -1
                    });

            res.status(200).json(
                blogs
            );

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });

        }

    };


exports.getDashboard =
    async (req, res) => {

        try {

            const totalBlogs =
                await Blog.countDocuments({
                    author: req.user.id
                });

            const blogs =
                await Blog.find({
                    author: req.user.id
                });

            const totalLikes =
                blogs.reduce(
                    (sum, blog) =>
                        sum + blog.likes.length,
                    0
                );

            res.status(200).json({
                totalBlogs,
                totalLikes
            });

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });

        }

    };