# JSCRUD
**GET All Todo**
fetch('https://dummyjson.com/todos')
.then(res => res.json())
.then(console.log);

**Get a single todo**
fetch('https://dummyjson.com/todos/1')
.then(res => res.json())
.then(console.log);
