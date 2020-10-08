import { Component } from '@angular/core';
import { BackendApiService } from './services/backend-api.service';
declare var liff: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'concreteCus'; 
  messages = ''
  userProfile: any;
  constructor(
    public api : BackendApiService,
   ) {
    this.initLineLiff();
  }
  
  async ngOnInit() {
    await this.initLineLiff();
  }

  async initLineLiff() {
    try {
      const data: any = await this.api.initLineLiff();
      this.userProfile = await liff.getProfile();
      alert(`Hi ${this.userProfile.displayName}!`);
    } catch (err) {
      // alert(err)
    }
  }
  async sendMessages() {
    try {
      const successMsgs = await liff.sendMessages([
        {
          type: 'text',
          text: this.messages
        }
      ])
      liff.closeWindow()


    } catch (e) {
      alert(e)
    }

  }
}
