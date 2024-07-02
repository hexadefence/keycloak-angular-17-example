import { Routes } from '@angular/router';
import { PrivateComponent } from './private/private.component';
import { PublicComponent } from './public/public.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'private', component: PrivateComponent, canActivate: [AuthGuard] },
    { path: 'public', component: PublicComponent }
];
