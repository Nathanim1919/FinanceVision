const User = require('../models/user');
const Conversation = require('../models/aiTalk');

const createUserMessage = async (req, res) => {
    try{
        const {
            userId,
            text
        } = req.body;

        const newConversation = await Conversation.create({
            user:userId
        });

        newConversation.messages.text = text;
        newConversation.messages.sender = 'user';

        await newConversation.save();
        console.log(newConversation);

    } catch (error){
        console.log(error);
    }
}


const createAiMessage = async (req, res) => {
    try{

    }catch(error){
        console.log(error);
    }
}


const getMessages = async (req, res) => {
    try{
        const {
            userId
        } = req.body;

        const getConversation = await Conversation.findOne({user:userId});
        console.log(getConversation)
        res.status(200).send({
            getConversation
        })
    }catch( error){
        console.log(error);
    }
}


module.exports = {
    createUserMessage,
    getMessages,
}