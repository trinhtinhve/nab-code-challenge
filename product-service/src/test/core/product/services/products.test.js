const productService = require('../../../../core/product/services/products');
const { Product } = require('../../../../core/product/models');

jest.mock('../../../../core/product/models');

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

describe('#Product Service', () => {
  describe('##Index', () => {
    let paginatedProducts, paginatedProductsResult;

    beforeAll(() => {
      paginatedProducts = {
        count: 2,
        rows: [
          {
            id: 1,
            name: 'product-A',
            price: 1000,
            active: true,
          },
          {
            id: 2,
            name: 'product-B',
            price: 2000,
            active: true,
          },
        ],
      };

      paginatedProductsResult = {
        count: 2,
        rows: [
          {
            id: 1,
            name: 'product-A',
            price: 1000,
            active: true,
            quantity: 10,
          },
          {
            id: 2,
            name: 'product-B',
            price: 2000,
            active: true,
            quantity: 10,
          },
        ],
      };
    });

    it('should return paginatedProducts', () => {
      Product.findAndCountAll.mockResolvedValueOnce(paginatedProducts);

      return productService.index({}).then((res) => {
        expect(res).toEqual(paginatedProductsResult);
        expect(Product.findAndCountAll).toHaveBeenCalledWith({
          where: {},
          order: [],
          limit: 100,
          offset: 0
        });
      });
    });

    it('should return empty products', () => {
      Product.findAndCountAll.mockResolvedValueOnce({
        count: 0,
        rows: []
      });

      return productService.index({}).then((res) => {
        expect(res).toEqual({
          count: 0,
          rows: []
        });

        expect(Product.findAndCountAll).toHaveBeenCalledWith({
          where: {},
          order: [],
          limit: 100,
          offset: 0
        });
      });
    });

    it('should filter with isActive and ids', () => {
      const params = { isActive: true, ids: [1, 2, 3] };
      const where = { id: [ 1, 2, 3 ], active: true };

      Product.findAndCountAll.mockResolvedValueOnce({
        count: 0,
        rows: []
      });

      return productService.index(params).then((res) => {
        expect(Product.findAndCountAll).toHaveBeenCalledWith({
          where,
          order: [],
          limit: 100,
          offset: 0
        });
      });
    })
  });
});
