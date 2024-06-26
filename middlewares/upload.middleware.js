const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

exports.uploadFiles = upload.array("files", 3);

exports.uploadImage = upload.single("image");
