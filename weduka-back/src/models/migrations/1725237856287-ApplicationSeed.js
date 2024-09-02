const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class ApplicationSeed1725237856287 {
    name = 'ApplicationSeed1725237856287'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE \`contacts\` (
                \`id\` varchar(36) NOT NULL,
                \`contact_type\` varchar(255) NOT NULL,
                \`contact_value\` varchar(255) NOT NULL,
                \`user_id\` varchar(255) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                \`users_id\` varchar(36) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`id\` varchar(36) NOT NULL,
                \`first_name\` varchar(255) NOT NULL,
                \`last_name\` varchar(255) NOT NULL,
                \`gender\` varchar(255) NOT NULL,
                \`cpf\` varchar(255) NOT NULL,
                \`age\` varchar(255) NOT NULL,
                \`marital_status\` varchar(255) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`contacts\`
            ADD CONSTRAINT \`FK_1d195708223ae43232dc099e818\` FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE \`contacts\` DROP FOREIGN KEY \`FK_1d195708223ae43232dc099e818\`
        `);
        await queryRunner.query(`
            DROP TABLE \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`contacts\`
        `);
    }
}
