const { EntitySchema } = require('typeorm');
const { Contacts } = require('./marshals/contacts');

module.exports = new EntitySchema({
  name: 'Contacts',
  tableName: 'contacts',
  target: Contacts,
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
      name: 'id',
    },
    contactType: {
      type: 'varchar',
      name: 'contact_type',
    },
    contactValue: {
      type: 'varchar',
      name: 'contact_value',
    },
    userId: {
      type: 'uuid',
      name: 'user_id',
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
  relations: {
    users: {
      target: 'users',
      type: 'many-to-one',
      joinTable: false,
      cascade: true,
      eager: true,
    },
  },
});
