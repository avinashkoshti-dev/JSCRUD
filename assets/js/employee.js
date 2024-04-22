$(() => {
    console.log('test!');
    loadData()
});

var loadData = () => {
    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(data => {
            console.log(data.products)
            localStorage.setItem("products", JSON.stringify(data.products));
            getAllData()
        })
        .catch(error => { console.error('Error:', error) });
}

var getAllData = () => {
    const productlist = JSON.parse(localStorage.getItem('products'));
    $(Employee).find(".table").find(".divTableRow").html('');
    productlist.forEach(element => {
        console.log(element)
        var template = $(Employee).find(".table").find(".divSample").find("tr").clone()
        template.find(".tdId").html(element.id)
        template.find(".tdTitle").html(element.title)
        template.find(".tdBrand").html(element.brand)
        template.find(".tdCategory").html(element.category)
        $(template).find(".btnEdit").attr("data-id", element.id).on("click", (e) => {
            getByID($(e.currentTarget).attr('data-id'));
        });
        $(template).find(".btnDelete").attr("data-id", element.id).on("click", (e) => {
            deleleById($(e.currentTarget).attr('data-id'))
        });
        $(Employee).find(".table").find(".divTableRow").append(template);
    });
}

var getByID = (id) => {
    fetch('https://dummyjson.com/products/' + id)
        .then(response => response.json())
        .then(data => { console.log(data) })
        .catch(error => { console.error('Error:', error) });
}

var deleleById = (id) => {
    fetch('https://dummyjson.com/products/' + id, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const productlist = JSON.parse(localStorage.getItem('products'));
            var newlist = productlist.filter(x => x.id != data.id);
            localStorage.setItem("products", JSON.stringify(newlist));
            getAllData()
        })
        .catch(error => { console.error('Error:', error) });
}

var Add = () => {
    fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: 'BMW Pencil',
            /* other product data */
        })
    })
        .then(res => res.json())
        .then(console.log);
}

var Update = () => {
    fetch('https://dummyjson.com/products/1', {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: 'iPhone Galaxy +1'
        })
    })
        .then(res => res.json())
        .then(console.log);
}