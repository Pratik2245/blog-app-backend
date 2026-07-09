require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes')
const commentRoutes = require("./routes/commentRoutes")
const blogRoutes = require("./routes/blogRoutes")
const app = express();
const userRoutes =
    require("./routes/userRoutes");

app.use(

    cors({
        origin: [
            "http://localhost:4200",
            "https://blog-app-client-gwsm.vercel.app"
        ],
        credentials: true,
    })
);
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
});
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDb connected successfully ');
    }).catch((err) => {
        console.log(err);
    });

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use('/api/blogs', blogRoutes)
app.use("/api/comments", commentRoutes)
app.use(
    "/api/users",
    userRoutes
);

app.listen(process.env.PORT, () => {
    console.log(
        `Server running on port ${process.env.PORT}`
    );
})