import mongoose from "mongoose";

const ruleSchema = new mongoose.Schema({
    title: { type: String, required:true},
    text: { type: String, required:true},
    createdAt: { type: Date, default: Date.now }
});

const Rule = mongoose.model("Rule", ruleSchema);

export default Rule;