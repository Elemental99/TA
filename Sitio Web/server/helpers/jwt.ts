import jwt from 'jwt-simple';
import moment from 'moment';

const secret = 'TA_6A';

export const createToken = function (cliente: any): any {
    const payload: any = {
        sub: cliente._id,
        iat: moment().unix,
        exp: moment().add(30, 'days').unix(),
    };
    
    return jwt.encode(payload, secret);
};
