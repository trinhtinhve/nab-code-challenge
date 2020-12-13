const supertest = require('supertest');
const app = require('../../../middleware');
const db = require('../../../core/product/models');

const coteObject = {
  Requester: function () {
    this.send = jest.fn((sendData) => {
      if (sendData.type === 'get_quantity_of_products') {
        return Promise.resolve(sendData.productIds).then((productIds) =>
          productIds.map((productId) => ({
            product_id: productId,
            quantity: 10,
          }))
        );
      }

      if (sendData.type === 'product_log') {
        return Promise.resolve();
      }

      return Promise.reject(new Error(''));
    });
  },
};

jest.mock('cote', () => {
  return coteObject;
});

describe('#Product Integration Test', () => {
  afterAll(() => {
    return db.sequelize.close();
  });

  describe('##Get Product', () => {
    beforeAll(() => {
      return db.sequelize
        .sync({ force: true })
        .then(() =>
          db.Product.create({
            name: 'product-A',
            price: 1000,
            active: true,
            created_at: new Date(),
            updated_at: new Date(),
          })
        )
        .then(() =>
          db.Product.create({
            name: 'product-B',
            price: 2000,
            active: true,
            created_at: new Date(),
            updated_at: new Date(),
          })
        )
        .then(() =>
          db.Product.create({
            name: 'product-C',
            price: 3000,
            active: true,
            created_at: new Date(),
            updated_at: new Date(),
          })
        );
    });

    it('should be get a list of products', () => {
      const productsResponse = {
        count: 2,
        rows: [
          {
            quantity: 10,
            id: 1,
            name: 'product-A',
            price: 1000,
            active: true,
          },
          {
            quantity: 10,
            id: 2,
            name: 'product-B',
            price: 2000,
            active: true,
          },
        ],
      };
      return supertest(app)
        .get('/product_service/api/v1/products?isActive=true&ids[]=1&ids[]=2')
        .expect(200)
        .then((response) => {
          expect(response.body).toMatchObject(productsResponse);
        });
    });
  });
});
