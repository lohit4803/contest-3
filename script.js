let data = []
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
.then(response => response.json())
.then(dataResponse => {
  data = dataResponse;
  renderData(data);
})
.catch(error => console.error('Error:', error));

function renderData(data) {

  let tableBody = document.getElementById("tbody");

  tableBody.innerHTML=''

  data.forEach(element => {
    let tabRow = document.createElement("tr");
    let priceChange = element.price_change_percentage_24h;

    if (priceChange < 0) {
      priceChange.className = "positive";
    } else {
      priceChange.className = "negative";
    }

    tabRow.innerHTML = `
      <td><img src="${element.image}" width="20px"></td>
      <td>${element.name}</td>
      <td>${element.symbol}</td>
      <td>${element.id}</td>
      <td>${element.current_price}</td>
      <td>${element.price_change_percentage_24h}</td>
      <td>Mkt cap: ${element.total_volume}</td>
    `;
    
    tableBody.append(tabRow);
  });
}

let mktCap = document.getElementById("cap")

let text = document.getElementById("search");

text.addEventListener("keyup", event => {
  let searchTerm = text.value.trim().toLowerCase();

  if (searchTerm === '') {
    renderData(data);
    return;
  } else {
    let filter = data.filter(item => {
      let name = item.name.toLowerCase();
      return name.includes(searchTerm);
    });

    renderData(filter);
  }
});

mktCap.addEventListener('click', ()=>{
  data.sort((a,b)=>a.price_change_percentage_24h-b.price_change_percentage_24h)
  renderData(data)
})

document.getElementById("percentage").addEventListener('click', ()=>{
  data.sort((a,b)=>a.total_volume-b.total_volume)
  renderData(data)
})

