import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.page.html',
  styleUrls: ['./edit-activity.page.scss'],
})
export class EditActivityPage implements OnInit {
  id!: string;
  name!: string;
  duration!: number;
  date!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.activityService.getActivities().then((activitiesSnapshot: any) => {
      activitiesSnapshot.subscribe((activitiesData: any) => {
        const activity = activitiesData.find((a: any) => a.payload.doc.id === this.id)?.payload.doc.data();
        if (activity) {
          this.name = activity.name;
          this.duration = activity.duration;
          this.date = activity.date;
        }
      });
    });
  }

  updateActivity() {
    this.activityService.updateActivity(this.id, { name: this.name, duration: this.duration, date: this.date }).then(() => {
      this.router.navigate(['/activities']);
    });
  }
}

