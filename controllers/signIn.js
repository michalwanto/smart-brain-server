const handleSignIn = (req, res, db, bcrypt) => {
  const { email, passwords } = req.body;
  db.select("email", "hash", "id")
    .where("email", req.body.email)
    .from("login")
    .then((user) => {
      const isValid = bcrypt.compareSync(passwords, user[0].hash);
      if (isValid) {
        db.select("*")
          .from("users")
          .where("email", "=", email)
          .then((data) => res.json(data[0]));
      } else {
        res.status(400).json("porblem with credentials entered");
      }
    })
    .catch((err) => res.status(400).json("user is not defined"));
};

module.exports = {
  handleSignIn: handleSignIn,
};
