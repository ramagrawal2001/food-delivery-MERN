const ContactUs = require("../models/ContactUsModel");

module.exports.getContactUs = async (req, res, next) => {
  try {
    const contacts = await ContactUs.find();
    res.status(200).json({
      success: true,
      queries: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching contacts",
    });
  }
};

module.exports.setContactUs = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    const query = await ContactUs.create({ name, email, message });
    res.status(201).json({
      message: "Contact saved successfully",
      success: true,
      query: query,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
