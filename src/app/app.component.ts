import { Component, OnDestroy } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  titleSection: string = "";
  subs: Subscription;

  constructor( private router: Router) {
    this.subs = new Subscription();
  }

  ngOnInit() {
    const obs =  this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.titleSection = data.state.root.firstChild?.data['title_section'];
      }
    });
    this.subs.add(obs);
  }

  ngOnDestroy(): void {
    // this.subs.unsubscribe();
  }

}
