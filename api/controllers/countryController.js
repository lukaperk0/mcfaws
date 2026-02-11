import { get } from "mongoose";
import Country from "../models/Country.js"; // POPRAVLJENO
// Dodaj državo
export async function createCountry(req, res) {
  try {
    const { ime  } = req.body;
    if (!ime) {
      return res.status(400).json({ error: "Ime države je obvezno" });
    }
    const newCountry = new Country({ ime });
    await newCountry.save();
    res.status(201).json(newCountry);
  }catch (err) {
    console.error("Napaka pri ustvarjanju države:", err);
    res.status(500).json({ error: "Napaka pri ustvarjanju države" });
  }
}
// Dodaj segment državi
export async function addSegment(req, res) {
  try {
    const { countryName, segment } = req.body;

    // Preveri, če so podatki prisotni
    if (!countryName || !segment || !segment.x || !segment.z) {
      return res.status(400).json({ error: "Manjkajo podatki (countryName, segment.x, segment.z)" });
    }

    // Najdi državo po imenu
    const country = await Country.findOne({ ime: countryName });
    
    if (!country) {
      return res.status(404).json({ error: "Država ne obstaja" });
    }

    // Dodaj segment v array
    country.segmenti.push({ x: segment.x, z: segment.z });
    
    // Shrani v bazo
    await country.save();

    res.status(200).json({ 
      message: "Segment dodan",
      country: country
    });
  } catch (err) {
    console.error("Napaka pri dodajanju segmenta:", err);
    res.status(500).json({ error: "Napaka pri dodajanju segmenta" });
  }
}

export async function addStavba(req, res) {
  try {
    const { countryName, coords } = req.body;

    // Preveri, če so podatki prisotni
    if (!countryName || !coords || !coords.x1 || !coords.z1 || !coords.x2 || !coords.z2) {
      return res.status(400).json({ error: "Manjkajo podatki" });
    }

    // Najdi državo po imenu
    const country = await Country.findOne({ ime: countryName });
    
    if (!country) {
      return res.status(404).json({ error: "Država ne obstaja" });
    }

    // Dodaj segment v array
    country.stavbe.push({ x1: coords.x1, z1: coords.z1, x2: coords.x2, z2: coords.z2 });
    
    // Shrani v bazo
    await country.save();

    res.status(200).json({ 
      message: "Stavba dodana",
      country: country
    });
  } catch (err) {
    console.error("Napaka pri dodajanju stavbe:", err);
    res.status(500).json({ error: "Napaka pri dodajanju stavbe" });
  }
}

export async function deleteCountry(req, res){
  try {
    const { id } = req.params;
    const deletedCountry = await Country.findByIdAndDelete(id);
    if (!deletedCountry) {
      return res.status(404).json({ error: "Država ne obstaja" });
    }
    res.status(200).json({ message: "Država izbrisana", country: deletedCountry });
  } catch (err) {
    console.error("Napaka pri brisanju države:", err);
    res.status(500).json({ error: "Napaka pri brisanju države" });
  }
}

export async function getAllCountries(req, res) {
  try {
    const countries = await Country.find();
    res.status(200).json(countries);
  } catch (err) {
    console.error("Napaka pri pridobivanju držav:", err);
    res.status(500).json({ error: "Napaka pri pridobivanju držav" });
  }
}    

export async function getCountryById(req, res) {
  try{
    const { id } = req.params;
    const country = await Country.findById(id);
    if (!country) {
      return res.status(404).json({ error: "Država ne obstaja" });
    } else {
      res.status(200).json(country);
    }   
  } catch (err) {
    console.error("Napaka pri pridobivanju države:", err);
    res.status(500).json({ error: "Napaka pri pridobivanju države" });
  }
}