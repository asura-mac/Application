import Contact from "../model/Contact.js";

export const submitMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(200).json({ success: true, message: "Message received and saved!" });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ error: "Something went wrong while saving the message." });
  }
};
