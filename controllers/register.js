const handleRegister = (req, res, bcrypt, db) => {
  const { name, passwords, email } = req.body;
  const hash = bcrypt.hashSync(passwords);
  if (!name || !passwords || !email) {
    return res
      .status(400)
      .json("Please Make Sure You Filled Up the Credentials");
  }
  db.transaction((trx) => {
    trx("login")
      .insert({
        hash: hash,
        email: email,
      })
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .insert({
            name: name,
            email: loginEmail[0],
            joined: new Date(),
          })
          .returning("*")
          .then((output) => res.json(output[0]));
      })
      .then(trx.commit)
      .then(trx.rollback);
  });
};

module.exports = {
  handleRegister: handleRegister,
};
