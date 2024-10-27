import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ViewCategoryComponent } from './view-category/view-category.component';

export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'view-category', component: ViewCategoryComponent}

];
