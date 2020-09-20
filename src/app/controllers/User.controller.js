const { User } = require('../models');
const yup = require('yup');

class UserController {
  async store(request, response) {
    const user = request.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().required(),
      password: yup.string().required(),
    });

    if (!(await schema.isValid(user))) {
      return response
        .status(401)
        .json({ message: 'this informations not is valid' });
    }

    const userExist = await User.findOne({ where: { email: user.email } });

    if (userExist) {
      return response
        .status(401)
        .json({ message: 'this user already exists in the database' });
    }

    const userCreated = await User.create(user);

    delete userCreated.password;

    return response.status(200).json(userCreated);
  }
}

module.exports = new UserController();
