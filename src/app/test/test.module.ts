import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { TestLayoutComponent } from './shared/components/test-layout/test-layout.component';
import { TestLoginPageComponent } from './test-login-page/test-login-page.component';
import { TestEditPageComponent } from './test-edit-page/test-edit-page.component';
import { TestDashboardPageComponent } from './test-dashboard-page/test-dashboard-page.component';
import { TestCreatePageComponent } from './test-create-page/test-create-page.component'

@NgModule({
  declarations: [TestLayoutComponent, TestLoginPageComponent, TestEditPageComponent, TestDashboardPageComponent, TestCreatePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: TestLayoutComponent, children: [
          {path: 'test-create', component: TestCreatePageComponent},
          {path: 'test-edit', component: TestEditPageComponent},
          {path: 'test-dashboard', component: TestDashboardPageComponent},
          {path: 'test-login', component: TestLoginPageComponent}
        ]}
    ])
  ],
  exports: [RouterModule]

})

export class TestModule {

}
