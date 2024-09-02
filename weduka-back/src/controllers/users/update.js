const { getManager } = require('models/config');
const { QueryFailedError } = require('typeorm');
const { APIError } = require('utils/APIError.js');
const { Users } = require('../../models/entities/marshals/user');
const { liftUser } = require('../../lib/lift/users');

/**
 * Update an user.
 * @param req
 * @param res
 * @param next
 */
const update = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const body = req.body;
    const { data } = body;
    const { attributes } = data;

    await getManager().transaction('SERIALIZABLE', async (trxEntityManager) => {
      const userRepository = trxEntityManager.getRepository(Users);

      const user = await userRepository.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new APIError(400, 'Unable to find user');
      }

      if (!!attributes.firstName) {
        user.firstName = attributes.firstName;
      }

      if (!!attributes.lastName) {
        user.lastName = attributes.lastName;
      }

      if (!!attributes.cpf) {
        user.v = attributes.cpf;
      }

      if (!!attributes.gender) {
        user.gender = attributes.gender;
      }

      if (!!attributes.age) {
        user.age = attributes.age;
      }

      if (!!attributes.maritalStatus) {
        user.maritalStatus = attributes.maritalStatus;
      }

      await userRepository.save(user);

      const liftedUser = await liftUser(user, trxEntityManager);
      res.flatResponse(req.id, 200, liftedUser);
    });

    return next();
  } catch (controllerError) {
    req.logger.error(controllerError);

    if (controllerError instanceof APIError) {
      return next(controllerError);
    }

    if (controllerError instanceof QueryFailedError && controllerError.message.includes('could not serialize')) {
      const apiError = new CustomError(
        409,
        'General',
        `Concurrent requests are not allowed.`,
        [],
        controllerError,
        [],
        true,
      );

      return next(apiError);
    }

    const customError = new APIError(500, 'Unexpected error while update user.', controllerError);

    return next(customError);
  }
};

module.exports = {
  update,
};
