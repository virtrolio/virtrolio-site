import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { CommonService } from '../../core/common.service';
import { SigningService } from '../../core/signing.service';
import { MsgIoService } from '../../core/msg-io.service';
import { Title } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ImageModalComponent } from './image-modal/image-modal.component';
import {
  AngularFireStorage,
  AngularFireStorageReference,
} from '@angular/fire/storage';

declare var $: any;

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.css'],
})

/**
 * Controls user interaction with the signing box, updating the preview display and sending the message when they
 * click on the 'Send' button.
 */
export class SigningComponent implements OnInit, OnDestroy {
  public name = 'your friend';
  public sending = false;
  public embedLink = '';
  public imageWidth = 50;
  public copyButtonText = 'Copy';

  private uid: string;
  private key: string;

  @ViewChild(ImageModalComponent) imageModalComponent: ImageModalComponent;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    public signingService: SigningService,
    private msgIo: MsgIoService,
    private router: Router,
    private title: Title,
    public deviceDetector: DeviceDetectorService,
    private storageService: AngularFireStorage
  ) {}

  /**
   * Extract query parameters, maximum message length, fonts, and recipient username from appropriate services
   */
  ngOnInit(): void {
    this.authService
      .redirectLoginUserCreation()
      .catch((error) => CommonService.displayError(error));
    this.route.queryParams.subscribe((params) => {
      this.uid = params.uid;
      this.key = params.key;
    });
    this.authService
      .displayName(this.uid)
      .then((userName) => {
        this.name = userName;
        this.title.setTitle('Signing ' + userName + "'s Virtrolio | Virtrolio");
      })
      .catch((error) => alert(error));
    this.signingService.resetDefaultValues();
    $('[data-toggle="popover"]').popover();
    $('.popover-dismiss').popover({
      trigger: 'focus',
    });
  }

  ngOnDestroy(): void {
    $('#submit-confirm').modal('hide');
    $('#info').modal('hide');
    $('#embed-help').modal('hide');
    $('#embed-photo').modal('hide');
    $('#signing-experience').modal('hide');
  }

  /**
   * Returns whether or not the user can navigate (safely) away
   * Returning true will navigate instantly
   * Returning false will prompt the user to confirm the navigation
   */
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !this.signingService.signingBoxText || this.sending;
  }

  /**
   * Resets image width slider value to 100 or 0 if the user tries to input a number that's too large
   */
  checkSliderValue() {
    if (this.imageWidth > 100) {
      this.imageWidth = 100;
    } else if (this.imageWidth < 0) {
      this.imageWidth = 0;
    }
  }

  /**
   * Checks if the user has uploaded any images to the image modal
   */
  checkImageList(numerical?: boolean) {
    if (this.imageModalComponent === undefined) {
      // Check if image modal component has not been rendered yet
      return numerical ? 0 : false;
    } else if (this.imageModalComponent.selectedImagesURLs.length === 0) {
      return numerical ? 0 : false;
    } else if (this.imageModalComponent.selectedImagesURLs.length > 0) {
      return numerical
        ? this.imageModalComponent.selectedImagesURLs.length
        : true;
    } else {
      CommonService.displayError(
        'There was an error while checking your uploaded images'
      );
    }
  }

  private uploadImages(images: File[]): string[] {
    if (images.length === 0) {
      return [];
    }
    this.storageService.ref('images').put(new File([], 'asdf'));
    return images.map((imageFile) => {
      const extension: string = imageFile.name.split('.').pop();
      const targetPath = `images/${uuidv4()}.${extension}`;
      const targetStorageRef: AngularFireStorageReference =
        this.storageService.ref(targetPath);
      console.log(targetPath);
      return '';
    });
  }

  /**
   * Creates a new blank message and fills in all the info before sending it
   * @param textbox - the textbox where the contents of the message are retrieved from (not the preview box)
   */
  sendMsg(textbox: HTMLTextAreaElement) {
    const newMsg = this.msgIo.createBlankMessage();
    newMsg.backColor = this.signingService.backgroundColor;
    newMsg.fontColor = this.signingService.textColor;
    newMsg.fontFamily = this.signingService.currentFont;
    newMsg.contents = textbox.value;
    newMsg.to = this.uid;
    try {
      newMsg.images = this.uploadImages(this.signingService.images);
    } catch (e) {
      CommonService.displayError(e);
      return;
    }

    // remove navigation popup
    this.sending = true;
    this.msgIo
      .sendMessage(newMsg, this.key)
      .then(() => {
        this.router
          .navigate(['/msg-sent'], { queryParams: { name: this.name } })
          .catch((e) => CommonService.displayError(e));
      })
      .catch((error) => {
        CommonService.displayError(error);
      });
  }

  /**
   * Selects an inputElement's field and copies its contents to the clipboard, updating the button to confirm the copy
   * @param inputElement - the element to read from
   */
  copyLink(inputElement: HTMLInputElement) {
    inputElement.select();
    inputElement.setSelectionRange(0, 10000);
    document.execCommand('copy');
    this.copyButtonText = 'Copied!';
  }
}
