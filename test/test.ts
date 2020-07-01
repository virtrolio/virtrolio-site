import * as firebase from '@firebase/testing';
import { suite, test } from '@testdeck/mocha';
import * as fs from 'fs';
import { VirtrolioMessage, VirtrolioMessageTemplate } from '../src/app/shared/interfaces';
import Timestamp = firebase.firestore.Timestamp;

/*
 * ============
 *    Setup
 * ============
 */
const projectId = 'virtrolio';
const coverageUrl = `http://localhost:8080/emulator/v1/projects/${projectId}:ruleCoverage.html`;

const rules = fs.readFileSync('firestore.rules', 'utf8');

// Test Data setup
const f = {
  uid: 'cFWt1nbf2xyZg2dcMa5hi3yZNQ52',
  displayName: 'Bob Jones',
  profilePic: 'https://pixabay.com/get/57e5dd464a54ac14f6d1867dda35367b1c3cdbe25751734b_1920.jpg',
  key: 'fDuX2pr'
};
const t = {
  uid: '72MHzGjWqzXy20uYzn2oU8j2qqe2',
  displayName: 'Jones Bob',
  profilePic: 'https://pixabay.com/get/57e5dd464a54ac14f6d1867dda35367b1c3cdbe25751734b_1920.jpg',
  key: 'fDuX2pr'
};

class TestMsgTemplate implements VirtrolioMessage {
  backColor = '#FFFFFF';
  contents = '';
  fontColor = '';
  fontFamily = '';
  to = t.uid;
  from = f.uid;
  fromName: string;
  fromPic: string;
  isRead: boolean;
  key: string;
  timestamp: Timestamp;
  year: number;
  id: string;
}

/**
 * Creates a new app with authentication data matching the input.
 *
 * @param auth the object to use for authentication (typically {uid: some-uid})
 * @return the app.
 */
function authedApp(auth) {
  return firebase.initializeTestApp({ projectId, auth }).firestore();
}

/*
 * ============
 *  Test Cases
 * ============
 */
before(async () => {
  await firebase.loadFirestoreRules({ projectId, rules });
});

beforeEach(async () => {
  // Clear the database between test
  await firebase.clearFirestoreData({ projectId });
});

after(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
  console.log(`View rule coverage information at ${coverageUrl}\n`);
});

@suite
class MyApp {
  @test
  async 'require users to log in before creating a profile'() {
    const db = authedApp(null);
    const profile = db.collection('users').doc('alice');
    await firebase.assertFails(profile.set({ birthday: 'January 1' }));
  }

  @test
  async 'should enforce the createdAt date in user profiles'() {
    const db = authedApp({ uid: 'alice' });
    const profile = db.collection('users').doc('alice');
    await firebase.assertFails(profile.set({ birthday: 'January 1' }));
    await firebase.assertSucceeds(
      profile.set({
        birthday: 'January 1',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
    );
  }

  @test
  async 'should only let users create their own profile'() {
    const db = authedApp({ uid: 'alice' });
    await firebase.assertSucceeds(
      db
        .collection('users')
        .doc('alice')
        .set({
          birthday: 'January 1',
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    );
    await firebase.assertFails(
      db
        .collection('users')
        .doc('bob')
        .set({
          birthday: 'January 1',
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    );
  }

  @test
  async 'should let anyone read any profile'() {
    const db = authedApp(null);
    const profile = db.collection('users').doc('alice');
    await firebase.assertSucceeds(profile.get());
  }

  @test
  async 'should let anyone create a room'() {
    const db = authedApp({ uid: 'alice' });
    const room = db.collection('rooms').doc('firebase');
    await firebase.assertSucceeds(
      room.set({
        owner: 'alice',
        topic: 'All Things Firebase'
      })
    );
  }

  @test
  async 'should force people to name themselves as room owner when creating a room'() {
    const db = authedApp({ uid: 'alice' });
    const room = db.collection('rooms').doc('firebase');
    await firebase.assertFails(
      room.set({
        owner: 'scott',
        topic: 'Firebase Rocks!'
      })
    );
  }

  @test
  async 'should not let one user steal a room from another user'() {
    const alice = authedApp({ uid: 'alice' });
    const bob = authedApp({ uid: 'bob' });

    await firebase.assertSucceeds(
      bob
        .collection('rooms')
        .doc('snow')
        .set({
          owner: 'bob',
          topic: 'All Things Snowboarding'
        })
    );

    await firebase.assertFails(
      alice
        .collection('rooms')
        .doc('snow')
        .set({
          owner: 'alice',
          topic: 'skiing > snowboarding'
        })
    );
  }
}
