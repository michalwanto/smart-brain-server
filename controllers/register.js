const handleRegister = (req, res, bcrypt, db) => {
  const { name, passwords, email } = req.body;
  if (!name || !passwords || !email) {
    return res
      .status(400)
      .json("Please Make Sure You Filled Up the Credentials");
  }
  const hash = bcrypt.hashSync(passwords);

  db.transaction((trx) => {
    trx("login")
      .returning("*")
      .insert({
        hash: hash,
        email: email,
      })
      .then((response) => res.json("success logged in"))
      .catch((err) => res.json(`failed to access login`))
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            name: name,
            email: loginEmail[0],
            joined: new Date(),
          })
          .then((output) => res.json(output[0]))
          .catch((err) => res.json(`failed to access users`));
      })
      .then(trx.commit)
      .then(trx.rollback);
  }).catch((err) => res.status(400).json(`failed to access database`));
};

module.exports = {
  handleRegister: handleRegister,
};
