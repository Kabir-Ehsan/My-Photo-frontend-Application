import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { album } from '../album';

@Component({
  selector: 'app-my-albums',
  templateUrl: './my-albums.component.html',
  styleUrls: ['./my-albums.component.css']
})
export class MyAlbumsComponent implements OnInit {

  albums: album[];
  
  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    console.log("Calling Album Service from my album component")
    this.albumService.getAlbumsForUser().subscribe(
      response => {
        this.albums = <album[]>response;
        console.log("Got all albums for the user", this.albums)
      }
    )

  }

}
