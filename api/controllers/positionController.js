import Position from '../models/Position.js';

export const createPosition = async (req, res) => {
  try {
    const { title, text } = req.body;
    const position = new Position({ title, text });
    await position.save();
    res.status(201).json({ success: true, message: 'Vloga uspešno ustvarjena', position });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getPositions = async (req, res) => {
  try {
    const positions = await Position.find();
    res.status(200).json({ success: true, positions });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  } };

export const getPositionById = async (req, res) => {
  try {
    const position = await Position.findById(req.params.id);
    if (!position) {
      return res.status(404).json({ success: false, message: 'Pozicija ni bila najdena' });
    }
    res.status(200).json({ success: true, position });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const addUserToPosition = async (req, res) => {
  try {
    const position = await Position.findById(req.params.id);
    if (!position) {
      return res.status(404).json({ success: false, message: 'Pozicija ni bila najdena' });
    }
    position.users.push(req.body.userId);
    await position.save();
    res.status(200).json({ success: true, message: 'Uporabnik uspešno dodan k poziciji', position });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
