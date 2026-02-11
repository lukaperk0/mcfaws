import Holiday from "../models/Holiday.js"; 


export async function createHoliday(req, res) {
    try {
        const { name, date, description } = req.body;
        if (!name || !date) {
            return res.status(400).json({ error: "Name and date are required" });
        }
        const holiday = new Holiday({ name, date, description });
        await holiday.save();
        res.status(201).json(holiday);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getAllHolidays(req, res) {
    try {
        const holidays = await Holiday.find();
        res.status(200).json(holidays);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}