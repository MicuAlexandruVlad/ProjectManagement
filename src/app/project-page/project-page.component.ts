import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // methods

  onCreateNewProject(): void {
    this.router.navigate(['../add-project'])
  }

}
