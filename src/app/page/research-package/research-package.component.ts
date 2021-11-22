import { Component, OnInit } from '@angular/core';
import { IPackageResponse } from 'src/app/shared/interfaces/research-package/products.inteface';
import { ResearchPackagesService } from 'src/app/shared/services/research-packages/research-packages.service';

@Component({
  selector: 'app-research-package',
  templateUrl: './research-package.component.html',
  styleUrls: ['./research-package.component.scss']
})
export class ResearchPackageComponent implements OnInit {
  public pagePackages: Array<IPackageResponse> = [];

  constructor(private researchPackageService: ResearchPackagesService) { }

  ngOnInit(): void {
    this.loadPackages()
  }

  loadPackages(): void {
    this.researchPackageService.getAll().subscribe(data => {
      this.pagePackages = data;
    }, err => {
      console.log('load discount error', err);
    })
  }

}
