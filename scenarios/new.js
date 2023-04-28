// test.js
const { spec } = require('pactum');

function testFunctionGet(){
    return spec().get('https://fakestoreapi.com/products')
}

function testFunctionDelete(id){
    return spec().delete(`https://fakestoreapi.com/products/${id}`)
}

it('should get all products, get first id, delete and return with status code 200', async () => {
    
    let products = await testFunctionGet().expectStatus(200)

    let firstProduct = products.body[0];

    await testFunctionDelete(firstProduct.id).expectJsonLike({id: 1}).expectStatus(200);
});