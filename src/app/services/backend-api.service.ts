import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var liff: any;
@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  public base_url = 'https://meijina.godemma.com/index.php/Customer/'
  constructor(
    public http: HttpClient,
  ) {

  }

  initLineLiff() {
    return new Promise((resolve, reject) => {
      liff.init(data => {
        resolve(liff.getProfile())
      }, err => {
        reject(err)
      })
    })
  }
  getIDToken() {
    return new Promise((resolve, reject) => {
      liff.init(data => {
        resolve(liff.getIDToken())
      }, err => {
        reject(err)
      })
    })
  }

  getLineProfile() {
    return new Promise((resolve, reject) => {
      liff.getProfile(data => {
        resolve(data)
      }, err => {
        reject(err)
      })
    })
  }
  sandMessage(text) {
    return new Promise((resolve, reject) => {
      liff.sendMessages([
        {
          type: 'text',
          text: text
        }
      ])
        .then(() => {
        })
        .catch((err) => {
        });
    })
  }
  replyMessage(objdata) {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      // let body = JSON.stringify({
      //   replyToken: reply_token,
      //   messages: [{
      //     type: 'text',
      //     text: msg
      //   }]
      // })
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      this.http.post('https://api.line.me/v2/bot/message/reply', JSON.stringify({ massage: objdata, }))
        .subscribe((res: any) => {
          resolve(res);
        }, (err) => {
          if (err.status == 0) {
            reject(err);
          }
        });
    });
  }
  getData(segment) {
    return new Promise((resolve, reject) => {
      this.http.get(this.base_url + segment)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          if (err.status == 0) {
            reject(err);
          }
          reject(err);
        });
    });
  }
  postData(segment, objdata) {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      this.http.post(this.base_url + segment, JSON.stringify(objdata))
        .subscribe((res: any) => {
          resolve(res);

        }, (err) => {
          if (err.status == 0) {
            reject(err);
          }
        });
    });
  }
}

