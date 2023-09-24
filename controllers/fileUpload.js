/* eslint-disable prettier/prettier */
const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        // return cb(null, "./resources/images/")
        return cb(null, 'G:\\Storage\\');
    },
    filename(req, file, cb) {
        return cb(null, `${file.originalname}`);
    },
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.send('successfully uploaded!');
});

module.exports = router;
