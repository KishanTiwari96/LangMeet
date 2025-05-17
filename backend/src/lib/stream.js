import { StreamChat } from 'stream-chat';
import "dotenv/config";

const apiKey = process.env.STEAM_API_KEY
const apiSecret = process.env.STEAM_API_SECRET

if(!apiKey || !apiSecret){
    console.error("Missing Stream API key and secret");
}

// to communicate and manage users, messages, and other data in the stream application
const streamClient  = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]);
        return userData
    } catch (error) {
        console.error("Error upserting Stream user", error);

    }
}

export const generateStreamToken = async (userId) => {
    try {
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error) {
        console.error("Error generating Stream token", error);
    }
} 
