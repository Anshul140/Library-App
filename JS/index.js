console.log("Welcome to project-2 || Library Project");
//to-do
// 1-Add datas to local Storage
// 2-Delete Option
// 3-Add a scroll bar

//constructor
function Book(name, author, category){
    this.name = name;
    this.author = author;
    this.category = category;
}

//display constructor
function Display(){

}

//Add methods to display prototype
Display.prototype.add = function(book){
    console.log('Adding to UI');
    let tableBody = document.getElementById('tableBody');
    let uiString = `
            <tr>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.category}</td>
            </tr>`;
    tableBody.innerHTML += uiString;        
}

//Implement the clear function
Display.prototype.clear = function(){
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset(); //reset()- clears the inputs field after submission
}

//Implement the validate function
Display.prototype.validate = function(book){
    if(book.name.length<2 || book.author.length<2)
    {
        return false;
    }
    else{
        return true;
    }
}    
Display.prototype.show = function(category, displayMessage){

    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${category} alert-dismissible fade show" role="alert">
                        <strong>Message:</strong> ${displayMessage}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                        </div>`;
    
    setTimeout(function () {
        message.innerHTML = ''
    }, 5000);
}


//Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e){
    //default behaviour of forms is to refresh the page as soon as submit button is clicked hence to prevent that bottom fn is written
    
    console.log('You have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('Author').value;
    let category;

    let fiction = document.getElementById('Fiction');
    let programming = document.getElementById('Programming');
    let romance = document.getElementById('Romance');

    if(fiction.checked){
        category = fiction.value;
    }
    else if(programming.checked){
        category = programming.value;
    }
    else if(romance.checked){
        category = romance.value;
    }

    let book = new Book(name, author, category);
    console.log(book);

    let display = new Display();
    
    if(display.validate(book)){
    
        display.add(book);
        display.clear();
        display.show('Success', 'Your book has been added successfully');
    }
    else{
        display.show('Error', 'Sorry you cannot add this book');
    }
        

    e.preventDefault();
}