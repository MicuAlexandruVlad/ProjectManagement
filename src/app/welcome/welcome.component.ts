import {
  Component,
  OnInit
} from '@angular/core';
import {
  User
} from '../models/User';

import axios from 'axios';
import {
  DbLinks
} from '../models/constants/DbLinks';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) {}

  btnAction = 'Login'
  // 1 = Login, 2 = Sign Up
  btnActionId = 1

  //binds
  username: string = ''
  email: string = ''
  repeatEmail: string = ''
  password: string = ''
  repeatPassword: string = ''
  alertMessage: string = ''

  //flags
  loginClicked = true
  canDisplayAlert = false

  dbLinks: DbLinks


  ngOnInit() {
    this.dbLinks = new DbLinks()

  }

  onCloseWarningAlert() {
    this.canDisplayAlert = false
  }

  onLogin(): void {
    this.loginClicked = true
    this.btnAction = 'Login'
    this.btnActionId = 1
  }

  onSignUp(): void {
    this.loginClicked = false
    this.btnAction = 'Sign Up'
    this.btnActionId = 2
  }

  onActionButton(): void {
    if (this.btnActionId == 1) {
      if (this.email.localeCompare('') == 0 || this.password.localeCompare('') == 0) {
        this.alertMessage = 'Some fields are empty'
        this.canDisplayAlert = true
      } else {
        this.authUser(this.email, this.password, this.dataService, this.router, this.alertMessage, this.canDisplayAlert)
      }
    } else {
      if (this.email.localeCompare('') == 0 || this.repeatEmail.localeCompare('') == 0 ||
        this.username.localeCompare('') == 0 || this.password.localeCompare('') == 0 ||
        this.repeatPassword.localeCompare('') == 0) {
        this.alertMessage = 'Some fields are empty'
        this.canDisplayAlert = true
      } else if (this.email.localeCompare(this.repeatEmail) != 0) {
        this.alertMessage = 'Emails do not match'
        this.canDisplayAlert = true
      } else if (this.password.localeCompare(this.repeatPassword) != 0) {
        this.alertMessage = 'Passwords do not match'
        this.canDisplayAlert = true
      } else {
        // POST user to server
        let user = new User()
        user.username = this.username
        user.email = this.email
        user.password = this.password
        user.hasPhoto = false
        user.lastName = ''
        user.firstName = ''

        this.postUser(user)
      }
    }
  }

  authUser(email: string, password: string, dataService: DataService, router: Router, alertMessage: string,
     canDisplayAlert: boolean) {
    axios.get(this.dbLinks.authUser, {
      params: {
        email: email,
        password: password
      }
    })
    .then(function (response) {
      const status = response.data.status
      if (status == 200) {
        const user = new User()
        const userData = response.data.user
        user.firstName = userData.firstName
        user.lastName = userData.lastName
        user.id = userData._id
        user.hasPhoto = userData.hasPhoto
        user.email = userData.email
        user.photoId = userData.photoId
        user.username = userData.username
        user.profileComplete = userData.profileComplete
        dataService.user = user
        if (!user.profileComplete) {
          console.log('User data -> ' + JSON.stringify(user));
          router.navigate(['/profile-setup'], { replaceUrl: true })
        }

      } else {
        alertMessage = 'User not found'
        canDisplayAlert = true
      }
    })
    .catch(function (error) {
      console.log(error)
    })
    .finally(function () {
      // always executed
    })
  }

  postUser(user: User): void {
    axios.post(this.dbLinks.registerUser, {
      username: user.username,
      email: user.email,
      password: user.password,
      hasPhoto: user.hasPhoto,
      firstName: user.firstName,
      lastName: user.lastName,
    }).then((response) => {
      const status = response.data.status
      if (status == 200) {
        alert('Account created')
      } else {
        alert('There was a problem')
      }
    })
  }
}
