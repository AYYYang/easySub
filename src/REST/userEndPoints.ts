import {UserSchema} from "../models/user";
import * as mongoose from "mongoose";
import {Response, Request, NextFunction} from "express";

const UserMongoModel = mongoose.model('user', UserSchema);

export class userEndPoints {

    public addNewUser(req: Request, res: Response) {
        let newUser = new UserMongoModel(req.body);

        newUser.save(
        ).then((response) => {
            console.info("UserEndpoints::addNewUser() - Successfully added a new user");
            res.status(200).send(response);
            }
        ).catch((err) => {
            console.error("UserEndpoints::addNewUser() - responding 400");
            res.status(400).send({error: `PUT error: ${err.message}`});
            }
        )
    }
}
