class Contacts {
  constructor(id, contactType, contactValue, userId, createdAt, updatedAt, deletedAt) {
    this.id = id;
    this.contactType = contactType;
    this.contactValue = contactValue;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}

module.exports = {
  Contacts,
};
