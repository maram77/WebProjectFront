import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service/user.service'; 
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  users: any[]; 
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'telephone','userRole', 'actions'];

  constructor(private userService: UserService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadUsers(); 
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data; 
        console.log('Fetched users:', this.users); 
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  editUser(user: any): void {
    console.log('Editing user:', user);
  }

  desactiverUser(user: any): void {
    if (confirm("Êtes-vous sûr de vouloir désactiver le compte de cet utilisateur?")) {
      this.userService.disableUserAccount(user.id).subscribe(
        (response) => {
          console.log(response); 
          const message = response['message']; 
          this.openSnackBar(message, 'success-snackbar'); 
          this.loadUsers();
        },
        error => {
          console.error("Erreur lors de la désactivation du compte utilisateur :", error);
          const errorMessage = error.error['error']; 
          this.openSnackBar(errorMessage, 'error-snackbar'); 
        }
      );
    }
  }

  deleteUser(user: any): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur?")) {
      this.userService.deleteUser(user.id).subscribe(
        (response) => {
          console.log(response); 
          const message = response['message']; 
          this.openSnackBar(message, 'success-snackbar'); 
          this.loadUsers();
        },
        error => {
          console.error("Erreur lors de la suppression de l'utilisateur :", error);
          const errorMessage = error.error['error']; 
          this.openSnackBar(errorMessage, 'error-snackbar'); 
        }
      );
    }
  }


  openSnackBar(message: string, customClass: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      verticalPosition: 'top', 
      panelClass: ['custom-snackbar', customClass] 
    });
  }
}
