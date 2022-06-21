import api from "../../../services/api";
import TokenService from "../../../services/token";
import imageCompression from 'browser-image-compression';
import S3 from "aws-s3";
import * as AWSkeys from "../../../services/AWSkeys"


const config_aws = {
    bucketName: AWSkeys.S3_BUCKET,
    region: AWSkeys.REGION,
    dirName: 'profile-pictures',
    accessKeyId: AWSkeys.ACCESS_KEY,
    secretAccessKey: AWSkeys.SECRET_ACCESS_KEY
}
const S3Client = new S3(config_aws);
class UserService{
    async getUserData() {
        try {
            const res = await api.get('/profile');
            // const newdata = {
            //     "user":{
            //     "donorInfo": {
            //         "location": "World",
            //         "age": "23",
            //         "bio": "My bioooo",
            //         "preference": "email"
            //     },
            //     "zelleInfo": {
            //         "email": "zelle",
            //         "name": "jango",
            //         "isAccepting": true
            //     },
            //     "role": "donor",
            //     "email": "jangbel99@gmail.com",
            //     "firstName": "Jang",
            //     "lastName": "Belche",
            //     "phone": "253464946",
            //     "address": "UK",
            //     "profilePicture": "https://yakera-files.s3.us-east-2.amazonaws.com/profile-pictures/gT8tvxPLrKAq2SXUQ2KAoR.png",
            //     "IDNumber": "123456",
            //     "airTMNum": "fsdv@sdc.com",
            //     "reserveUsername": "yfgdfb"
            // }
            // }
            return res.data.data
            //return newdata
        } catch (e) {
            throw e 
        }
    }
    timedOut(){
        TokenService.removeAccessToken()
        TokenService.removeRefreshToken()
        localStorage.removeItem("email")
        localStorage.removeItem("name")
        window.location.href="/login"
    }

    async compressFile(img) {
        const options = {
          maxSizeMB: 1,
          useWebWorker: true
        }
        try {
          const compressedFile = await imageCompression(img, options);

          return compressedFile
        } catch (error) {
          console.error(error);
          return img
        }

    }
    async uploadtoAWS(file){
        try{
            const res = await S3Client.uploadFile(file)
            return "https://assets.yakera.org/" + res.key
        }
        catch(error){
            console.error(error)
            return error
        }
    }
}


const userServices = new UserService();

// export the class instance, so we can import and use it anywhere
export { userServices };