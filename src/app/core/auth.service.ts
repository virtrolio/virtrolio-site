import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth, User } from 'firebase/app';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { VirtrolioUser } from '../shared/interfaces';
import { Location } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static readonly keyLength = 7;
  static readonly keyOptions = 'qwertyuipasdfghjkzxcvbnmQWERTYUPASDFGHJKLZXCVBNM123456789';
  private user: User;

  constructor(private afa: AngularFireAuth, private afs: AngularFirestore, private router: Router, private location: Location,
              private deviceDetectorService: DeviceDetectorService) {
    this.afa.user.subscribe((user: User) => this.user = user);
  }

  /**
   * Displays an error to the user using an alert and a human-readable prefix.
   * @param error - The error to display to the user.
   */
  static displayError(error) {
    alert('An error occurred. Here are the details that you can report to our team through the \'Contact Us\' page:\n' + error);
  }

  /**
   * Generates a random string of characters of length AppAuthService.keyLength using the characters in
   * AppAuthService.keyOptions.
   */
  static generateKey(): string {
    let key = '';
    for (let i = 0; i < AuthService.keyLength; i++) {
      key += AuthService.keyOptions.charAt(Math.floor(Math.random() * AuthService.keyOptions.length));
    }
    return key;
  }

  /**
   * Combines the desired routerLink and queryParams into one string, adding all necessary ?, = and &.
   * Used to create a path param for this.location.go().
   * @param path - the desired routerLink
   * @param queryParams - all query params to be added onto the routerLink
   */
  static parseQueryParams(path: string, queryParams: object): string {
    let redirectPath = path;
    if (queryParams) {
      redirectPath += '?';
      for (const param in queryParams) {
        if (queryParams.hasOwnProperty(param)) {
          redirectPath += param + '=' + queryParams[param] + '&';
        }
      }
      // Remove the extra ampersand at the end
      return redirectPath.slice(0, -1);
    } else {
      return path;
    }
  }

  /**
   * @param uid - Optional - The user ID of the user's data to retrieve. Defaults to the current user.
   * @returns The Firestore document containing the user's data.
   */
  async getUserData(uid: string = this.uid()) {
    const userRef: AngularFirestoreDocument<VirtrolioUser> = this.afs.collection('users').doc<VirtrolioUser>(uid);
    return await userRef.valueChanges().pipe(take(1)).toPromise().catch(error => {
      AuthService.displayError(error);
    });
  }

  /**
   * @returns The current User object.
   */
  getUser(): User {
    this.throwErrorIfLoggedOut('access your user data');
    return this.user;
  }

  /**
   * Logs the user into the website using Firebase Authentication and the specified provider.
   * User data creation is handled ONLY for desktop devices.
   * Any page calling login **must** call AuthService.redirectLoginUserCreation() in ngOnInit() of the page that it redirects to.
   * Otherwise, mobile users will not be able to create a user.
   * Upon login, the user will be redirected to a new page as defined in routeTo.
   * @param routeTo - The routerLink that the user will be redirected to on a successful login.
   * @param queryParams - Optional - Any query params to be passed during navigation after successful navigation.
   * @returns A promise evaluating to true if the redirect is successful (only returned on desktop devices).
   * @throws Error - If the login fails
   */
  async login(routeTo: string, queryParams?: object): Promise<void | boolean> {
    if (typeof routeTo === 'undefined' || !routeTo) {
      throw new Error('Route was not provided');
    }
    // Prepare sign-in provider(s)
    const googleAuthProvider = new auth.GoogleAuthProvider();

    // Check device type
    if (this.deviceDetectorService.isDesktop()) { // Device is desktop, so use sign-in with popup
      return this.afa.signInWithPopup(new auth.GoogleAuthProvider()).then((userCredentials) => {
        if (userCredentials.user) {  // If user is not null
          return this.createUser(userCredentials.user).then(() => {
            return this.router.navigate([ routeTo ], { queryParams });
          });
        } else {
          console.log('Login failed');
          return this.router.navigate([ '/' ]);
        }
      }).catch(error => {
        AuthService.displayError(error);
        return this.router.navigate([ '/access-denied' ]);
      });
    } else { // Device is phone/tablet, so use sign-in with redirect
      const redirectPath = AuthService.parseQueryParams(routeTo, queryParams);
      this.location.go(redirectPath);
      // Sign-in with Redirect is necessary to support popup browsers which do not have support for multiple tabs)
      return this.afa.signInWithRedirect(googleAuthProvider).catch(error => {
        AuthService.displayError(error);
        return this.router.navigate([ '/access-denied' ]);
      });
    }
  }

  /**
   * Logs the user out of the website using Firebase Authentication.
   * Upon successful logout, the user will be redirected to the home page.
   * @returns A promise evaluating to true if the redirect is successful.
   * @throws Error - If the logout fails
   */
  logout(): Promise<boolean> {
    return this.afa.signOut().then(() => {
      return this.router.navigate([ '/' ]);
    }).catch(error => {
      AuthService.displayError(error);
      return this.router.navigate([ '/' ]);
    });
  }

  /**
   * Creates a new VirtrolioUser document in the 'users' collection of the database only if the document for the
   * currently logged in user doesn't exist.
   */
  async createUser(user: User): Promise<void> {
    // Not using this.getUserData() because userRef is required
    const userRef: AngularFirestoreDocument<VirtrolioUser> = this.afs.collection('users').doc<VirtrolioUser>(user.uid);
    const userDoc = await userRef.valueChanges().pipe(take(1)).toPromise().catch(error => {
      AuthService.displayError(error);
    });

    if (!userDoc) { // User doesn't exist in database
      const userData: VirtrolioUser = {
        displayName: user.displayName,
        key: AuthService.generateKey(),
        profilePic: user.photoURL
      };
      await userRef.set(userData).catch(error => {
        AuthService.displayError(error);
      });
    } else { // User exists in database, make sure all fields are present
      if (!('key' in userDoc)) {
        await userRef.update({ key: AuthService.generateKey() }).catch(error => {
          AuthService.displayError(error);
        });
      }
      if (!('displayName' in userDoc)) {
        await userRef.update({ displayName: user.displayName }).catch(error => {
          AuthService.displayError(error);
        });
      }
      if (!('profilePic' in userDoc)) {
        await userRef.update({ profilePic: user.photoURL }).catch(error => {
          AuthService.displayError(error);
        });
      }
    }
  }

  /**
   * Handles the user creation if the user was signed in using signInWithRedirect() (called on mobile devices) instead of signInWithPopup().
   * Should be called on any page that could potentially be a page that the user is redirected to after calling AuthService.login().
   * User creation for devices using signInWithPopup() (desktops) is handled in AuthService.login().
   */
  async redirectLoginUserCreation(): Promise<void> {
    const userCredentials = await this.afa.getRedirectResult();
    // user will be null if signInWithRedirect wasn't called right before
    if (userCredentials.user) {
      await this.createUser(userCredentials.user);
    }
  }

  /**
   * Should not be used on pages/guards that are not protected by the LoginResolver.
   * If async functionality is required, use asyncIsLoggedIn() instead.
   * @returns True if the user is logged in.
   */
  isLoggedIn(): boolean {
    return this.user != null;
  }

  /**
   * Identical to isLoggedIn(), except using a promise. Allows the caller to utilize .then() or await.
   * If the usage of .then() or await by the caller is not required, isLoggedIn() should be used instead.
   * @returns a Promise evaluating to True if the user is logged in.
   */
  async asyncIsLoggedIn() {
    const user = await this.afa.user.pipe(take(1)).toPromise();
    return !!user;
  }

  /**
   * Throws a ReferenceError if the user is logged out instead of returning false (that's isLoggedIn()).
   * Does nothing if the user is logged in.
   * The Error is designed in such a way that the error message can be displayed to the user using a Modal or an Alert.
   * @param attemptedOperation - The operation that is not permitted if the user is logged out, such as 'send a message'.
   * Should be in present tense and be in user-friendly language.
   * @throws ReferenceError - If the user is not logged in
   */
  async asyncThrowErrorIfLoggedOut(attemptedOperation: string): Promise<void> {
    if (!await this.asyncIsLoggedIn()) {
      throw new ReferenceError('Cannot ' + attemptedOperation + ' because you are not logged in.');
    }
  }

  /**
   * Throws a ReferenceError if the user is logged out instead of returning false (that's isLoggedIn()).
   * Does nothing if the user is logged in.
   * The Error is designed in such a way that the error message can be displayed to the user using a Modal or an Alert.
   * @param attemptedOperation - The operation that is not permitted if the user is logged out, such as 'send a message'.
   * Should be in present tense and be in user-friendly language.
   * @throws ReferenceError - If the user is not logged in
   */
  throwErrorIfLoggedOut(attemptedOperation: string): void {
    if (!this.isLoggedIn()) {
      throw new ReferenceError('Cannot ' + attemptedOperation + ' because you are not logged in.');
    }
  }

  /**
   * @param uid - The uid to get the profile picture of. Defaults to the current user if not provided.
   * @returns The URL to the user's profile picture.
   * @throws ReferenceError - If the user is not logged in or doesn't exist
   */
  async profilePictureLink(uid: string = this.uid()): Promise<string> {
    await this.asyncThrowErrorIfLoggedOut('get your profile picture');
    // noinspection DuplicatedCode
    if (uid === this.uid()) {
      // Avoid unnecessary database reads by getting current user data directly from Firebase Authentication
      return this.user.photoURL;
    } else {
      const userDoc = await this.getUserData(uid);
      if (userDoc) {
        return userDoc.profilePic;
      } else {
        throw new ReferenceError('User document doesn\'t exist');
      }
    }
  }

  /**
   * Same as profilePictureLink, except not async to avoid issues with the navbar loading too fast.
   * This method should <u>**NOT**</u> be called by anything except the navbar. Use profilePictureLink() instead.
   * @returns The URL to the user's profile picture.
   * @throws ReferenceError - If the user is not logged in
   */
  notAsyncProfilePictureLink(): string {
    return this.user.photoURL;
  }

  /**
   * @param uid - The uid to get the display name of. Defaults to the current user if not provided.
   * @returns The Display Name of the user as defined in the account that they use to sign in.
   * @throws ReferenceError - If the user is not logged in or doesn't exist
   */
  async displayName(uid: string = this.uid()): Promise<string> {
    await this.asyncThrowErrorIfLoggedOut('get your name');
    // noinspection DuplicatedCode
    if (uid === this.uid()) {
      // Avoid unnecessary database reads by getting current user data directly from Firebase Authentication
      return this.user.displayName;
    } else {
      const userDoc = await this.getUserData(uid);
      if (userDoc) {
        return userDoc.displayName;
      } else {
        throw new ReferenceError('User document doesn\'t exist');
      }
    }
  }

  /**
   * @returns The user's Firebase Authentication User ID.
   * @throws ReferenceError - If the user is not logged in
   */
  uid(): string {
    this.throwErrorIfLoggedOut('get your user ID');
    return this.user.uid;
  }

  /**
   * Checks if the provided user exists in the Users collection in the database.
   * This method should only be called if the user has logged in at least once before.
   * @param uid - The UID of the user to check
   * @throws Error - If the argument is blank, null or undefined.
   */
  async userExists(uid: string): Promise<boolean> {
    if (typeof uid === 'undefined' || !uid) {
      throw new Error('Argument UID was not provided');
    }
    const userRef = this.afs.collection('users').doc(uid);
    return userRef.snapshotChanges().pipe(take(1)).toPromise().then((userDoc: any) => {
        return userDoc.payload.exists;
      }
    ).catch(error => alert(error));
  }
}
