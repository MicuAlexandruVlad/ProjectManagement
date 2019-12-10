import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    company: string
    jobTitle: string
    jobStart: string
    jobEnd: string
    jobTasks: string
}

@Component({
  selector: 'app-work-experience-dialog',
  templateUrl: './work-experience-dialog.component.html',
  styleUrls: ['./work-experience-dialog.component.scss']
})
export class WorkExperienceDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WorkExperienceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onPresent(): void {
    this.data.jobEnd = 'Present'
    
  }

}
