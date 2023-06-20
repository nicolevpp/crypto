const form = document.querySelector('#coin-container');
const coin = document.querySelector('#coin');
const crypto = document.querySelector('#crypto');
const amount = document.querySelector('#amount');
const coinInfo = document.querySelector('#coin-info');

form.addEventListener('submit', async e => {
  e.preventDefault();  
  const coinSelected = [...coin.children].find(option => option.selected).value;
  const cryptoSelected = [...crypto.children].find(option => option.selected).value;
  const amountValue = amount.value;
  try {
    coinInfo.innerHTML = `
    <div class="loader"></div>
    `;
    const response = await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected}`);
    const data = await response.json();
    const price = (data.DISPLAY[cryptoSelected][coinSelected].PRICE);
    const priceHigh =(data.DISPLAY[cryptoSelected][coinSelected].HIGH24HOUR);
    const priceLow = (data.DISPLAY[cryptoSelected][coinSelected].LOW24HOUR);
    const variation = (data.DISPLAY[cryptoSelected][coinSelected].CHANGEPCT24HOUR);
    console.log(data.RAW[cryptoSelected][coinSelected].PRICE);

    if (amountValue !== '') {
    const result = Number(amountValue) / data.RAW[cryptoSelected][coinSelected].PRICE; 
    coinInfo.innerHTML = `
    <p class="info"> El precio es: <span class="price">${price}</span></p>
    <p class="info"> El precio mas alto es: <span class="price">${priceHigh}</span></p>
    <p class="info"> El precio mas bajo es: <span class="price">${priceLow}</span></p>
    <p class="info"> Variacion 24H: <span class="price">${variation}%</span></p>
    <p class="info"> Puede comprar <span class="price">${result.toFixed(4)} ${cryptoSelected}</span></p> 
    `
    // to fixed lo que hace es redondear el numero a la cantidad de decimales que indiquemos
    } else {
    coinInfo.innerHTML = `
    <p class="info"> El precio es: <span class="price">${price}</span></p>
    <p class="info"> El precio mas alto es: <span class="price">${priceHigh}</span></p>
    <p class="info"> El precio mas bajo es: <span class="price">${priceLow}</span></p>
    <p class="info"> Variacion 24H: <span class="price">${variation}%</span></p>
    `
    }

    

} catch (error) {
    console.log(error);
  }
});

