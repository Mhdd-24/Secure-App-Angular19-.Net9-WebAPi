import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RoleCreateRequest } from '../../interfaces/role-create-request';

@Component({
  selector: 'app-role-form',
  imports: [MatFormFieldModule,MatButtonModule, MatInputModule, FormsModule ],
  standalone: true,
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.css'
})
export class RoleFormComponent {
@Input({required: true}) role!: RoleCreateRequest;
@Input() errorMessage!: string;  
@Output() addRole: EventEmitter<RoleCreateRequest> = new EventEmitter<RoleCreateRequest>();

add(){
  this.addRole.emit(this.role)
}
}
