# JSCRUD
**GET All Todo**
<code>
fetch('https://dummyjson.com/todos')
.then(res => res.json())
.then(console.log);
//.catch(error => { console.error('Error:', error) });
</code>

**Get a single todo**
fetch('https://dummyjson.com/todos/1')
.then(res => res.json())
.then(console.log);
 
**Get todos by  id**
fetch('https://dummyjson.com/todos/user/5')
.then(res => res.json())
.then(console.log);

**Add todo**
fetch('https://dummyjson.com/todos/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    todo: 'Use DummyJSON in the project',
    completed: false,
    userId: 5,
  })
})
.then(res => res.json())
.then(console.log);

**Update todo**
fetch('https://dummyjson.com/todos/1', {
  method: 'PUT', /* or PATCH */
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    completed: false,
  })
})
.then(res => res.json())
.then(console.log);

**Delete todo**
fetch('https://dummyjson.com/todos/1', {
  method: 'DELETE',
})
.then(res => res.json())
.then(console.log);
