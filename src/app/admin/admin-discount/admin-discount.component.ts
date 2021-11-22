import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ToastrService } from 'ngx-toastr';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {
  @ViewChild('close') close!: ElementRef;

  public adminDiscounts: Array<IDiscountResponse> = [];
  public currentDiscount!: IDiscountResponse;
  public currentDiscountID!: number;
  public editStatus = false;
  public discountForm!: FormGroup;
  public isUploaded = false;

  constructor(
    private discountService: DiscountService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.initDiscountForm();
    this.loadDiscounts();
  }

  initDiscountForm(): void {
    this.discountForm = this.fb.group({
      discountName: [null, Validators.required],
      imagePath: [null, Validators.required],
      valueDiscount: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      validityPeriod: [null, Validators.required]
    })
  }

  loadDiscounts(): void {
    this.discountService.getAll().subscribe(data => {
      this.adminDiscounts = data;
    }, err => {
      console.log('load discount error', err);
    })
  }

  saveDiscount(): void {
    if (this.editStatus) {
      this.discountService.update(this.discountForm.value, this.currentDiscountID).subscribe(() => {
        this.loadDiscounts();
        this.editStatus = false;
        this.initDiscountForm();
        this.close.nativeElement.click();
        this.isUploaded = false;
      }, err => {
        console.log('update discount error', err);
      });
    } else {
      this.discountService.create(this.discountForm.value).subscribe(() => {
        this.close.nativeElement.click();
        this.loadDiscounts();
        this.initDiscountForm();
        this.isUploaded = false;
      }, err => {
        console.log('create discount error', err);
      });
    }
  }

  deleteDiscount(discount: IDiscountResponse): void {
    if(confirm('Ви дійсно хочете видалити акцію?')){
      this.discountService.delete(discount.id).subscribe(() => {
        this.loadDiscounts();
        this.deleteImage(discount.imagePath);
        this.toastr.success('Discount successfully deleted!');
      }, err => {
        console.log('delete discount error', err);
        this.toastr.error(err.message);
      });
    }
    
  }

  editDiscount(discount: IDiscountResponse): void {
    this.discountForm.patchValue({
      discountName: discount.discountName,
      imagePath: discount.imagePath,
      valueDiscount: discount.valueDiscount,
      description: discount.description,
      price: discount.price,
      validityPeriod: discount.validityPeriod 
    });
    this.currentDiscountID = discount.id;
    this.editStatus = true;
    this.isUploaded = true;
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        console.log(data);
        this.discountForm.patchValue({
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
    if(confirm('Ви дійсно хочете видалити зображення ?')){
      imagePath = imagePath ? imagePath : this.valueByControl('imagePath')
      this.isUploaded = false;
      const task = ref(this.storage, imagePath);
      deleteObject(task).then(() => {
        console.log('File delete successfully');
        this.discountForm.patchValue({
          imagePath: null
        })
      })
    }
  }

  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value;
  }

}
