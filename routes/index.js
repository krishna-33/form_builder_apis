const express = require("express");
const formModel = require("../models/form_builder.models");
const app = express();

app.post("/add_form", async (request, response) => {
  const form = new formModel(request.body);
  try {
    const result = await form.save(true);
    await formModel.updateOne(
      { _id: result["_id"] },
      {
        $set: { url: `http://localhost:5173/${result["_id"]}` },
      }
    );

    response.json({ status: 200, success: true, data: form });
  } catch (error) {
    console.log("error", error);
    response.json({
      status: 500,
      success: false,
      data: "Something went wrong",
    });
  }
});

app.get("/forms", async (request, response) => {
  try {
    const forms = await formModel.find({});
    response.json({ status: 200, success: true, data: forms });
  } catch (error) {
    response.json({
      status: 500,
      success: false,
      data: "Something went wrong",
    });
  }
});

app.get("/form", async (request, response) => {
  const { id } = request.query;
  const form = await formModel.findById({ _id: id });
  try {
    response.json({ status: 200, success: true, data: form });
  } catch (error) {
    response.json({
      status: 500,
      success: false,
      data: "Something went wrong",
    });
  }
});

app.post("/form-response", async (request, response) => {
  const { id, ...rest } = request.body;
  const forms_response = await formModel.findById({ _id: id });
  try {
    await formModel.updateOne(
      { _id: id },
      {
        $set: { response: [...forms_response?.response, rest] },
      }
    );
    response.json({ status: 200, success: true, data: request.body });
  } catch (error) {
    response.json({
      status: 500,
      success: false,
      data: "Something went wrong",
    });
  }
});

module.exports = app;
