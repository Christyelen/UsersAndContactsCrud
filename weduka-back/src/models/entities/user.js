const { EntitySchema } = require('typeorm');
const { Users } = require('./marshals/user');

module.exports = new EntitySchema({
  name: 'Users',
  tableName: 'users',
  target: Users,
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
      name: 'id',
    },
    firstName: {
      type: 'varchar',
      name: 'first_name',
    },
    lastName: {
      type: 'varchar',
      name: 'last_name',
    },
    gender: {
      type: 'varchar',
      name: 'gender',
    },
    cpf: {
      type: 'varchar',
      name: 'cpf',
    },
    age: {
      type: 'varchar',
      name: 'age',
    },
    maritalStatus: {
      type: 'varchar',
      name: 'marital_status',
    },
    createdAt: {
      createDate: true,
      name: 'created_at',
      type: 'timestamp',
    },
    updatedAt: {
      updateDate: true,
      name: 'updated_at',
      type: 'timestamp',
    },
    deletedAt: {
      deleteDate: true,
      name: 'deleted_at',
      type: 'timestamp',
    },
  },
});
