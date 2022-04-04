fetch("https://emag.thanhnien.vn/covid19/home/getSummPatient", {
  method: "POST",
  body: JSON.stringify(),
})
  .then((response) => response.json())
  .then((data) => {
    if (data != null || data != undefined) {
        
        console.log(data.data);
        
        document.getElementById("update_time").innerHTML = new Date(data.data.CreatedDate ).toLocaleString(
            "vi-VN"
          )
        document.getElementById("confirmed").innerHTML = data.data.Confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        document.getElementById("plus_confirmed").innerHTML = data.data.PlusConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        document.getElementById("treated").innerHTML = (data.data.Confirmed - data.data.Death - data.data.Recovered).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        document.getElementById("plus_treated").innerHTML = (data.data.PlusConfirmed - data.data.PlusRecovered - data.data.PlusDeath).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        document.getElementById("recovered").innerHTML = data.data.Recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        document.getElementById("plus_recovered").innerHTML = data.data.PlusRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        document.getElementById("death").innerHTML = data.data.Death.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        document.getElementById("plus_death").innerHTML = data.data.PlusDeath.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    
  })
  .catch((err) => console.log(err));


fetch("https://emag.thanhnien.vn/covid19/home/getAllPatientProvinces", {
  method: "POST",
  body: JSON.stringify(),
})
  .then((response) => response.json())
  .then((data) => {
    if (data != null || data != undefined) {
        const { list } = data
        console.log(list);
        list.forEach(element => {
            
            const contentHTML = `
            <tr>
                
               
                <td>
                    ${element.title}
                </td>
                <td >
                    ${element.confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td >
                    ${element.incconfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                
                
     
            </tr>
          `;
    
            document.getElementById("covid_data_body").innerHTML += contentHTML;
        });
    }
    
  })
  .catch((err) => console.log(err));


  fetch("https://emag.thanhnien.vn/covid19/home/GetChartCovid", {
  method: "POST",
  body: JSON.stringify(),
})
  .then((response) => response.json())
  .then((data) => {
    if (data != null || data != undefined) {
        const { list } = data
        console.log(list);
        const newList = list.sort((a, b) => new Date(b.IssueDate) - new Date(a.IssueDate));
        newList.forEach(element => {
            
            const options = { month: "long", day: "numeric", year: "numeric" };
            const y = `
                <tr>
                <td >
                    ${new Date(element.IssueDate).toLocaleDateString(
                      "en-US",
                      options
                    )}
                </td>
                <td > 
                    ${element.confirmed
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td > 
                ${element.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </td>
            
                </tr>
            `;
            document.getElementById("covid_data_body_all").innerHTML += y;
        });
    }
    
  })
  .catch((err) => console.log(err));


  function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("covid_data_table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
