//image is recieved from the frontend in the binary format
//so installed multer to handle multipart or  form data which is used for uploadinf files

import multer from 'multer';
import dotenv from 'dotenv';
import { GridFsStorage} from 'multer-gridfs-storage';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const storage = new GridFsStorage({
    url : `mongodb+srv://${username}:${password}@cluster0.h5n88jx.mongodb.net/?retryWrites=true&w=majority`,
    options : { useNewUrlParser : true },
    file : ( request, file) =>{
        const match =[ "image/png" , "image/jpg"];

        //if it doesnot exist in the array
        //file.memetype is used to check the extensions
        if ( match.indexOf(file.memeType) === -1){
            return `${Date.now()}-blog-${file.originalname}`;
        }

        return {
            bucketName:"photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }

    }
});
//the middleware uploads the image on mongoDB
export default multer({ storage });

