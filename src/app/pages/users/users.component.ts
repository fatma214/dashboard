import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../interfaces/user.interface';
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { UserDetailsService } from '../../services/user-details/user-details.service';
import { Router } from '@angular/router';
import { LoaderComponent } from "../../components/loader/loader.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [PaginationComponent, LoaderComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  isLoading = false;
  users:User[]=[];
  totalPages:number=0;
  page: number = 1;
  constructor(private router: Router, private _getUserService: UsersService,private _getUserDetailsService:UserDetailsService) {}

  ngOnInit(): void {
    this.getUsers(1); // or any default page number
  }


  getUsers(page:number) {
    this.isLoading = true; // Set loading state to true
    this._getUserService.getUsers(page).subscribe({
      next: (res) => {

        this.users=res.users;
        this.totalPages=res.totalPages;
        console.log(this.users);
        console.log(this.totalPages);

      },
      error: (err) => {
        console.log('error', err);
      },
      complete: () => {
        console.log('get users request complete');
        this.isLoading = false;  
      },
    });

  }




 onPageChanged(pageNumber: number): void {
  if (pageNumber !== this.page) {
    this.page = pageNumber;
    this.getUsers(this.page);  
  }
}


navigateToUserDetails(id: number): void {
  this.router.navigate(['/users', id]);
}
}
