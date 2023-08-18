function getPrices() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://api.coinlore.net/api/tickers/");

  xhr.addEventListener("load", function () {
    const data = JSON.parse(xhr.responseText).data;

    for (let i = 0; i < data.length; i++) {
      const table = document.querySelector(".table");
      let tr = document.createElement("tr");

      const rank = document.createElement("td");
      const name = document.createElement("td");
      const symbol = document.createElement("td");
      const price = document.createElement("td");
      const hour1 = document.createElement("td");
      const hour24 = document.createElement("td");
      const day7 = document.createElement("td");
      const marketCap = document.createElement("td");
      const volume = document.createElement("td");
      const supply = document.createElement("td");

      function numWithCommas(num) {
        let numParts = num.toString().split(".");
        numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return numParts.join(".");
      }

      oddEven(hour1);
      oddEven(hour24);
      oddEven(day7);

      rank.textContent = data[i].rank;
      name.textContent = data[i].name;
      // symbol.textContent = data[i].symbol;
      price.textContent = `$${numWithCommas(data[i].price_usd)}`;

      let arrowh1 = "▼",
        colorh1 = "red";
      if (data.percent_change_1h >= 0) {
        arrowh1 = "▲";
        colorh1 = "green";
      }

      hour1.textContent = `${arrowh1}${data[i].percent_change_1h}%`;
      hour24.textContent = `${data[i].percent_change_24h}%`;
      day7.textContent = `${data[i].percent_change_7d}%`;
      marketCap.textContent = `$${numWithCommas(data[i].market_cap_usd)}`;
      volume.textContent = `$${numWithCommas(data[i].volume24)}`;
      supply.textContent = `$${numWithCommas(data[i].csupply)}`;

      table.appendChild(tr);
      tr.appendChild(rank);
      tr.appendChild(name);
      // tr.appendChild(symbol);
      tr.appendChild(price);
      tr.appendChild(hour1);
      tr.appendChild(hour24);
      tr.appendChild(day7);
      tr.appendChild(marketCap);
      tr.appendChild(volume);
      tr.appendChild(supply);
    }
  });

  xhr.send(null);
}

getPrices();
setInterval(3000);
