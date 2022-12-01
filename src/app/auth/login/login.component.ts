import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls : [ './login.component.css']
})
export class LoginComponent implements AfterViewInit {


  @ViewChild('googleBtn') googleBtn : ElementRef ;

  public loginForm = this.fb.group({
    email : [localStorage.getItem('email') || '',[ Validators.required, Validators.email]],
    password : ['', Validators.required],
    remenber : [true]   
  });

  constructor(private router:Router,
               private fb : FormBuilder,
               private usuarioService : UsuarioService,
               private ngZone : NgZone) { }

  ngAfterViewInit(): void {
    this.googleInicio()
  };

  async googleInicio(){
    await this.usuarioService.googleInit();
      //document.getElementById("buttonDiv"),
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  };

  


  login(){

    this.usuarioService.loginUsuario(this.loginForm.value)
          .subscribe(resp => {
            if (this.loginForm.get('remenber').value){
                localStorage.setItem('email',this.loginForm.get('email').value);
                
            }else{
              localStorage.removeItem('email')
            };
            this.router.navigateByUrl('/')
          }, (err) => {
              // si sucede un error
              Swal.fire('Error',err.error.msg,'error')
          })
    
    //console.log(this.loginForm.value)


   //this.router.navigateByUrl('/')
  }

}
