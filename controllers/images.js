const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CD_Cloud,
    api_key: process.env.CD_API_K,
    api_secret: process.env.CD_API_S
});

exports.upload = async (req, res) => {
    const result = await cloudinary.uploader.upload(req.body.image, {
        public_id: `${Date.now()}`,
        resource_type: "auto"
    });

    res.json({
        public_id: result.public_id,
        url: result.secure_url
    });
};

exports.remove = (req, res) => {
    let image_id = req.body.public_id;

    cloudinary.uploader.destroy(image_id, (err, result) => {
        if (err) return res.json({ success: false, err });
        res.send("ok");
    });
};