import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) {}

  addActivity(activity: any) {
    return this.authService.getUser().then((user: any) => {
      return this.firestore.collection('activities').add({
        ...activity,
        userId: user?.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    });
  }

  getActivities() {
    return this.authService.getUser().then((user: any) => {
      return this.firestore.collection('activities', ref => ref.where('userId', '==', user?.uid).orderBy('timestamp', 'desc')).snapshotChanges();
    });
  }

  updateActivity(id: string, activity: any) {
    return this.firestore.collection('activities').doc(id).update(activity);
  }

  deleteActivity(id: string) {
    return this.firestore.collection('activities').doc(id).delete();
  }
}
