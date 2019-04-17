import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from '../student.service';  


@Component({
  selector: 'app-new-student-form',
  templateUrl: './new-student-form.component.html',
  styleUrls: ['./new-student-form.component.css']
})
export class NewStudentFormComponent implements OnInit {
  @Input() Feeling: string;
  @Input() FoodType: string;
  @Input() FoodName: string;
  constructor(private _myService: StudentService) { }
  onSubmit(){
    console.log("You submitted: " + this.Feeling + " " + this.FoodType+ " " + this.FoodName);
    this._myService.addStudents(this.Feeling ,this.FoodName);
  }
  
  ngOnInit() {
  }

}