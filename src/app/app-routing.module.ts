import {NgModule} from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PostPageComponent} from './post-page/post-page.component';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent},
      {path: 'post/:id', component: PostPageComponent}
    ]
  },
  // старая версия записи
  //  { path: 'admin', loadChildren: './admin/admin.module#AdminModule'}
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule)},
  { path: 'test', loadChildren: () => import('./test/test.module').then( m => m.TestModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

