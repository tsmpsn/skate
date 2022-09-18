function maxPrice() {
    var input, filter, table, tr, td, i, txtValue, isFound;
    input = document.getElementById("maxPriceInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("mainTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[3];
        isFound = false;
        if (td) {
            txtValue = td.textContent || td.innerText;
            intValue = priceAsFloat(txtValue);
            if (intValue <= parseInt(filter)) {
                tr[i].style.display = "";
                isFound = true;
            }
        }
        if(!isFound && tr[i].className !== "header") {
            tr[i].style.display = "none";
        }
    }
}

function nameSearch() {
    var input, filter, table, tr, td, i, txtValue, intValue;
    input = document.getElementById("nameInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("mainTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        // td = tr[i].getElementsByTagName("td")[0];
        alltags = tr[i].getElementsByTagName("td");
        isFound = false;
        for(j=0; j< alltags.length; j++) {
            td = alltags[j];
            if (td) {
                txtValue = td.textContent || td.innerText;
                intValue = priceAsFloat(txtValue);
                if (intValue <= parseInt(filter)) {
                    tr[i].style.display = "";
                    j = alltags.length;
                    isFound = true;
                }
            }
        }
        if(!isFound && tr[i].className !== "header") {
            tr[i].style.display = "none";
        }
    }
}

function priceAsFloat(value){
    var parsed1 = value.replace(/,/g, '.')
    return parseFloat(parsed1.replace(/[€]/g, ""));
}