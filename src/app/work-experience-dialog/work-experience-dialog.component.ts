import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    company: string
    jobTitle: string
    jobStart: string
    jobEnd: string
    jobTasks: string
    jobCity: string
    jobCountry: string
    edit: boolean
    cancel: boolean
}

@Component({
  selector: 'app-work-experience-dialog',
  templateUrl: './work-experience-dialog.component.html',
  styleUrls: ['./work-experience-dialog.component.scss']
})
export class WorkExperienceDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WorkExperienceDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
        
  startDate = new Date(this.data.jobStart)
  endDate = new Date(this.data.jobEnd)

  isPresentChecked = false

  ngOnInit() {
    console.log(this.data);
  }


  onPresent(): void {
    this.isPresentChecked = !this.isPresentChecked
  }
  
  onCancel(): void {
    this.data.cancel = true
  }

  onDone(): void {
    if (this.isPresentChecked) {
      this.data.jobEnd = 'Present'
    } else {
      this.data.jobEnd = this.endDate.toString()
    }
    this.data.jobStart = this.startDate.toString()
  }

}
