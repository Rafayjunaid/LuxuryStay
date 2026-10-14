import Feedback from "../models/Feedback.js";
import User from "../models/User.js";

export const createFeedback = async (req, res) => {
  try {

    const {
      userId,
      rating,
      message
    } = req.body;

    if (!userId || !rating || !message) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const user =
      await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const feedback =
      await Feedback.create({
        userId,
        name: user.name,
        email: user.email,
        rating,
        message,
        status: "pending"
      });

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const getActiveFeedback = async (req, res) => {
  try {

    const feedback =
      await Feedback.find({
        status: "active"
      })
        .populate(
          "userId",
          "name profilePic"
        )
        .sort({
          rating: -1,
          createdAt: -1
        });

    res.json(feedback);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const getAllFeedback = async (req, res) => {
  try {

    const feedback =
      await Feedback.find()
        .populate(
          "userId",
          "name profilePic"
        )
        .sort({
          createdAt: -1
        });

    res.json(feedback);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const updateFeedbackStatus = async (req, res) => {
  try {

    const {
      id
    } = req.params;

    const {
      status
    } = req.body;

    if (
      ![
        "pending",
        "active",
        "blocked"
      ].includes(status)
    ) {
      return res.status(400).json({
        message: "Invalid feedback status"
      });
    }

    const feedback =
      await Feedback.findByIdAndUpdate(
        id,
        {
          status
        },
        {
          new: true
        }
      );

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found"
      });
    }

    res.json({
      message: "Feedback status updated",
      feedback
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};