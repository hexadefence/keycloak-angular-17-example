import { Routes } from '@angular/router';
import { PrivateComponent } from './private/private.component';
import { PublicComponent } from './public/public.component';

export const routes: Routes = [
    { path: 'private', component: PrivateComponent },
    { path: 'public', component: PublicComponent }
];
