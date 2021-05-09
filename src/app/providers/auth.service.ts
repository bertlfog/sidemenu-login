import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model'; // optional

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated:boolean = false;
  public user$: Observable<User>;

  constructor( private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {

      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            this.isAuthenticated = true;
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();

          } else {
            this.isAuthenticated = false;
            return of(null);
          }
        })
      );


    }
    
    async googleSignin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      console.log(credential);
      this.updateUserData(credential.user);
      this.isAuthenticated = true;

    }
    async emailSignin(user: string, pw: string) {
      
      const credential = await this.afAuth.signInWithEmailAndPassword(user, pw);
      this.updateUserData(credential.user);
      this.isAuthenticated = true;
    }
  
    private updateUserData(user: firebase.User) {
      // Sets user data to firestore on login
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
  
      const data = { 
        uid: user.uid, 
        email: user.email, 
        displayName: user.displayName, 
        photoURL: user.photoURL
      } 
      console.log(data);
      return userRef.set(data, { merge: true })
  
    }
  
    async signOut() {
      await this.afAuth.signOut();
      this.router.navigate(['/']);
      this.isAuthenticated = false;

    }

    async signUp(user: string, pw: string) {
      const credential = await this.afAuth.createUserWithEmailAndPassword(user, pw);
      this.isAuthenticated = true;
      return this.updateUserData(credential.user);
    }
}
