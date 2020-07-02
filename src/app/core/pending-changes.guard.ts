import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}


@Injectable()
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {
  /**
   * Returns a warning if a user attempts to navigate away and canDeactivate() is false
   * Note that the warning message specified will only show when navigating within the angular app.
   * When navigating outside the app, the browser will show a generic confirm dialogue.
   * @param component - the component that will get deactivated
   */
  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
    return component.canDeactivate() ?
      true :
      confirm('WARNING: Your message has not been sent yet. Press Cancel to go back to complete and send your message, or OK to discard your message.');
  }
}
