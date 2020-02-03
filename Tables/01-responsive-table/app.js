document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.table-responsive').forEach(function(table) {
        let labels = Array.from(table.querySelectorAll('th')).map(function(th) {
            return th.innerText 
        })

        table.querySelectorAll('td').forEach(function(td, index) {
            td.setAttribute('data-label', labels[index % labels.length])
        })
    })
})