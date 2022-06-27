//import api from "../../../services/api";
import TokenService from "../../../services/token";
import imageCompression from 'browser-image-compression';
import S3 from "aws-s3";
import * as AWSkeys from "../../../services/AWSkeys"
import api from "../../../services/api";

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
            const newdata = {
    "user": {
        "donorInfo": {
            "location": "World",
            "age": "99",
            "bio": "Hi."
        },
        "zelleInfo": {
            "email": "zelle@test.com",
            "name": "nameee",
            "isAccepting": true
        },
        "role": "user",
        "email": "jangbel99@gmail.com",
        "firstName": "Jang",
        "lastName": "Belche",
        "phone": "123",
        "address": "home",
        "IDNumber": "123456",
        "airTMNum": "fsdv@sdc.com",
        "reserveUsername": "reserve"
    },
    "campaigns": [
        {
            "targetAmount": 5000,
            "country": "Venezuela",
            "approved": true,
            "completed": false,
            "withdrawn": 0,
            "disabled": false,
            "slug": "testttt",
            "_user": "6238eee91ce80141908c81a5",
            "title": "Approved Campaign with Zelle",
            "category": "healthcare",
            "description": "Please work",
            "story": "Hello there",
            "itemizedBudget": "lots of it",
            "pictures": [],
            "supportDocs": [],
            "updates": [],
            "donations": [
                null,
                {
                    "amount": 500,
                    "tip": 0,
                    "isP2P": false,
                    "isAnonymous": false,
                    "name": "asf",
                    "status": "success",
                    "comment": ""
                },
                {
                    "amount": 5,
                    "tip": 0,
                    "isP2P": false,
                    "isAnonymous": false,
                    "name": "Jango test",
                    "status": "success",
                    "comment": "test donation"
                },
                {
                    "amount": 1,
                    "tip": 0,
                    "status": "success",
                    "comment": "",
                    "isP2P": false,
                    "isAnonymous": true
                },
                {
                    "amount": 1,
                    "tip": 0,
                    "status": "success",
                    "comment": "",
                    "isP2P": false,
                    "isAnonymous": true
                },
                null,
                null,
                null,
                null
            ],
            "createdAt": "2022-03-23T19:15:10.675Z",
            "updatedAt": "2022-03-23T19:15:10.675Z",
            "personalID": [],
            "raised": 500,
            "zelleRaised": 10,
            "percentage": 0.24,
            "created": "23/03/2022"
        },
        {
            "targetAmount": 210,
            "country": "Venezuela",
            "approved": false,
            "completed": false,
            "withdrawn": 0,
            "disabled": false,
            "slug": "test2",
            "_user": "6238eee91ce80141908c81a5",
            "title": "Campaign in revision process",
            "category": "nutrition",
            "description": "pls help",
            "story": "oh yeah",
            "itemizedBudget": "lots",
            "pictures": [],
            "supportDocs": [],
            "updates": [],
            "donations": [],
            "createdAt": "2022-03-23T19:21:15.689Z",
            "updatedAt": "2022-03-23T19:21:15.689Z",
            "personalID": [],
            "raised": 0,
            "zelleRaised": 0,
            "percentage": 0,
            "created": "23/03/2022"
        },
        {
            "targetAmount": 210,
            "country": "Venezuela",
            "approved": false,
            "completed": false,
            "withdrawn": 0,
            "disabled": true,
            "slug": "test2",
            "_user": "6238eee91ce80141908c81a5",
            "title": "Rejected campaign ",
            "category": "education",
            "description": "pls help",
            "story": "oh yeah",
            "itemizedBudget": "lots",
            "pictures": [],
            "supportDocs": [],
            "updates": [],
            "donations": [],
            "createdAt": "2022-03-23T19:21:15.689Z",
            "updatedAt": "2022-03-23T19:21:15.689Z",
            "personalID": [],
            "raised": 0,
            "zelleRaised": 0,
            "percentage": 0,
            "created": "23/03/2022"
        },
        {
            "targetAmount": 333,
            "country": "Venezuela",
            "approved": true,
            "completed": false,
            "withdrawn": 0,
            "disabled": false,
            "slug": "lets-go",
            "_user": "6238eee91ce80141908c81a5",
            "title": "Help Jango (no zelle)",
            "category": "education",
            "description": "dsc",
            "story": "sdcs",
            "itemizedBudget": "sdc",
            "mainPicture": {
                "url": "https://assets.yakera.org/testing/umbc_me.jpg"
            },
            "pictures": [
                {
                    "url": "https://assets.yakera.org/yakera/2.jpg"
                },
                {
                    "url": "https://assets.yakera.org/yakera/4.jpg"
                }
            ],
            "supportDocs": [
                {
                    "url": "https://assets.yakera.org/yakera/webYakera.png"
                },
                {
                    "url": "https://assets.yakera.org/yakera/hack.png"
                },
                {
                    "url": "https://assets.yakera.org/yakera/6.jpg"
                },
                {
                    "url": "https://assets.yakera.org/yakera/6 - Copy.jpg"
                }
            ],
            "updates": [],
            "donations": [],
            "createdAt": "2022-03-29T15:37:49.511Z",
            "updatedAt": "2022-03-29T15:37:49.511Z",
            "personalID": [],
            "raised": 30700000,
            "zelleRaised": 0,
            "percentage": 0,
            "created": "29/03/2022"
        },
        {
            "targetAmount": 2222,
            "country": "Venezuela",
            "approved": true,
            "completed": false,
            "withdrawn": 100,
            "disabled": false,
            "slug": "pls-work",
            "_user": "6238eee91ce80141908c81a5",
            "title": "campaign with zelle and partial withdraw",
            "category": "healthcare",
            "description": "sdfc",
            "story": "",
            "itemizedBudget": "sdf",
            "mainPicture": {
                "url": "https://assets.yakera.org/yakera/cami-img.jpg"
            },
            "pictures": [
                {
                    "url": "https://assets.yakera.org/testing/hack.png"
                },
                {
                    "url": "https://assets.yakera.org/testing/4.jpg"
                }
            ],
            "supportDocs": [
                {
                    "url": "https://assets.yakera.org/testing/phoneController.png"
                },
                {
                    "url": "https://assets.yakera.org/testing/hackKosice.png"
                },
                {
                    "url": "https://assets.yakera.org/testing/7.jpg"
                },
                {
                    "url": "https://assets.yakera.org/testing/7 - Copy.jpg"
                }
            ],
            "updates": [],
            "donations": [],
            "createdAt": "2022-03-29T15:40:48.168Z",
            "updatedAt": "2022-03-29T15:40:48.168Z",
            "personalID": [],
            "raised": 100,
            "zelleRaised": 150,
            "percentage": 0,
            "created": "29/03/2022"
        },
        {
            "targetAmount": 2222,
            "country": "Venezuela",
            "approved": true,
            "completed": false,
            "withdrawn": 100,
            "disabled": false,
            "slug": "pls-work",
            "_user": "6238eee91ce80141908c81a5",
            "title": "campaign without zelle and with partial withdraw",
            "category": "healthcare",
            "description": "sdfc",
            "story": "",
            "itemizedBudget": "sdf",
            "mainPicture": {
                "url": "https://assets.yakera.org/yakera/cami-img.jpg"
            },
            "pictures": [
                {
                    "url": "https://assets.yakera.org/testing/hack.png"
                },
                {
                    "url": "https://assets.yakera.org/testing/4.jpg"
                }
            ],
            "supportDocs": [
                {
                    "url": "https://assets.yakera.org/testing/phoneController.png"
                },
                {
                    "url": "https://assets.yakera.org/testing/hackKosice.png"
                },
                {
                    "url": "https://assets.yakera.org/testing/7.jpg"
                },
                {
                    "url": "https://assets.yakera.org/testing/7 - Copy.jpg"
                }
            ],
            "updates": [],
            "donations": [],
            "createdAt": "2022-03-29T15:40:48.168Z",
            "updatedAt": "2022-03-29T15:40:48.168Z",
            "personalID": [],
            "raised": 200,
            "zelleRaised": 0,
            "percentage": 0,
            "created": "29/03/2022"
        }
    ]
}
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
    inverse(obj){
        var retobj = {};
        for(var key in obj){
          retobj[obj[key]] = key;
        }
        return retobj;
      }
        
}


const userServices = new UserService();

// export the class instance, so we can import and use it anywhere
export { userServices };