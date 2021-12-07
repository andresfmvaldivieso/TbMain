import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css']
})
export class SaveTaskComponent implements OnInit {
  registerData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  constructor(
    private _boardService: BoardService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerData = {};
   }

  ngOnInit(): void {
  }
  saveTask(){
    if(
      !this.registerData.name ||
      !this.registerData.description
    ){
      this.message = 'failed process: incomplete data';
      this.openSnackBarError();
    }else{
      this._boardService.saveTask(this.registerData).subscribe({
        next:(v) => {
          this._router.navigate(['/listTask']);
          this.message = "Successful task registration"
          this.openSnackBarSuccesFull();
        },
        error: (e) => {
          this.message = e.error.message;
          this.openSnackBarError();
        }
      });
    }
  }
  openSnackBarSuccesFull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: 'style-snackbarTrue',
    });
  }
  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: 'style-snackbarFalse',
    });
  }
}
