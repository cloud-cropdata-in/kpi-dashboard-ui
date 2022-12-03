import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/views/services/authentication.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {  
  title : any;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private titleService: Title, private authentocationService: AuthenticationService,) {
  }  

  ngOnInit() {
    const rt = this.getChild(this.activatedRoute);
    rt.data.subscribe(data => {
      // console.log(data);
      this.titleService.setTitle(data.title);
      this.title = data.title;
    });

    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      const rt = this.getChild(this.activatedRoute);
      rt.data.subscribe(data => {
        // console.log(data);
        this.titleService.setTitle(data.title);
        this.title = data.title;
      });
    });

    this.breadcrumbService.set('@Parent', 'Parent'); 
  }

  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
  checkRouteUrl() {
    return this.router.url == '/platform/parent';
  }

  checkLogOut(){
    this.authentocationService.logOut();
    this.router.navigate(['login']);
  }
}