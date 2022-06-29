//ANGULAR APP UTILIZANDO SOLO EL LOCALSTORAGE



/*import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  todolist: Array<any> = [];

  ngOnInit() {
    
    this.getElement();
  }

  title = 'TO DO LIST';


  inputgroup = new FormGroup({
    inputVal: new FormControl()
  })


  checking(todoItem: any): void {
    todoItem.checked = !todoItem.checked;
    localStorage.setItem("todolist", JSON.stringify(this.todolist));
  }


  @ViewChild('inputVal') inputName: any;

  adding() {
    let inputted = this.inputgroup.get("inputVal")?.value;
    
    let todoItem = { value: inputted, checked: 0 };


    if (inputted === '') {
      alert("Write something");
      throw new Error("Write something");
    }

    var elementi = localStorage.getItem("todolist");
    if (elementi) {
      var oggetto_elementi = JSON.parse(elementi);
      for (var i = 0; i < oggetto_elementi.length; i++) {
        if (inputted === oggetto_elementi[i].value) {
          alert("You've already written this");
          throw new Error("You've already written this");
        }
      }
      this.todolist = oggetto_elementi;
      this.todolist.push(todoItem);
    }
    localStorage.setItem("todolist", JSON.stringify(this.todolist));
    this.inputgroup.setValue({
      inputVal: ""
    });
  }

  public getElement() {
    //cuando refresh aggiorna todos los elementos en html y en el server, localstorage lo hace automatico
    var elementi = localStorage.getItem("todolist");
    var ArrayPrimo: any = [];
    if (elementi) {
      var array_elementi = JSON.parse(elementi);
      ArrayPrimo = array_elementi;
    } else {
      localStorage.setItem("todolist", JSON.stringify(ArrayPrimo));
    }
    this.todolist = ArrayPrimo;
  }

  deleteMemory() {
    //delete todos los elementos tanto en browser como en server
    this.todolist = [];
    localStorage.setItem("todolist", JSON.stringify(this.todolist));
    return this.todolist;
  }

  deleteItem() {
    //delete Item del localStorage y del html
    var elementi = localStorage.getItem("todolist");
    if (elementi) {
      var todolist1 = this.todolist;
      for (let i = 0; i < todolist1.length; i++) {
        if (todolist1[i].status_item === 1) {
          var j = this.todolist.indexOf(todolist1[i]);
          this.todolist.splice(j, 1);
        }
      }
      localStorage.setItem("todolist", JSON.stringify(this.todolist));
    }
  }
}*/