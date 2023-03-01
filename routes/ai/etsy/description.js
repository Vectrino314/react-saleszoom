const express = require("express");
const openai = require("../../middlewares/openai");

let app = express.Router();

app.post("/etsy/description", async (req, res, next) => {
  try {
    let { product, material, occasion, holiday } = req.body;

		console.log(occasion)
		console.log(holiday)

    let prompt = `Write a product description for etsy of:\n`;

    let inputRaw = `${product} that is made out of ${material} for ${occasion} during ${holiday}`; // here is where people enter stuff
    prompt += inputRaw;

		console.log(prompt);

    const gptResponse = await openai.complete({
      engine: "text-davinci-003",
      prompt,
      maxTokens: 150,
      temperature: 0.8,
      topP: 1,
      frequencyPenalty: 1,
      presencePenalty: 0,
      bestOf: 1,
      n: 1,
      user: req.user._id,
      stream: false,
			// stop: [],
      // stop: ["###", "<|endoftext|>"],
    });

    let output = `${gptResponse.data.choices[0].text}`;
    // let output = ``;


		// console.log(output)

    // remove the first character from output
    output = output.substring(1, output.length);

    // If the output string ends with one or more hashtags, remove all of them
    if (output.endsWith('"')) {
      output = output.substring(0, output.length - 1);
    }

    // If the output string ends with one or more hashtags, remove all of them
    if (output.endsWith('"')) {
      output = output.substring(0, output.length - 1);
    }

    // remove a single new line at the end of output if there is one
    if (output.endsWith("\n")) {
      output = output.substring(0, output.length - 1);
    }

    req.locals.input = prompt;
    req.locals.inputRaw = inputRaw;
    req.locals.output = output;

    next();
  } catch (err) {
    console.log(err.response);
    console.log(err.data);
    console.log(err.message);
  }
});

module.exports = app;
