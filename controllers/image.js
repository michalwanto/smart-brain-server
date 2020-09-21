const Clarifai = require("clarifai");

const handleApi = (req, res) => {
  const clarifai = new Clarifai.App({
    apiKey: "0cc801387c4842a5b174f14a055e29a6",
  });
  clarifai.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    });
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries));
};

module.exports = {
  handleApi: handleApi,
  handleImage: handleImage,
};
