$(() => {
    console.log('page is loaded!');
    loadData()
    
    $("#exampleModal").find("#btnAdd").off().on("click", (e) => {
        AddProduct();
    })
});

var loadData = () => {
    fetch('https://dummyjson.com/products?limit=10')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("products", JSON.stringify(data.products));
            getAllData()
        })
        .catch(error => { console.error('Error:', error) });
}

var getAllData = () => {
    const productlist = JSON.parse(localStorage.getItem('products'));
    $(Employee).find(".table").find(".divTableRow").html('');
    productlist.forEach(element => {
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
    fetch('https://dummyjson.com/products/' + id.toString())
        .then(response => response.json())
        .then(data => {
            console.log(data)
            $('#ID').val(data.id);
            $('#title').val(data.title);
            $('#brand').val(data.brand);
            $('#category').val(data.category);
            $('#description').val(data.description);
            $('#exampleModal').modal('show');
        })
        .catch(error => { console.error('Error:', error) });
}

var deleleById = (id) => {
    var ans = confirm("Are you sure you want to delete this Record?");

    if (ans)
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
                toastr.success("Product deleted successfully!");                
            })
            .catch(error => { console.error('Error:', error) });
}

var AddProduct = () => {
    console.log("call1")
    var obj = {
        id: $('#ID').val() ? $('#ID').val() : 0,
        title: $('#title').val(),
        brand: $('#brand').val(),
        category: $('#category').val(),
        description: $('#description').val(),
    };
    if (obj.id) {
        fetch('https://dummyjson.com/products/' + obj.id, {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.id == parseInt(obj.id)) {
                    toastr.success("Product updated successfully!");
                    $('#exampleModal').modal('hide');
                    ResetForm();

                    const productlist = JSON.parse(localStorage.getItem('products'));
                    var newproductlist = productlist.filter(x => x.id != data.id);
                    newproductlist.unshift(data);
                    localStorage.setItem("products", JSON.stringify(newproductlist));
                    getAllData();
                }
            });
    }
    else {
        console.log("call2")
        fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
            .then(res => res.json())
            .then(data => {
                toastr.success("Product Added successfully!");
                $('#exampleModal').modal('hide');
                ResetForm();
                console.log(data)
                const productlist = JSON.parse(localStorage.getItem('products'));
                productlist.push(data);
                localStorage.setItem("products", JSON.stringify(productlist));
                getAllData();

            });
    }
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

var ResetForm = () => {
    $('#ID').val("");
    $("#title").val("");
    $("#brand").val("");
    $("#category").val("");
    $("#description").val("");    
}