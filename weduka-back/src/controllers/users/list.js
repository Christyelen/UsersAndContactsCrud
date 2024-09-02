const { QueryFailedError } = require('typeorm');
const { APIError } = require('utils/APIError.js');
const { Users } = require('../../models/entities/marshals/user');
const { DEFAULT_ASYNC_POOL_SIZE } = require('../../consts/index');
const asyncPool = require('tiny-async-pool');
const { getManager } = require('models/config');
const { liftUser } = require('../../lib/lift/users');

/**
 * Update an user.
 * @param req
 * @param res
 * @param next
 */
const list = async (req, res, next) => {
  try {
    const userRepository = getManager().getRepository(Users);
    const users = await userRepository.find({
      order: {
        createdAt: 'desc',
      },
    });

    // Lift response
    const runningLiftedUsers = await asyncPool(DEFAULT_ASYNC_POOL_SIZE, users, (user) => liftUser(user));

    const liftedUsers = [];

    for await (const users of runningLiftedUsers) {
      liftedUsers.push(users);
    }

    const response = {
      data: liftedUsers,
    };

    res.flatResponse(req.id, 200, response);
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

    const customError = new APIError(500, 'Unexpected error while list users.', controllerError);

    return next(customError);
  }
};

module.exports = {
  list,
};
