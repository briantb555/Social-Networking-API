import { User } from "../models/index.js";
import { Request, Response } from "express";

export const getAllUsers = async (_: Request, res: Response) => {
    try {
        const users = await User.find()
            .populate( 'thoughts', 'friends' )
            .select( '-__v' );
        res.json( users );
    } catch (err) {
        console.log( err );
        res.status( 500 ).json( err );
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne( { _id: req.params.id } )
            .populate( 'thoughts', 'friends' )
            .select( '-__v' );
        if ( !user ) {
            res.status( 404 ).json( { message: 'No user found with this id!' } );
            return;
        }
        res.json( user );
    } catch (err) {
        console.log( err );
        res.status( 500 ).json( err );
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create( req.body );
        res.json( user );
    } catch (err) {
        console.log( err );
        res.status( 500 ).json( err );
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if ( !user ) {
            res.status( 404 ).json( { message: 'No user found with this id!' } );
            return;
        }
        res.json( user );
    } catch (err) {
        console.log( err );
        res.status( 500 ).json( err );
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete( { _id: req.params.id } );
        if ( !user ) {
            res.status( 404 ).json( { message: 'No user found with this id!' } );
            return;
        }
        res.json( user );
    } catch (err) {
        console.log( err );
        res.status( 500 ).json( err );
    }
}

//add friend
export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        if ( !user ) {
            res.status( 404 ).json( { message: 'No user found with this id!' } );
            return;
        }
        res.json( user );
    } catch (err) {
        console.log( err );
        res.status( 500 ).json( err );
    }
}

//remove friend
export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        if ( !user ) {
            res.status( 404 ).json( { message: 'No user found with this id!' } );
            return;
        }
        res.json( user );
    } catch (err) {
        console.log( err );
        res.status( 500 ).json( err );
    }
}
                