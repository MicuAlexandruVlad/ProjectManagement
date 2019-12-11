import { Component, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { SummaryDialogComponent } from "../summary-dialog/summary-dialog.component";
import { WorkExperienceDialogComponent } from "../work-experience-dialog/work-experience-dialog.component";
import { WorkExperience } from "../models/WorkExperience";
import Axios from "axios";
import { DbLinks } from "../models/constants/DbLinks";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "../models/User";
import { Education } from '../models/Education';
import { Skill } from '../models/Skill';

export interface DialogData {
  summary: string;
  donePressed: boolean;
  closePressed: boolean;
}

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

  dbLinks: DbLinks;
  user: User;

  userId = "5df1045899972e76a059ffdd";

  testing = true;

  summaryPlaceholder = 'No summary added'
  workExperiencePlaceholder = 'No work experience added'
  skillsPlaceholder = 'No skills added'

  initial = ''

  ngOnInit() {
    this.dbLinks = new DbLinks();

    if (this.testing) {
      this.user = new User()
      this.user.firstName = "John";
      this.user.lastName = "Bertale";
      this.user.city = "San Francisco";
      this.user.country = "United States of America";
      this.user.hasSummary = false;
      this.user.profileComplete = true;
      this.user.hasWorkExperience = true;
      this.user.hasEducation = false;
      this.user.hasSkills = false;
      this.user.currentPosition = "Mobile Developer";
      this.user.summary = "";
      this.user.workExperience = Array<WorkExperience>()
      this.user.education = Array<Education>()
      this.user.skills = Array<Skill>()
    }

    console.log(JSON.stringify(this.user));

    this.initial = this.user.firstName.charAt(0)
  }

  // methods

  openSummaryDialog(): void {
    const dialogRef = this.dialog.open(SummaryDialogComponent, {
      width: "750px",
      data: { summary: "", donePressed: false, closePressed: false }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data.donePressed) {
        this.postSummary(data.summary, this.userId)
      }
    });
  }

  openWorkExperienceDialog(): void {
    const dialogRef = this.dialog.open(WorkExperienceDialogComponent, {
      width: "750px",
      data: {
        company: "Oracle",
        jobTitle: "SQL Database Architect",
        jobStart: "01/01/2018",
        jobEnd: "01/01/2019",
        jobTasks: "Design SQL Databases",
        jobCountry: "Los Angeles",
        jobCity: "USA",
        edit: false,
        cancel: false
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (!data.cancel) {
        const workExperience = new WorkExperience();
        workExperience.company = data.company;
        workExperience.jobTitle = data.jobTitle;
        workExperience.jobStart = data.jobStart;
        workExperience.jobEnd = data.jobEnd;
        workExperience.jobTasks = data.jobTasks;
        workExperience.jobCity = data.jobCity;
        workExperience.jobCountry = data.jobCountry;

        this.user.workExperience.push(workExperience)
        this.user.hasWorkExperience = true

        //this.postWorkExperience(workExperience);
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  // server methods

  postSummary(summary: string, id: string) {
    Axios.post(this.dbLinks.uploadSummary, {
      id: id,
      summary: summary
    })
    .then((response) => {
      let status = response.data.status
      if (status == 200) {
        this.openSnackBar('Summary updated', 'Ok')
        this.user.hasSummary = true
        this.user.summary = summary
      }
    })
  }

  postWorkExperience(data: WorkExperience) {
    Axios.post(this.dbLinks.uploadWorkExperience, {
      id: this.userId,
      workExperience: data
    }).then(response => {
      let status = response.data.status;
      if (status == 200) {
        this.openSnackBar("Work eperience updated", "Ok");
        this.user.workExperience.push(data)
        this.user.hasWorkExperience = true
      }
    });
  }
}
