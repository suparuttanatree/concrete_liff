import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
declare var liff: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  messages = ''
  username=''
  tel=''
  email=''
  token :any
  userProfile={
    displayName:'',
    pictureUrl:'https://godemma.com/image/man.png',
    userId:''
  }
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
      await this.api.getIDToken().then((res)=>{
        this.token = res
      })
      
      await alert(this.token);
      this.username = await this.userProfile.displayName;
    } catch (err) {
      alert(err)
    }
    ///new
  }
  submit(){
    console.log(this.username);
    
    this.api.postData('register',{name:this.username,phone:this.tel,email:this.token,token:this.userProfile.userId}).then((res)=>{
      console.log(res);
      if (res) {
        liff.closeWindow()
        liff.sendMessages([
          {
            type: 'text',
            text: this.token
          }
        ])
          .then(() => {
            console.log('message sent');
          })
          .catch((err) => {
            console.log('error', err);
          });
      }
    })
  }
  goNow(){
    this.api.replyMessage(this.tel)
  }

}
