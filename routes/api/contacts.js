const express = require("express");
const router = express.Router();
const Contact = require("../../models/contacts");

// GET all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find({});
    return res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET contact by ID
router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  return;
});

// POST new contact
router.post("/", async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  try {
    const newContact = await Contact.create({ name, email, phone, favorite });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE contact by ID
router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (!deletedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH update contact favorite status
router.patch("/:contactId/favorite", async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
