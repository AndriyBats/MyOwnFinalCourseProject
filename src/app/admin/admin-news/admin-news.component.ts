import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ToastrService } from 'ngx-toastr';
import { INewsResponse } from 'src/app/shared/interfaces/news/news.interface';
import { NewsService } from 'src/app/shared/services/news/news.service';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss']
})
export class AdminNewsComponent implements OnInit {
  @ViewChild('close') close!: ElementRef;

  public adminNews: Array<INewsResponse> = [];
  public currentNews!: INewsResponse;
  public currentNewsID!: number;
  public editStatus = false;
  public newsForm!: FormGroup;
  public isUploaded = false;

  constructor(
    private newsService: NewsService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.initNewsForm();
    this.loadNews();
  }

  initNewsForm(): void {
    this.newsForm = this.fb.group({
      newsName: [null, Validators.required],
      imagePath: [null, Validators.required],
      description: [null, Validators.required],
    })
  }

  loadNews(): void {
    this.newsService.getAll().subscribe(data => {
      this.adminNews = data;
    }, err => {
      console.log('load news error', err);
    })
  }

  saveNews(): void {
    if (this.editStatus) {
      this.newsService.update(this.newsForm.value, this.currentNewsID).subscribe(() => {
        this.loadNews();
        this.editStatus = false;
        this.initNewsForm();
        this.close.nativeElement.click();
        this.isUploaded = false;
      }, err => {
        console.log('update news error', err);
      });
    } else {
      this.newsService.create(this.newsForm.value).subscribe(() => {
        this.close.nativeElement.click();
        this.loadNews();
        this.initNewsForm();
        this.isUploaded = false;
      }, err => {
        console.log('create news error', err);
      });
    }
  }

  deleteNews(news: INewsResponse): void {
    if(confirm('Ви дійсно хочете видалити новину?')){
      this.newsService.delete(news.id).subscribe(() => {
        this.loadNews();
        this.deleteImage(news.imagePath);
        this.toastr.success('News successfully deleted!');
      }, err => {
        console.log('delete news error', err);
        this.toastr.error(err.message);
      });
    }  
  }

  editNews(news: INewsResponse): void {
    this.newsForm.patchValue({
      newsName: news.newsName,
      imagePath: news.imagePath,
      description: news.description,
    });
    this.currentNewsID = news.id;
    this.editStatus = true;
    this.isUploaded = true;
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.newsForm.patchValue({
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
    if(confirm('Ви дійсно хочете видалити зображення?')){
      imagePath = imagePath ? imagePath : this.valueByControl('imagePath')
      this.isUploaded = false;
      const task = ref(this.storage, imagePath);
      deleteObject(task).then(() => {
        console.log('File delete successfully');
        this.newsForm.patchValue({
          imagePath: null
        })
      })
    }
  }

  valueByControl(control: string): string {
    return this.newsForm.get(control)?.value;
  }
}
