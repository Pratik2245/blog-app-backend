const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
    try {
        const { title,
            content,
            coverImage } = req.body;

        const blog = await Blog.create({
            title,
            content,
            coverImage,
            author: req.user.id,
            likes: [],
        });

        res.status(201).json(blog);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}


exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate(
                "author",
                "username email profileImage"
            )
            .sort({
                createdAt: -1
            });


        const response = blogs.map(blog => ({
            ...blog.toObject(),
            likeCount: blog.likes.length
        }));

        res.status(200).json(
            response
        );
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }


}

exports.getBlogById = async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id)
            .populate(
                "author",
                "username email profileImage"
            );

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        const userId = req.user.id;

        const alreadyViewed = blog.viewedBy.some(
            id => id.toString() === userId
        );

        if (!alreadyViewed) {

            blog.views++;

            blog.viewedBy.push(userId);

            await blog.save();

        }

        const response = {
            ...blog.toObject(),
            likeCount: blog.likes.length
        };

        res.status(200).json(response);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {

            return res.status(404).json({
                message: "Blog not found"
            });

        }

        if (
            blog.author.toString() !==
            req.user.id
        ) {

            return res.status(403).json({
                message: "Not authorized"
            });

        }
        const updatedBlog =
            await Blog.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

        res.status(200).json(
            updatedBlog
        );
    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
}







exports.deleteBlog = async (
    req,
    res
) => {

    try {

        const blog =
            await Blog.findById(
                req.params.id
            );

        if (!blog) {

            return res.status(404).json({
                message:
                    "Blog not found"
            });

        }

        if (
            blog.author.toString()
            !== req.user.id
        ) {

            return res.status(403).json({
                message:
                    "Not authorized"
            });

        } await blog.deleteOne();

        res.status(200).json({
            message:
                "Blog deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



exports.toggleLike = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message:
                    "Blog not found"
            })
        }

        const userId = req.user.id;


        const alreadyLiked = blog.likes.some(
            id => id.toString() === userId
        );

        if (alreadyLiked) {
            blog.likes.pull(userId);
        } else {
            blog.likes.push(userId);
        }

        await blog.save();

        res.status(200).json({
            message:
                alreadyLiked ?
                    "blog unliked"
                    : "blog liked",

            likeCount: blog.likes.length
        })
    } catch (error) {
        res.status(500).json({
            message:
                error.message
        });
    }
}

exports.getMyBlogs = async (req, res) => {
    try {

        const blogs = await Blog.find({
            author: req.user.id
        })
            .populate("author", "username email profileImage")
            .sort({ createdAt: -1 });

        const response = blogs.map(blog => ({
            ...blog.toObject(),
            likeCount: blog.likes.length
        }));

        res.status(200).json(response);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};