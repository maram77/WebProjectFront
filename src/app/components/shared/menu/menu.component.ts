import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  constructor(private router : Router,    private cdr: ChangeDetectorRef  ) { }
  user: any = {}; 
  
  ngOnInit() : void {
    this.user.firstname = LocalStorageService.getUser().firstname;
    this.user.lastname = LocalStorageService.getUser().lastname;
    this.user.role = LocalStorageService.getUser().role;
  }
  openMegaMenu(){
    let pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function (el) {
        if(el.children.length > 0){
          if(el.children[0].classList.contains('mega-menu')){
            el.classList.add('mega-menu-pane');
          }
        }
    });
  }

  isUserLoggedIn(): boolean {
    return LocalStorageService.isUserLoggedIn();
  }

  isAdminLoggedIn(): boolean {
    return LocalStorageService.isAdminLoggedIn();
  }

  signOut() {
     LocalStorageService.signOut();
     this.router.navigateByUrl('/pages/my-account'); 

  }
  
}
