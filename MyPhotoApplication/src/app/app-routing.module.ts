import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { MyAlbumsComponent } from './my-albums/my-albums.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { UploadPictureComponent } from './upload-picture/upload-picture.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { RecentAlbumComponent } from './recent-album/recent-album.component';
import { LogoutComponent } from './logout/logout.component';
import { UserService } from './user.service';





const routes: Routes = [

  {path: 'albums/recent', component: RecentAlbumComponent, canActivate: [UserService]},
  {path: 'profile/:profileId', component: ProfileComponent, canActivate: [UserService]},
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'albums/me', component: MyAlbumsComponent, canActivate: [UserService]},
  {path: 'create', component: CreateAlbumComponent, canActivate: [UserService]},
  {path: 'album/:albumId', component: AlbumDetailsComponent, canActivate: [UserService]},
  {path: 'upload/:albumId', component: UploadPictureComponent, canActivate: [UserService]},
  //{path: 'photo/me', component: PhotoDetailsComponent, canActivate: [UserService]},
  {path: 'photo/:photoId', component: PhotoDetailsComponent, canActivate: [UserService]},
  {path: 'logout', component: LogoutComponent, canActivate: [UserService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
