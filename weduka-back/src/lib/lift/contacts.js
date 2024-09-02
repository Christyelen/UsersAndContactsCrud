const { getManager } = require('models/config');
const { Users } = require('../../models/entities/marshals/user');

const liftContact = async (contact, user, entityManager) => {
  const manager = !!entityManager ? entityManager : getManager();
  const usersRepository = manager.getRepository(Users);

  const user = !!user
    ? user
    : await usersRepository.find({
        where: {
          id: contact.userId,
        },
      });

  return {
    data: {
      id: contact.id,
      type: 'contacts',
      attributes: {
        contactType: contact.contactType,
        contactValue: contact.contactValue,
      },
      included: {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender,
          cpf: user.cpf,
          maritalStatus: user.maritalStatus,
          age: user.age,
        },
      },
    },
  };
};

module.exports = {
  liftContact,
};
