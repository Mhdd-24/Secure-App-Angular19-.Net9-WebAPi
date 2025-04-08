import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forget-password',
  imports: [FormsModule, MatIconModule, MatSnackBarModule],
  standalone: true,
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  email!: string;
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  showEmailSent = false;
  isSubmitting = false;

  forgotPassword() {
    this.isSubmitting = true;
    this.authService.forgotPassword(this.email).subscribe({
      next:(response)=>{
        if(response.isSuccess){
          this.matSnackBar.open(response.message, "Close",{
            duration: 5000
          })
          this.showEmailSent = true;
        } else {
          this.matSnackBar.open(response.message, "Close",{
            duration: 5000
          });
        }
      },
      error:(error: HttpErrorResponse) => {
        this.matSnackBar.open(error.error, 'Close', {
          duration: 5000,
        });
      },
      complete: () => {
        this.isSubmitting = false;
      },
    })
  }
}
