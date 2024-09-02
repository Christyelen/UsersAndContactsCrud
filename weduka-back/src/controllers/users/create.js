const { getManager } = require('models/config');
const { QueryFailedError } = require('typeorm');
const { APIError } = require('utils/APIError.js');
const { liftUser } = require('../../lib/lift/users');
const { Users } = require('../../models/entities/marshals/user');

/**
 * Creates an user.
 * @param req
 * @param res
 * @param next
 */
const create = async (req, res, next) => {
  try {
    const body = req.body;
    const { data } = body;
    const { attributes } = data;

    await getManager().transaction('SERIALIZABLE', async (trxEntityManager) => {
      const userRepository = trxEntityManager.getRepository(Users);

      const newUser = await userRepository.save({
        firstName: attributes.firstName,
        lastName: attributes.lastName,
        gender: attributes.gender,
        cpf: attributes.cpf,
        maritalStatus: attributes.maritalStatus,
        age: attributes.age,
      });

      const liftedUser = await liftUser(newUser, trxEntityManager);
      res.flatResponse(req.id, 201, liftedUser);
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

    const customError = new APIError(500, 'Unexpected error while creating user.', controllerError);

    return next(customError);
  }
};

module.exports = {
  create,
};
