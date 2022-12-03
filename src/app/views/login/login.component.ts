import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
declare var $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFrom: FormGroup;
  invalidLogin = false;
  data: Observable<any>;
  message: any;
  responseData: any;
  constructor(public formBuilder: FormBuilder, private router: Router, private loginservice: AuthenticationService, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.loginFrom = this.formBuilder.group({
      userName: ['', Validators.required],
      userPassword: ['', Validators.required],
    });

    this.checkTokenInSession()
  }

  checkTokenInSession(){
    const token = sessionStorage.getItem('token');
    if(token != null || token != undefined){
      this.router.navigate(['/customer/farmers']);
    } else{
      this.router.navigate(['/login']);
      return
    }
  }

  get f(){
   return this.loginFrom.controls;
  }
  submitForm() {
    for (const controller in this.loginFrom.controls) {
      this.loginFrom.get(controller).markAsTouched();
    }
    if (this.loginFrom.invalid) {
      return;
    }
    // else {
    //   this.router.navigate(['/customer/seller']);
    // }
    // console.log(this.loginFrom.controls);



   this.loginUser(this.f.userName.value,this.f.userPassword.value);

  }


  loginUser(username,password){
    // this.loginservice.authenticate(username,password).pipe(map(data => {
    //   if(data.token){
    //     this.responseData = data;
    //   }else{
    //     this.message = data;
    //   }
    // }))

    console.log('passvalue')
    this.loginservice.authenticate(username,password).subscribe(
      (data) => {
        console.log('response in login component == ', data);
        this.checkTokenInSession()
      }
  );
  }


  load() {
    // alert('before load')
    this.data = this.http.get('https://jsonplaceholder.typicode.com/posts/1');
    //alert('after load')
  }
  showPassword(){
      var passInput = $('#password');
      if (passInput.attr('type') === 'password'){
          passInput.attr('type','text');
        // $('#passwordShowBtn').addClass('active')
        $('.fa-eye-slash').show()
        $('.fa-eye').hide()
      } else {
        passInput.attr('type','password');
        // $('#passwordShowBtn').removeClass('active')
        $('.fa-eye-slash').hide()
        $('.fa-eye').show()
      }
  }



}

