$(() => {   
    loadData()
    $("#exampleModal").find("#btnAdd").off().on("click", (e) => {
        AddProduct();
    })
});
let productlist = [];

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
    productlist = JSON.parse(localStorage.getItem('products'));
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
    var data = productlist.find(x => x.id == id);
    if (data != null) {
        $('#ID').val(data.id);
        $('#title').val(data.title);
        $('#brand').val(data.brand);
        $('#category').val(data.category);
        $('#description').val(data.description);
        $('#exampleModal').modal('show');
    }   
}

var deleleById = (id) => {
    var ans = confirm("Are you sure you want to delete this Record?");

    if (ans) {
        var newlist = productlist.filter(x => x.id != id);
        localStorage.setItem("products", JSON.stringify(newlist));
        getAllData()
        toastr.success("Product deleted successfully!");
    }
}

var AddProduct = () => {
    var obj = {
        id: $('#ID').val() ? $('#ID').val() : 0,
        title: $('#title').val(),
        brand: $('#brand').val(),
        category: $('#category').val(),
        description: $('#description').val(),
    };
    if (obj.id) {
        products = productlist.map(product => {
            if (product.id == obj.id) {
                product.title = $('#title').val(),
                    product.brand = $('#brand').val(),
                    product.category = $('#category').val(),
                    product.description = $('#description').val()
            }
            return product;
        });        
        localStorage.setItem("products", JSON.stringify(products));
        getAllData();

        toastr.success("Product updated successfully!");
        $('#exampleModal').modal('hide');
        ResetForm();
    }
    else {
        obj.id=productlist.length+1;

        productlist.push(obj);
        localStorage.setItem("products", JSON.stringify(productlist));
        toastr.success("Product Added successfully!");
        $('#exampleModal').modal('hide');
        ResetForm();
        getAllData();     
    }
}

var ResetForm = () => {
    $('#ID').val("");
    $("#title").val("");
    $("#brand").val("");
    $("#category").val("");
    $("#description").val("");
}