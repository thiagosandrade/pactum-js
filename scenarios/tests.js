// test.js
const { spec } = require('pactum');

it('should get a response with status code 200', async () => {
    await spec()
        .get('http://www.google.com')
        .expectStatus(200);
});

it('should get a response with status code 200 and return the 20 results as array', async () => {
    await spec()
      .get('https://fakestoreapi.com/products')
      .expectStatus(200)
      .expectJsonLike([])
      .expectJsonLength(20);
});

it('should get a response with status code 200 and return product item', async () => {
    await spec()
        .get('https://fakestoreapi.com/products/1')
        .expectStatus(200)
        .expectJsonLike({
            "id":1,
            "title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            "price":109.95,
            "description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            "category":"men's clothing",
            "image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            "rating":{
                "rate":3.9,
                "count":120
            }
        });
});

it('should post new product and get a response with status code 200', async () => {
    await spec()
        .post('https://fakestoreapi.com/products')
        .withBody({
            "title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            "price":109.95,
            "description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            "category":"men's clothing",
            "image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            "rating":{
                "rate":3.9,
                "count":120
            }
        })
        .expectJsonLike({
            id: 21,
            title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops'
        })
        .expectStatus(200);
});

it('should get all products, update first and get updated to check result with status code 200', async () => {
    
    let products = await spec()
      .get('https://fakestoreapi.com/products')
      .expectStatus(200)
      .expectJsonLike([])
      .expectJsonLength(20);

    let firstProduct = products.body[0] 

    firstProduct.title = 'Test title' 

    // console.log(firstProduct)

    let response2 = await spec()
        .put(`https://fakestoreapi.com/products/${firstProduct.id}`)
        .withBody(JSON.stringify(firstProduct))
        .expectJsonLike({
            id: 1
        })
        .expectStatus(200);

    // console.log(response2.body)
});

it('should get all products, get first id, delete and return with status code 200', async () => {
    
    let products = await spec()
      .get('https://fakestoreapi.com/products')
      .expectStatus(200)
      .expectJsonLike([])
      .expectJsonLength(20);

    let firstProduct = products.body[0] 

    await spec()
        .delete(`https://fakestoreapi.com/products/${firstProduct.id}`)
        .withBody(JSON.stringify(firstProduct))
        .expectJsonLike({
            id: 1
        })
        .expectStatus(200);

});