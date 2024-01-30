const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService{

  constructor(){
    this.products = [];
    this.genereate();
  }

  genereate(){
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data, //Contatenar el objeto data con el objeto newProduct
    }
    this.products.push(newProduct);
    return newProduct;
  }


  find(){
    return new Promise ((resolve) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });

    //return this.products;
  }

  async findOne(id){
    const product = this.products.find(item => item.id === id)
    if (!product){
      throw boom.notFound('Product not found');
    }
    if(product.isBlock){
      throw boom.conflict('Product is block');
    }
    return product;
  }


  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    //Persistiendo la informacion que hay antes con la nueva
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return {message: 'deleted', id };
  }
}

module.exports = ProductsService;
