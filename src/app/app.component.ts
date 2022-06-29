import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {

  constructor(private http: HttpClient) { }
  title = 'MY TO DO LIST';
  todolist: Array<any> = [];

  inputgroup = new FormGroup({
    inputVal: new FormControl()
  })


  //AGGIUNGE ELEMENTO SIA SU DB CHE HTML. CREA OGGETTO todoItem E RIEMPIE ARRAY todolist
  adding() {
    let inputted = this.inputgroup.get("inputVal")?.value;
    let todoItem = { todo_item: inputted, status_item: false };
    if (inputted === '') {
      alert("Write something");
      throw new Error("Write something");
    }
    this.todolist.push(todoItem);

    this.inputgroup.setValue({
      inputVal: ""
    });

    var todoarray = this.todolist;
    this.http.post("http://localhost:3000/insertodo", {
      "todoarray": todoarray
    }).subscribe(
      (val: any) => { 
        console.log("Oggetto aggiunto", val); 
        let indexItem = this.todolist.indexOf(todoItem);
        this.todolist[indexItem].id = val.insertId;
      });
      
  }

  //FOCALIZZA IL (CLICK)
  stopPropagation(event: any) {
    event.stopPropagation();
  }

  //SELEZIONA ELEMENTO
  checking(todoItem: any): void { //
    todoItem.status_item = !todoItem.status_item;
    this.http.post("http://localhost:3000/updatetodo", {
      "todoItem": todoItem
    }).subscribe(
      (val) => { console.log("Item Updated", val); },
      (err) => { console.error(err); });
  }

  //CAMBIA NOME/CONTENUTO ELEMENTO (todo_item)
  editTodoItem(event: any, todoItem: any): void {
    event.stopPropagation();

    var k = this.todolist.indexOf(todoItem);
    var countH3 = document.getElementsByTagName("h3");

    for (var l = 0; l < countH3.length; l++) {
      if (l === k) {
        var changeHTML = countH3[l];
        var editable = changeHTML.innerHTML;
        if (editable) {
          if (editable === '') {
            alert("Write something");
            throw new Error("Write something");
          } else {
            todoItem.todo_item = editable;
            this.http.post("http://localhost:3000/updatetodo", {
              "todoItem": todoItem
            }).subscribe(
              (val) => { console.log("Item Updated", val); },
              (err) => { console.error(err); });
          }
        }
      }
    }
  }

  //ELIMINA SINGOLO ELEMENTO
  deleteItem(event: any, elem: any) {
    event.stopPropagation();

    var todolist1 = this.todolist;
    var j = this.todolist.indexOf(elem);
    todolist1.splice(j, 1);
    this.todolist = todolist1;

    this.http.post("http://localhost:3000/deleteSingle", {
      "todo_item": elem.todo_item
    }).subscribe(
      (val) => { console.log("Item Deleted.", val); });
  }

  //ELIMINA ELEMENTI SELEZIONATI
  deleteMultiple() {
    var todolist1 = this.todolist;
    for (let i = 0; i < todolist1.length; i++) {
      if (todolist1[i].status_item === true) {
        var j = this.todolist.indexOf(todolist1[i]);
        this.todolist.splice(j, 1);
      }
      var todoarray = this.todolist;
      this.http.post("http://localhost:3000/deleteItem", {
        "todoarray": todoarray
      }).subscribe(
        (val) => { console.log("Selected Items Deleted.", val); });
    }
  }

  //ELIMINA TUTTI GLI ELEMENTI
  deleteMemory() {
    this.todolist = [];
    var todoarray = this.todolist;
    this.http.post("http://localhost:3000/deletememory",
      { "todoarray": todoarray }).subscribe(
        (val) => { console.log("Memoria eliminata", val); } 
      );
    return this.todolist;
  }

  //MOSTRA ELEMENTI DEL DB ALL'HTML
  getTODO() {
    return this.http.get("http://localhost:3000/gettodo").subscribe({
      next: (data: any): void => { this.todolist = data; },
      complete: () => { },
      error: (err) => { console.error(err); }
    });
  }

  //CHIAMA ELEMENTI DEL DB ALL'HTML QUANDO RIAGGIORNO
  ngOnInit() {
    this.getTODO();
  }

  //RIAGGIORNA SU (click)
  saveinDB() {
    this.ngOnInit();
  }
}