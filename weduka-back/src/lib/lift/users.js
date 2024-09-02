const { getManager } = require('models/config');
const { Contacts } = require('../../models/entities/marshals/contacts');

const liftUser = async (user, entityManager) => {
  const manager = !!entityManager ? entityManager : getManager();
  const contactsRepository = manager.getRepository(Contacts);

  const contacts = await contactsRepository.find({
    where: {
      userId: user.id,
    },
    order: {
      createdAt: 'desc',
    },
  });

  return {
    data: {
      id: user.id,
      type: 'users',
      attributes: {
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        cpf: user.cpf,
        maritalStatus: user.maritalStatus,
        age: user.age,
      },
      included: {
        contacts:
          !!contacts && contacts.length > 0
            ? contacts.map((ctt) => {
                return {
                  id: ctt.id,
                  contactType: ctt.contactType,
                  contactValue: ctt.contactValue,
                };
              })
            : [],
      },
    },
  };
};

module.exports = {
  liftUser,
};
