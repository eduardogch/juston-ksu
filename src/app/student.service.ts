import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class StudentService {
 
constructor(private http:HttpClient) {}

    // Uses http.get() to load data 
    getStudents() {
        return this.http.get('http://localhost:8000/students');
    }
    
    // Uses http.post() to post data 
    addStudents(Feeling: string, FoodName: string) {
        this.http.post('http://localhost:8000/students',{ Feeling, FoodName })
        .subscribe((responseData) => {
        console.log(responseData);
        location.reload();
        }); 
    }
    deleteStudent(FoodName: string) {
        this.http.delete("http://localhost:8000/students/" + FoodName)
          .subscribe(() => {
              console.log('Deleted: ' + FoodName);
              location.reload();
          });
      }
}