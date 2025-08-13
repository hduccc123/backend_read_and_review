const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Lấy đường dẫn tuyệt đối tới src/public/images
        const uploadPath = path.join(__dirname, '../public/images');

        // Nếu thư mục chưa tồn tại -> tự tạo
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // tên file = timestamp + đuôi ảnh
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // giới hạn 2MB
    fileFilter: (req, file, cb) => {
        const allowed = /jpeg|jpg|png/;
        const ext = allowed.test(path.extname(file.originalname).toLowerCase());
        const mime = allowed.test(file.mimetype);
        if (ext && mime) {
            cb(null, true);
        } else {
            cb(new Error('Chỉ chấp nhận ảnh JPG, JPEG, PNG'));
        }
    }
});

module.exports = upload;
