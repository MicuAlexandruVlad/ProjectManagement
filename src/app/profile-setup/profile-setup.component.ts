import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  sequence,
} from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../data.service';
import { User } from '../models/User';
import { DbLinks } from '../models/constants/DbLinks';
import axios from 'axios'


@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.scss'],
  animations: [ 
  ]
})
export class ProfileSetupComponent implements OnInit {

  user: User
  dbLinks: DbLinks

  constructor(private snackBar: MatSnackBar, private dataService: DataService) { 
  }
  
  ngOnInit() {
    this.dbLinks = new DbLinks()
    this.user = this.dataService.user
    console.log('User data -> ' + JSON.stringify(this.user));
  }

  stepTitle = 'What is your name ?'
  btnText = 'Next'

  stepIndex = 0
  
  firstName = ''
  lastName = ''
  city = ''
  country = ''
  phoneNumber = ''
  profilePhotoPath = ''

  // flags
  toggleAnim = false
  isFirstStepOpen = true
  isSecondStepOpen = false
  isThirdStepOpen = false
  isFourthStep = false
  emailSelected = false
  phoneSelected = false

  onEmail(): void {
    this.emailSelected = true
    this.phoneSelected = false
  }

  onPhone(): void {
    this.phoneSelected = true
    this.emailSelected = false
  }

  onPhotoPicker(): void {
    document.getElementById('fileInp').click()
  }

  onNext(): void {
    if (this.checkFieldCompletion()) {
      if (this.stepIndex < 3) {
        this.stepIndex++
      } else {
        this.user.profileComplete = true
        this.user.hasPhoto = false
        this.updateUser(this.user)
      }
      this.animateUi()
      this.toggleAnim = !this.toggleAnim
      if (this.stepIndex == 3) {
        console.log(this.profilePhotoPath);
      }
    }
    console.log(this.stepIndex);
  }

  onBack(): void {
    if(this.stepIndex > 0) {
      this.stepIndex--
      this.toggleAnim = !this.toggleAnim
    }
    this.animateUi()
  }

  animateUi() {
    switch (this.stepIndex) {
      case 0:
        this.isFirstStepOpen = true
        this.isSecondStepOpen = false
        this.isThirdStepOpen = false
        this.isFourthStep = false
        this.stepTitle = 'What is your name ?'
        break;

      case 1:
          this.isFirstStepOpen = false
          this.isSecondStepOpen = true
          this.isThirdStepOpen = false
          this.isFourthStep = false
          this.stepTitle = 'Where do you live ?'
          break;
      case 2:
          this.isFirstStepOpen = false
          this.isSecondStepOpen = false
          this.isThirdStepOpen = true
          this.isFourthStep = false
          this.stepTitle = 'How would you like to be contacted ?'
          this.btnText = 'Next'
          break;
      case 3:
          this.isFirstStepOpen = false
          this.isSecondStepOpen = false
          this.isThirdStepOpen = false
          this.isFourthStep = true
          this.stepTitle = 'Let others know what you look like'
          this.btnText = 'Finish'
          break;
    
      default:
        break;
    }
  }

  checkFieldCompletion(): boolean {
    switch (this.stepIndex) {
      case 0:
        if (this.firstName.localeCompare('') == 0 || this.lastName.localeCompare('') == 0) {
          this.showSnack('One or more fields are empty', 'Ok')
          return false
        } else {
          this.user.firstName = this.firstName
          this.user.lastName = this.lastName
          return true
        }
        break

      case 1:
        if (this.city.localeCompare('') == 0 || this.country.localeCompare('') == 0) {
          this.showSnack('One or more fields are empty', 'Ok')
          return false
        } else {
          this.user.city = this.city
          this.user.country = this.country
          return true
        }
        break

      case 2: 
        if (!this.emailSelected && !this.phoneSelected) {
          this.showSnack('Please select a method', 'Ok')
          return false
        } else if(this.phoneSelected && this.phoneNumber.localeCompare('') == 0) {
          this.showSnack('No phone number added', 'Ok')
          return false
        } else {
          if (this.phoneSelected) {
            this.user.contactMethod = 1
            this.user.phoneNumber = this.phoneNumber
          } else {
            this.user.contactMethod = 0
            this.phoneNumber = ''
          }
          return true
        }
        break

      case 3: 
        return true
    
      default:
        return false
    }
  }

  showSnack(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    })
  }

  updateUser(user: User): void {
    axios.post(this.dbLinks.updateUser, {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      country: user.country,
      phoneNumber: user.phoneNumber,
      hasPhoto: user.hasPhoto,
      contactMethod: user.contactMethod,
      profileComplete: user.profileComplete,
    })
    .then((response) => {
      const status = response.data.status
    })
  }
}
