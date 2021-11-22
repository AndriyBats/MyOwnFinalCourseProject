import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ToastrService } from 'ngx-toastr';
import { IAnalyzesResponse } from 'src/app/shared/interfaces/analyzes-and-cost/analyzes-and-cost.interface';
import { IPackageResponse } from 'src/app/shared/interfaces/research-package/products.inteface';
import { AnalyzesAndCostService } from 'src/app/shared/services/analyzes-and-cost/analyzes-and-cost.service';
import { ResearchPackagesService } from 'src/app/shared/services/research-packages/research-packages.service';

@Component({
  selector: 'app-admin-research-packages',
  templateUrl: './admin-research-packages.component.html',
  styleUrls: ['./admin-research-packages.component.scss']
})
export class AdminResearchPackagesComponent implements OnInit {
  public dynamicForm!: FormGroup;
  submitted = false;

  @ViewChild('close') close!: ElementRef;
  public adminPackage: Array<IPackageResponse> = [];
  public currentPackage!: IPackageResponse;
  public adminAnalyzes: Array<IAnalyzesResponse> = [];
  public currentPackageID!: number;
  public editStatus = false;
  public isUploaded = false;


  constructor(
    private analyzesAndCostService: AnalyzesAndCostService,
    private formBuilder: FormBuilder,
    private researchPackageService: ResearchPackagesService,
    private toastr: ToastrService,
    public storage: Storage
  ) { }

  ngOnInit() {
    this.initDynamicForm();
    this.loadPackage();
    this.loadAnalyz();
  }

  initDynamicForm(): void {
    this.dynamicForm = this.formBuilder.group({
      researchPackageName: [null, Validators.required],
      imagePath: [null, Validators.required],
      mainIndicators: [null, Validators.required],
      numberOfTickets: ['', Validators.required],
      tickets: new FormArray([]),
      price: [null, Validators.required]
    });

  }

  loadPackage(): void {
    this.researchPackageService.getAll().subscribe(data => {
      this.adminPackage = data;
    }, err => {
      console.log('load package error', err);
    })
  }

  loadAnalyz(): void {
    this.analyzesAndCostService.getAll().subscribe(data => {
      this.adminAnalyzes = data;
    }, err => {
      console.log('load analyz error', err);
    })
  }

  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.tickets as FormArray; }
  get ticketFormGroups() { return this.t.controls as FormGroup[]; }

  onChangeTickets(e: any) {
    let numberOfTickets!: number;
    if (e?.target) {
      numberOfTickets = e.target.value || 0;
    } else if (e) {
      numberOfTickets = e;
    } else {
      numberOfTickets = 0;
    }
    if (this.t.length < numberOfTickets) {
      for (let i = this.t.length; i < numberOfTickets; i++) {
        this.t.push(this.formBuilder.group({
          name: ['', Validators.required],
        }));
      }
    } else {
      for (let i = this.t.length; i >= numberOfTickets; i--) {
        this.t.removeAt(i);
      }
    }
  }

  savePackage(): void {
    this.submitted = true;
    if (this.dynamicForm.invalid) {
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value, null, 4));

    if (this.editStatus) {
      this.researchPackageService.update(this.dynamicForm.value, this.currentPackageID).subscribe(() => {
        this.loadPackage();
        this.editStatus = false;
        this.initDynamicForm();
        this.close.nativeElement.click();
        this.isUploaded = false;
      }, err => {
        console.log('update packageResearc error', err);
      });
    } else {
      this.researchPackageService.create(this.dynamicForm.value).subscribe(() => {
        this.close.nativeElement.click();
        this.loadPackage();
        this.initDynamicForm();
        this.isUploaded = false;
      }, err => {
        console.log('create packageResearc error', err);
      });
    }
  }

  deletePackage(packageResearch: IPackageResponse): void {
    if (confirm('Ви дійсно хочете видалити пакет досліджень?')) {
      this.researchPackageService.delete(packageResearch.id).subscribe(() => {
        this.loadPackage();
        this.deleteImage(packageResearch.imagePath);
        this.toastr.success('PackageResearch successfully deleted!');
      }, err => {
        console.log('delete packageResearch error', err);
        this.toastr.error(err.message);
      });
    }
  }

  editPackage(packageResearch: IPackageResponse): void {
    this.onChangeTickets(packageResearch.tickets?.length)
    this.dynamicForm.patchValue({
      researchPackageName: packageResearch.researchPackageName,
      imagePath: packageResearch.imagePath,
      mainIndicators: packageResearch.mainIndicators,
      price: packageResearch.price,
      numberOfTickets: packageResearch.numberOfTickets,
    });
    this.currentPackageID = packageResearch.id;
    this.editStatus = true;
    this.isUploaded = true;
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        console.log(data);
        this.dynamicForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const ext = file!.name.split('.').pop();
    const path = `${folder}/${name}.${ext}`; {
      if (file) {
        try {
          const storageRef = ref(this.storage, path);
          const task = uploadBytes(storageRef, file);
          await task;
          const url = await getDownloadURL(storageRef);
          return url
        } catch (e: any) {
          return e.message
        }
      } else {
        return '';
      }
    }
  }

  deleteImage(imagePath?: string): void {
    imagePath = imagePath ? imagePath : this.valueByControl('imagePath')
    this.isUploaded = false;
    const task = ref(this.storage, imagePath);
    deleteObject(task).then(() => {
      console.log('File delete successfully');
      this.dynamicForm.patchValue({
        imagePath: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.dynamicForm.get(control)?.value;
  }

  changeCategory(): void { }

}
