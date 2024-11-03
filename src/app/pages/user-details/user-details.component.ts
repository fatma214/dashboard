import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../../services/user-details/user-details.service';
import { User } from '../../interfaces/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from "../../components/loader/loader.component";
 

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent  implements OnInit {
  constructor(private route: ActivatedRoute ,private router:Router,private _getUserDetailsService: UserDetailsService) {}
  isLoading = false;
  user?: User;

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');  
    if (userId) {
      this.getUserDetails(Number(userId));  
    }
  }
  getUserDetails(id: number) {
    this.isLoading = true;  
    this._getUserDetailsService.getUserDetails(id).subscribe({
      next: (res) => {
          this.user=res;
      },
      error: (err) => {
        console.log('error', err);
      },
      complete: () => {
        console.log('get user details request complete');
        this.isLoading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/users']); // Navigate back to the Users page
  }
}
