import { Component } from '@angular/core';
import { ActivityService } from '../services/activity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.page.html',
  styleUrls: ['./add-activity.page.scss'],
})
export class AddActivityPage {

  name!: string;
  duration!: number;
  date!: string;

  constructor(private activityService: ActivityService, private router: Router) {}

  addActivity() {
    const activity = {
      name: this.name,
      duration: this.duration,
      date: this.date
    };
    this.activityService.addActivity(activity).then(() => {
      this.router.navigate(['/activities']);
    });
  }
}
