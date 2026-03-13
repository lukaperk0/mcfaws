import mongoose from 'mongoose';

const positionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Povezava do uporabnikov z to vlogo
});
    
const Position = mongoose.model('Position', positionSchema);

export default Position;