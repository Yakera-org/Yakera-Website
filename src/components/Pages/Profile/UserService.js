import api from "../../../services/api";
import TokenService from "../../../services/token";

class UserService{
    async getUserData() {
        try {
            const res = await api.get('/profile');
            const newdata = {
                "user":{
                "donorInfo": {
                    "location": "World",
                    "age": "99",
                    "bio": "Hi.",
                    "preference": "email"
                },
                "zelleInfo": {
                    "email": "sdfdsgf",
                    "name": "",
                    "isAccepting": false
                },
                "role": "user",
                "email": "jangbel99@gmail.com",
                "firstName": "Jang",
                "lastName": "Belche",
                "phone": "123",
                "address": "UK",
                "profilePicture": "https://yakera-files.s3.us-east-2.amazonaws.com/profile-pictures/gT8tvxPLrKAq2SXUQ2KAoR.png",
                "IDNumber": "123456",
                "airTMNum": "fsdv@sdc.com",
                "reserveUsername": ""
            }
            }
            //return res.data.data
            return newdata
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
}


const userServices = new UserService();

// export the class instance, so we can import and use it anywhere
export { userServices };