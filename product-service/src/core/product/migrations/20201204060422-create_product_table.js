'use strict';

const addFullTextIndex = (sequelize) => {
  if (sequelize.options.dialect !== 'postgres') {
    return Promise.reject(
      new Error('Not creating search index, must be using POSTGRES to do this')
    );
  }

  const searchFields = ['name'];

  const vectorName = 'product_text';
  sequelize
    .query(`ALTER TABLE "products" ADD COLUMN "${vectorName}" TSVECTOR`)
    .then(() =>
      sequelize.query(
        `UPDATE "products" SET "${vectorName}" = to_tsvector(\'english\', ${searchFields.join(
          " || ' ' || "
        )})`
      )
    )
    .then(() =>
      sequelize.query(
        `CREATE INDEX products_search_idx ON "products" USING gin("${vectorName}");`
      )
    )
    .then(() =>
      sequelize.query(
        `CREATE TRIGGER products_vector_update BEFORE INSERT OR UPDATE ON "products" FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger("${vectorName}", \'pg_catalog.english\', ${searchFields.join(
          ', '
        )})`
      )
    );
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await addFullTextIndex(queryInterface.sequelize);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  },
};
