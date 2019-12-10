import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate(['./projects'], { relativeTo: this.activatedRoute })
  }

  currentPageTitle = 'Projects'

  //methods

  onNavProjects(): void {
    this.currentPageTitle = 'Projects'
    this.router.navigate(['./projects'], { relativeTo: this.activatedRoute })
  }

  onUserProfile(): void {
    this.router.navigate(['./user-profile'])
  }

}
