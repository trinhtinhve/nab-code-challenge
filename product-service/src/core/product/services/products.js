const Promise = require('bluebird');
const _ = require('underscore');
const { Op } = require('sequelize');
const cote = require('cote');
const { Product, Sequelize } = require('../models');

const stockService = new cote.Requester({
  name: 'stock_service',
  key: 'stock',
});
const logService = new cote.Requester({ name: 'log_service', key: 'log' });

const index = async (params) => {
  const where = await Promise.resolve({})
    .then((query) => filterByIds(query, params))
    .then((query) => filterByActive(query, params))
    .then((query) => filterByTextSearch(query, params));

  console.log(
    'where: ', where
  );

  const order = await Promise.resolve([]).then((order) =>
    orderByName(order, params)
  );

  params = { ...{ limit: 100, offset: 0 }, ...params };

  const paginatedProducts = await Product.findAndCountAll({
    where,
    order,
    limit: params.limit,
    offset: params.offset,
  });

  paginatedProducts.rows = await Promise.resolve(
    paginatedProducts.rows.map((product) => product.id)
  )
    .then((productIds) =>
      stockService.send({ type: 'get_quantity_of_products', productIds })
    )
    .then((quantities) => _.indexBy(quantities, 'product_id'))
    .then((quantityMap) =>
      paginatedProducts.rows.map((product) => {
        product.quantity = quantityMap[product.id].quantity || 0;
        return product;
      })
    );

  logService.send({ type: 'product_log', paginatedProducts });

  return paginatedProducts;
};

const filterByIds = (query, { ids }) => {
  if (ids) {
    return Promise.resolve({
      ...query,
      ...{
        id: ids,
      },
    });
  } else {
    return Promise.resolve(query);
  }
};

const filterByActive = (query, { isActive }) => {
  if (isActive) {
    return Promise.resolve({
      ...query,
      ...{
        active: isActive,
      },
    });
  } else {
    return Promise.resolve(query);
  }
};

const filterByTextSearch = (query, { search }) => {
  if (search) {
    return Promise.resolve({
      ...query,
      ...{
        [Op.and]: [
          Sequelize.literal(
            `"product_text" @@ to_tsquery(\'english\', ${search})`
          ),
        ],
      },
    });
  } else {
    return Promise.resolve(query);
  }
};

const orderByName = (order) => {
  return Promise.resolve(order);
};

module.exports = {
  index,
};
