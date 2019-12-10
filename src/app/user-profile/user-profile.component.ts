import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SummaryDialogComponent } from '../summary-dialog/summary-dialog.component';
import { WorkExperienceDialogComponent } from '../work-experience-dialog/work-experience-dialog.component';

export interface DialogData {
  summary: string
  donePressed: boolean
  closePressed: boolean
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  
  summary = ''

  ngOnInit() {
    if (this.summary.localeCompare('') == 0) {
      this.summary = 'No summary added.'
    }
  }


  // methods

  openSummaryDialog(): void {
    const dialogRef = this.dialog.open(SummaryDialogComponent, {
      width: '750px',
      data: { summary: '', donePressed: false, closePressed: false },
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log('Received data -> ' + JSON.stringify(data));
    });
  }

  openWorkExperienceDialog(): void {
    const dialogRef = this.dialog.open(WorkExperienceDialogComponent, {
      width: '750px',
      data: { company: '', jobTitle: '', jobStart: '', jobEnd: '', jobTasks: '' }
    });

    dialogRef.afterClosed().subscribe(data => {
      
    });
  }

}
