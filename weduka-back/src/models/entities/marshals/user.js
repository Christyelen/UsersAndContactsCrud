class Users {
  constructor(id, firstName, lastName, gender, cpf, age, maritalStatus, createdAt, updatedAt, deletedAt) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.cpf = cpf;
    this.age = age;
    this.maritalStatus = maritalStatus;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}

module.exports = {
  Users,
};
