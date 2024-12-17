import { Thought, User } from "../models/index.js";
import { Request, Response } from "express";

export const getAllThoughts = async (_: Request, res: Response) => {
    try {
        const thoughts = await Thought.find()
            .select( '-__v' );
        res.json( thoughts );
    } catch (err) {
        console.log( err );
        res.status( 500 ).json( err );
    }
}

export const getThoughtById = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne( { _id: req.params.id } )
            .select( '-__v' );
        if ( !thought ) {
            res.status( 404 ).json( { message: 'No thought found with this id!' } );
            return;
        }
        res.json( thought );
    } catch (err) {
        console.log( err );
        res.status( 500 ).json( err );
    }
}

export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create( req.body );
//add thought to user
        await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thought._id } },
            { new: true }
        );
        res.json( thought );
    } catch (err) {
        console.log( err );
        res.status( 500 ).json( err );
    }
}

export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if ( !thought ) {
            res.status( 404 ).json( { message: 'No thought found with this id!' } );
            return;
        }
        res.json( thought );
    } catch (err) {
        console.log( err );
        res.status( 500 ).json( err );
    }
}

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete( { _id: req.params.id } );
        if ( !thought ) {
            res.status( 404 ).json( { message: 'No thought found with this id!' } );
            return;
        }
        //remove thought from user
        await User.findOneAndUpdate(
            { thoughts: req.params.id },
            { $pull: { thoughts: req.params.id } }
        );
        res.json( thought );
    } catch (err) {
        console.log( err );
        res.status( 500 ).json( err );
    }
}

export const addReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        );
        if ( !thought ) {
            res.status( 404 ).json( { message: 'No thought found with this id!' } );
            return;
        }
        res.json( thought );
    } catch (err) {
        console.log( err );
        res.status( 500 ).json( err );
    }
}

export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        if ( !thought ) {
            res.status( 404 ).json( { message: 'No thought found with this id!' } );
            return;
        }
        res.json( thought );
    } catch (err) {
        console.log( err );
        res.status( 500 ).json( err );
    }
}
