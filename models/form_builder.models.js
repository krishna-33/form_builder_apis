const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
      defaultValue: ""
    },
    questions: {
      type: Array,
      required: true,
    },
    response: {
      type: Array
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Form = mongoose.model("Form", FormSchema);

module.exports = Form;
