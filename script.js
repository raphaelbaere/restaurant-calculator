const clientList = document.querySelector('#client-list');
const clientInput = document.querySelector('#client-input');
const addClientButton = document.querySelector('#add-client-button');
const selectClient = document.querySelector('#select-client');
const addProductButton = document.querySelector('#add-product-button');
const productName = document.querySelector('#product-name');
const productPrice = document.querySelector('#product-price');
const productList = document.querySelector('#product-list');
const resultado = document.querySelector('#resultado');
const calculateConta = document.querySelector('#calculate-conta');

function calcularDivisaoConta(clientes, produtos) {
    console.log('a')
    const totalConta = produtos.reduce((total, produto) => total + produto.preco, 0);
    const taxaServico = totalConta * 0.1;
    const valorPorCliente = {};
  
    clientes.forEach(cliente => {
      const produtosConsumidos = produtos.filter(produto => produto.consumidoPor.includes(cliente));
  
      const valorConsumido = produtosConsumidos.reduce((total, produto) => (total + produto.preco) / produto.consumidoPor.length, 0);
        const valorTotalComTaxa = valorConsumido + (valorConsumido * 0.1);
        valorPorCliente[cliente] = valorTotalComTaxa.toFixed(2);
        const p = document.createElement('p');
        p.innerHTML = `${cliente} terá de pagar R$  ${valorPorCliente[cliente]}`
        resultado.appendChild(p);
        console.log(cliente)
        return;
    });

}

let clients = [];

let products = [];


addClientButton.addEventListener('click', () => {
    const p = document.createElement('p');
    p.innerHTML = clientInput.value;
    clients.push(clientInput.value);
    clientList.appendChild(p);

    const option = document.createElement('option');
    option.innerHTML = clientInput.value;
    option.value = clientInput.value;
    selectClient.appendChild(option);
})

addProductButton.addEventListener('click', () => {
    if (products.some((product) => product.nome === productName.value)) {
       const addConsumantToProduct = products.find((product1) => product1.nome === productName.value);
       addConsumantToProduct.consumidoPor.push(selectClient.value);
       const olderP = document.querySelector(`#${addConsumantToProduct.nome}`)
       olderP.innerHTML = `${addConsumantToProduct.nome}, consumida por ${addConsumantToProduct.consumidoPor}, preço: R$${addConsumantToProduct.preco},00`;
       return;
    }
    const product = {
        nome: productName.value,
        preco: productPrice.value,
        consumidoPor: [selectClient.value],
    }

    products.push(product);

    const p = document.createElement('p');
    p.id = product.nome;
    p.innerHTML = `${product.nome}, consumida por ${product.consumidoPor}, preço: R$${product.preco},00`;
    productList.appendChild(p);
})

calculateConta.addEventListener('click', () => {
    calcularDivisaoConta(clients, products)
})