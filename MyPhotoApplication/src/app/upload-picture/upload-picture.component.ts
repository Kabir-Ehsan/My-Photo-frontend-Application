import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../file.service';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.css']
})
export class UploadPictureComponent implements OnInit {

  createdBy: string;
  albumId: string;
  constructor(private route: ActivatedRoute, private fileService: FileService, private photoService: PhotoService) { }
  
  

  ngOnInit(): void {
    this.route.paramMap.subscribe(nothing=>{
      this.albumId = nothing.get('albumId');
      console.log('Got Album Id from photo:', this.albumId);
    })
  }

  uploadPhoto(file: File){
    console.log("File:", file);

    this.fileService.uploadFile(file).subscribe(
      fileResponse=>{
        console.log("File Response Data From Service: ", fileResponse)
        var fileId = fileResponse["fileId"];
        //console.log("File Data From Service: ", fileResponse["fileId"])
        this.savePhoto(fileId);
        console.log("File Data From Service: ", fileResponse["fileId"])
      }
    )
  }

  savePhoto(fileId: string){
    this.photoService.savePhoto(this.albumId, fileId);
  }

}
