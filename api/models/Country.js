import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  ime: { type: String, required: true, unique: true },
  segmenti: [
    {
      x: { type: Number, required: true },
      z: { type: Number, required: true },
      _id: false
    }
  ],
  stavbe: [
    {
      x1: { type: Number, required: true },
      z1: { type: Number, required: true },
      x2: { type: Number, required: true },
      z2: { type: Number, required: true },
      _id: false
    }
  ]
});

const Country = mongoose.model("Country", countrySchema);

export default Country;