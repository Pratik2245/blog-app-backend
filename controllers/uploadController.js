exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }
        res.status(200).json({
            success: true,
            imageUrl:
                `/uploads/${req.file.filename}`
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};