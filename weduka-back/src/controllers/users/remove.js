const { getManager } = require('models/config');
const { QueryFailedError } = require('typeorm');
const { APIError } = require('utils/APIError.js');
const { Users } = require('../../models/entities/marshals/user');

/**
 * Delete an user.
 * @param req
 * @param res
 * @param next
 */
const remove = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userRepository = getManager().getRepository(Users);

    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new APIError(400, 'Unable to find user');
    }

    await userRepository.softDelete({ id: userId });
    res.flatResponse(req.id, 200);
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

    const customError = new APIError(500, 'Unexpected error while deleting user.', controllerError);

    return next(customError);
  }
};

module.exports = {
  remove,
};
