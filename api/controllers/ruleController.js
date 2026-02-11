import Rule from "../models/Rule.js";

// Vrni vsa pravila
export async function getAllRules(req, res) {
  try {
    const rules = await Rule.find().sort({ _id: 1 }); // Sortiraj po vrstnem redu
    res.status(200).json({ 
      total: rules.length, 
      rules 
    });
  } catch (err) {
    console.error("Napaka pri branju pravil:", err);
    res.status(500).json({ error: "Napaka pri branju pravil" });
  }
}

// Vrni eno pravilo
export async function getRuleById(req, res) {
  try {
    const rule = await Rule.findById(req.params.id);
    if (!rule) {
      return res.status(404).json({ error: "Pravilo ne obstaja" });
    }
    res.status(200).json(rule);
  } catch (err) {
    console.error("Napaka pri branju pravila:", err);
    res.status(500).json({ error: "Napaka pri branju pravila" });
  }
}

// Ustvari novo pravilo (samo moderatorji)
export async function createRule(req, res) {
  try {
    const { title, text } = req.body;

    if (!title || !text) {
      return res.status(400).json({ error: "Naslov in besedilo sta obvezna" });
    }

    const newRule = new Rule({ title, text });
    await newRule.save();

    res.status(201).json({ 
      message: "Pravilo dodano", 
      rule: newRule 
    });
  } catch (err) {
    console.error("Napaka pri ustvarjanju pravila:", err);
    res.status(500).json({ error: "Napaka pri ustvarjanju pravila" });
  }
}

// Posodobi pravilo (samo moderatorji)
export async function updateRule(req, res) {
  try {
    const { title, text } = req.body;

    if (!title || !text) {
      return res.status(400).json({ error: "Naslov in besedilo sta obvezna" });
    }

    const rule = await Rule.findByIdAndUpdate(
      req.params.id,
      { title, text },
      { new: true } // Vrni posodobljen dokument
    );

    if (!rule) {
      return res.status(404).json({ error: "Pravilo ne obstaja" });
    }

    res.status(200).json({ 
      message: "Pravilo posodobljeno", 
      rule 
    });
  } catch (err) {
    console.error("Napaka pri posodabljanju pravila:", err);
    res.status(500).json({ error: "Napaka pri posodabljanju pravila" });
  }
}

// Izbriši pravilo (samo moderatorji)
export async function deleteRule(req, res) {
  try {
    const rule = await Rule.findByIdAndDelete(req.params.id);
    
    if (!rule) {
      return res.status(404).json({ error: "Pravilo ne obstaja" });
    }

    res.status(200).json({ message: "Pravilo izbrisano" });
  } catch (err) {
    console.error("Napaka pri brisanju pravila:", err);
    res.status(500).json({ error: "Napaka pri brisanju pravila" });
  }
}