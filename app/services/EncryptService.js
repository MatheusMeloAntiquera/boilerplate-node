import HmacSHA512 from 'crypto-js/sha512'

class EncryptService {
    constructor(){
        this.secret = process.env.SECRET_API;
    }

    encryptString(string){
        return HmacSHA512(string, this.secret).toString()
    }

    compareString(string, hash){
        const encryptString = HmacSHA512(string, this.secret).toString();
        return encryptString == hash;
    }
}

export default new EncryptService;