import { Component } from '@angular/core';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {

  selectedFile: File;
  uploadProgress: number;

  constructor(private fileUploadService: FileService) { }

  getFile(event:any) {
    this.selectedFile = event.target.files[0];
    console.log("file", this.selectedFile);
  }

  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile)
        .subscribe(progress => {
          this.uploadProgress = progress;
          if (progress === 100) {
            alert("File upload completed")
            this.selectedFile = null;
          }
        });
    }
  }

  checkIfFileSelected(): void {
    if (!this.selectedFile) {
      alert('Please select a file first.');
    } else {
      this.uploadFile();
    }
  }
}
