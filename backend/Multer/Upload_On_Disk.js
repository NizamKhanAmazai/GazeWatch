import multer from "multer";


const storage = multer.diskStorage(
    {
        destination: (req, file, cl)=>{
            cl(null, "./public")
        },
        filename: (req, file, cl) =>{
            cl(null, file.originalname)
        }
    }
)

const Local_Upload = multer({storage});

export default Local_Upload;