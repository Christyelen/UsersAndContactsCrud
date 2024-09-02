const { getManager } = require('models/config');
const { QueryFailedError } = require('typeorm');
const { APIError } = require('utils/APIError.js');
const { liftUser } = require('../../lib/lift/users');
const { Users } = require('../../models/entities/marshals/user');
const { Contacts } = require('models/entities/marshals/contacts');

/**
 * Updates an user contact.
 * @param req
 * @param res
 * @param next
 */
const update = async (req, res, next) => {
  try {
    const { userId, contactId } = req.params;
    const body = req.body;
    const { data } = body;
    const { attributes } = data;

    await getManager().transaction('SERIALIZABLE', async (trxEntityManager) => {
      const userRepository = trxEntityManager.getRepository(Users);
      const constactsRepository = trxEntityManager.getRepository(Contacts);

      const user = await userRepository.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new APIError(400, 'Unable to find user');
      }

      const contact = await constactsRepository.findOne({
        where: {
          id: contactId,
        },
      });

      if (!contact) {
        throw new APIError(400, 'Unable to find contact');
      }

      if (!!attributes.contactType) {
        contact.contactType = attributes.contactType;
      }

      if (!!attributes.contactValue) {
        contact.contactValue = attributes.contactValue;
      }

      await constactsRepository.save(contact);

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

    const customError = new APIError(500, 'Unexpected error while creating user.', controllerError);

    return next(customError);
  }
};

module.exports = {
  update,
};
