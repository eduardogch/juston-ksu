import { Output, EventEmitter, Component, OnInit, Input } from '@angular/core';
import {  FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent 
{
  mood = new FormControl('');
}
export class ProfileEditorComponent implements OnInit
{
  profileForm = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl(''),
  });
  ngOnInit() {
  }
}

