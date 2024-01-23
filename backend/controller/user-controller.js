//This file is for API's
//instaling jsonwebtoken for jwt authetication

import bcrypt from 'bcrypt';
import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';//whenever we want to import a value from env
import Token from '../model/token.js';

dotenv.config();//To initialize dotenv

export const signupUser = async (request, response) => {
    try {
        //const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        const user = {
            username: request.body.username,
            name: request.body.name,
            password: hashedPassword
        }

        const newUser = new User(user);//validate
        //newuser is validated object
        await newUser.save();
        //function in mongodb to save object in database
        //await is used since it is a async request

        return response.status(200).json({ msg: 'signup successfull' })

    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            response.render('/signup', { errors: error.errors });
        }
        else {
            console.error(error);
            return response.status(500).json({ msg: 'Error while signup' })
        }
    }
};
//500 internal server error
//npm i bcrypt for encryption


//whenever you make a req in database it is async
export const loginUser = async (request, response) => {
    //To check if the user exists
    let user = await User.findOne({ username: request.body.username });
    //find method returns the complete object from the database
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match' });
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password)
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });

            //with the help of refresh token you can regenrate the access token
            //referesh token is used as accesstoken is not permanent and expires after expiry time which is 15 mins

            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            //as the access token keeps on expiring so we have to store the refresh token only

            const newToken = new Token({ token: refreshToken })
            await newToken.save();//to save the token in dataase


            return response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username });

        } else {
            return response.status(400).json({ msg: 'Password does not match' });
        }
    } catch (error) {
        return response.status(500).json({ msg : 'Error while logging in User'});
    }


}

//require('crypto').randomBytes(64).toString('hex')
//to randomly generate bytes