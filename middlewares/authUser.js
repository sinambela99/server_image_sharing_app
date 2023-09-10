const { User } = require("../models");

const authUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(+id);
    if (!user) {
      throw { name: "NotFound" };
    }
    if (user.id !== req.user.id) {
      throw { name: "Forbidden" };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authUser;
