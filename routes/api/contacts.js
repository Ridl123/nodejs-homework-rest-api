const express = require("express");
const router = express.Router();
const Joi = require("joi");
const contactsOperations = require("../../models/contacts");

// Joi validation schema for contact
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

// Joi validation schema for update (all fields optional)
const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).or("name", "email", "phone"); // Ensure at least one field is present

// @ GET /api/contacts
router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

// @ GET /api/contacts/:contactId
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

// @ POST /api/contacts
router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: `missing required ${error.details[0].path[0]} field`,
      });
    }
    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

// @ DELETE /api/contacts/:contactId
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

// @ PUT /api/contacts/:contactId
router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = updateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing fields" });
    }
    const updatedContact = await contactsOperations.updateContact(
      contactId,
      req.body
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
