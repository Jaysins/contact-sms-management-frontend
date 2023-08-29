import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ContactsComponent} from "./components/contacts/contacts.component";
import {AuthGuard} from "./services/auth/auth.guard";
import {SenderIdComponent} from "./components/sender-id/sender-id.component";

const routes: Routes = [
  // Add more routes as needed
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
  { path: 'senderIds', component: SenderIdComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
