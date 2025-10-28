import { Component } from '@angular/core';
import { TypewriterComponent } from '../../components/typewriter/typewriter.component';
import { RouterLink } from "@angular/router";
import { FormControl, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    TypewriterComponent,
    RouterLink,
    ReactiveFormsModule
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor() { }

  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      // Handle login logic here
      console.log('Email:', email);
      console.log('Password:', password);
    }
  }
}
