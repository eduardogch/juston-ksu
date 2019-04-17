import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  constructor() { }
  Value = 'Submit';
  buttonName = 'PropertyBindingButton';
  DisableStatus = false;
  
  buttonClicked(){
    this.DisableStatus = true;
    this.buttonName = 'EventBindingClicked';
  }

  buttonHover(){
    this.buttonName.fontcolor("red");
    this.buttonName.bold();
  }
 
  ngOnInit() {
  }

}
