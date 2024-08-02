import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {
  activities: any[] = [];

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.activityService.getActivities().then((activitiesSnapshot: any) => {
      activitiesSnapshot.subscribe((activitiesData: any) => {
        this.activities = activitiesData.map((a: any) => {
          return a.payload.doc.data();
        });
      });
    });
  }
}
  