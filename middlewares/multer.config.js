import multer, {diskStorage} from "multer";
import {join, dirname, extname } from "multer";
import {fileUrlToPath } from "url";

 const MIME_TYPES = { "image/jpg": "jpg", "image/jpeg": "jpg", "image/png": "png" }

 export default function(image,size){
    return multer({
    storage: diskStorage({
        destination: (req,file, callback) => {
            const _dirname = dirname(fileUrlToPath(import.meta.url));
            callback(null,join(_dirname,"../public/images"));
        },
        filename:(req,file, callback) => {
            const name = file.originalname.split(" ").join("_");
            const extension = MIME_TYPES[file.mimetype]
            callback(null,name + Date.now() + "." + extname(file.originalname));
        }

    }),
    limits: size
 }).single(image);
}