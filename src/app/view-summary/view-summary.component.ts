import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'view-summary',
  templateUrl: './view-summary.component.html',
  styleUrl: './view-summary.component.css'
})
export class ViewSummaryComponent {
  public totalSucesscount: number = 0;
  public errorcount: number = 0;
  public totalDataCount: number = 0;
  constructor(private router: ActivatedRoute) {
    
  }
  ngOnInit() {
    this.router.queryParams.subscribe((params: any) => {
      this.totalSucesscount = +params['p1'];
      this.errorcount = +params['p2'];
      this.totalDataCount = +params['p3'];
    });
  }
  
}
