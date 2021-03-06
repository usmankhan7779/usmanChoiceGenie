import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from "../Config";
import { ActivatedRoute, Router } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { ResponseContentType } from '@angular/http/src/enums';
import { FormBuilder, Validators, NgControl, RadioControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
 import swal from 'sweetalert2'; 
import { MatSelect } from '@angular/material'; 
import { ProfileService } from './profile.service';
import * as JWT from 'jwt-decode';
import * as moment from 'moment';

@Component({
  selector: 'app-com-profile',
  templateUrl: './com-profile.component.html',
  styleUrls: ['./com-profile.component.scss']
})
export class ComProfileComponent implements OnInit { 
  // public phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
public username;
data:any=[];
public title;
private authentication


  constructor(private serve:ProfileService,private https:Http,public router: Router, private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private sg: SimpleGlobal) { 
    //  this.authentication=JSON.parse(localStorage.getItem('currentUser'));
    //   console.log("token",this.authentication)

  }
  public phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  ngOnInit() { this.username = localStorage.getItem('username');
  // title
  this.title = localStorage.getItem('title');
  // this.gettoken = JSON.parse(localStorage.getItem('currentUser'));
  this.profile();
  console.log(this.username)
  this. fetchProducts();
  }
  fetchProducts() {
       
    let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'JWT ' +  this.authentication.token);
    headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
    console.log('pro', localStorage.getItem('token'));
    
    this.https.get(Config.api +'check_role/'+ this.username +'/' ,{ headers: headers })
    .subscribe(Res => {
    this.sg['products'] = Res.json()['Results'];
    
    });
    
    } 
  profile() {
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'JWT ' +  this.authentication);
    headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
    console.log('pofile', localStorage.getItem('token'));

    this.https.get(Config.api + 'comprofile/' + this.title.trim() + '/', { headers: headers })
    
    .subscribe(Res => {
    this.data=Res.json();
    console.log(this.data);
    });
    
    }
    omit_special_char(event)
{   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
}
    onRegister(updatedid,updatedREP,updatedREPid,updatedName,updatedphone,updatedmarket,updatedstatus,updateduser,updatedemail) {
      console.log('edit' +updatedid,updatedREP,updatedREPid,updatedName,updatedphone,updatedmarket,updatedstatus,updateduser,updatedemail);
      this.serve.updata( updatedid,updatedREP,updatedREPid,updatedName,updatedphone,updatedmarket,updatedstatus,updateduser,updatedemail).subscribe(data => {
          console.log(data);
          swal({
              type: 'success',
              title: 'Successfully updated',
              showConfirmButton: false,
              timer: 1500
            })
            this.profile();

      }, error => {
      });
  }

}
