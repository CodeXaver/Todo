let form = document.querySelector('form'),
    list = document.getElementById('list');

    

    //fetch todos from local storage
 const getTodos = () => {
    let data = localStorage['todos'];
    if((data == null) || (typeof data == 'undefined'))
        return [];
    else
        return JSON.parse(data);
 };

 //save todo
    form.addEventListener('submit', (e)=>{
        console.log("submitted")
        e.preventDefault();
  let t = document.getElementById('title').value;
let d = document.getElementById('description').value;  
  let data = getTodos();

if(d.length > 2 || t.length >2 ){

data.push({
   title:t,
   description: d,
   status: 'pending'
});

localStorage['todos'] = JSON.stringify(data);
 alert("successfully added");
    window.location.reload();
}
else{
  alert("please provide Todo title and description");

}

})


 
//display todos
const displayTodos = ()=>{
 let data = getTodos();
 let i;
 for(i=0; i<data.length; i++){
   if(data[i].status == 'completed'){
list.innerHTML += `<div id="${i}" class="todo"><img class="completed" id="${i}" src="./assets/approve.png" alt="completed" onclick="${markTodo()};" ><div><h3>${data[i].title}</h3> <p>${data[i].description}</p></div> <img id="${i}" class="delete" src="./assets/Cancel.png" alt="cancel" onclick="${deleteTodo()};"></div>`
   }else{
list.innerHTML +=`<div id="${i}" class="todo"><img class="pending"  id="${i}" src="./assets/Pending.png" alt="pending" onclick="${markTodo()};" ><div><h3>${data[i].title}</h3> <p>${data[i].description}</p></div> <img id="${i}" class="delete" src="./assets/Cancel.png" alt="cancel"></div>`;

   }
 }

}

 //delete todo
 const deleteTodo = () =>{
list.addEventListener('click', (e)=>{
e.preventDefault();
if(e.target.className == 'delete'){let data = getTodos();
data.splice(e.target.id, 1);
localStorage['todos'] = JSON.stringify(data);
window.location.reload();
}
else{console.log(e.target.className);}

 //alert("successfully deleted");

})
 }


 //mark todos
 const markTodo = ()=>{
  list.addEventListener('click', (e)=>{
    e.preventDefault();
    let data = getTodos();
    let todo = data[event.target.id];
    if(e.target.className == 'pending'){ 
      todo.status = 'completed'
   data[event.target.id] = todo;
 localStorage['todos'] = JSON.stringify(data);
 window.location.reload();
}
    else if(e.target.className == 'completed'){
      todo.status = 'pending'
   data[event.target.id] = todo;
 localStorage['todos'] = JSON.stringify(data);
    
 window.location.reload();
    }
 
}


  )}

//download all todos in a json file
const downloadAllTodos = () =>{
  if(getTodos().length > 0){
    const data = JSON.stringify(getTodos());
const blob = new Blob([data], {type: 'application/json'});
const url = webkitURL || URL;
const downloadLink = url.createObjectURL(blob);
const downloadButton = document.createElement('a');

downloadButton.setAttribute('download',`Todo-Export-${Date.now()}.json`);
downloadButton.setAttribute('href', downloadLink);
downloadButton.style.display = 'none';
document.body.appendChild(downloadButton);
downloadButton.click();
url.revokeObjectURL(downloadLink); 
  }else{
    alert("Empty Todo List");
  }


}



document.addEventListener("DOMContentLoaded", (event) => {

  displayTodos();
});
