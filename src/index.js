if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", initializeCode);
}

var j = 0;

async function initializeCode() {
  const usersTable = document.getElementById("zongbiao");
  const url =
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
  const usersPromise = await fetch(url);
  const userJSON = await usersPromise.json();
  var MUcity = userJSON.dataset.dimension.Alue.category.label;
  var MUpopu = userJSON.dataset.value;

  const ur2 =
    "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";
  const usersdata = await fetch(ur2);
  const JSONdata = await usersdata.json();
  var MUempo = JSONdata.dataset.value;

  for (let i in MUcity) {
    var baifenbi = MUempo[j] / MUpopu[j];
    baifenbi = Math.round(baifenbi * 10000) / 100;

    let tr = document.createElement("tr");
    tr.innerHTML = `
          <td>${MUcity[i]}</td>
          <td>${MUpopu[j]}</td>
          <td>${MUempo[j]}</td>
          <td>${baifenbi}%</td>
      `;

    if (j % 2 === 1) {
      tr.classList.add("even");
    } else {
      tr.classList.add("odd");
    }

    if (baifenbi < 25) {
      tr.classList.add("lessthan");
    }
    if (baifenbi > 45) {
      tr.classList.add("morethan");
    }

    usersTable.querySelector("tbody").appendChild(tr);
    j++;
  }
}
