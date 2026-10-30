import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// Composants
import { AccueilComponent } from './components/accueil/accueil';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { EmployeListComponent } from './components/employe-list/employe-list';
import { EmployeAddComponent } from './components/employe-add/employe-add';
import { ContratListComponent } from './components/contrat-list/contrat-list';
import { ContratAddComponent } from './components/contrat-add/contrat-add';
import { CongeListComponent } from './components/conge-list/conge-list';
import { CongeAddComponent } from './components/conge-add/conge-add';
import { PaieListComponent } from './components/paie-list/paie-list';
import { PaieAddComponent } from './components/paie-add/paie-add';
import { PresenceListComponent } from './components/presence-list/presence-list';
import { PresenceAddComponent } from './components/presence-add/presence-add';

export const routes: Routes = [
  // Pages publiques (accessibles sans connexion)
  { path: '', component: AccueilComponent },
  { path: 'login', component: LoginComponent },

  // Pages protégées (nécessitent une connexion)
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  { path: 'employes', component: EmployeListComponent, canActivate: [AuthGuard] },
  { path: 'employes/add', component: EmployeAddComponent, canActivate: [AuthGuard] },
  { path: 'employes/edit/:id', component: EmployeAddComponent, canActivate: [AuthGuard] },

  { path: 'contrats', component: ContratListComponent, canActivate: [AuthGuard] },
  { path: 'contrats/add', component: ContratAddComponent, canActivate: [AuthGuard] },
  { path: 'contrats/edit/:id', component: ContratAddComponent, canActivate: [AuthGuard] },

  { path: 'conges', component: CongeListComponent, canActivate: [AuthGuard] },
  { path: 'conges/add', component: CongeAddComponent, canActivate: [AuthGuard] },
  { path: 'conges/edit/:id', component: CongeAddComponent, canActivate: [AuthGuard] },

  { path: 'paies', component: PaieListComponent, canActivate: [AuthGuard] },
  { path: 'paies/add', component: PaieAddComponent, canActivate: [AuthGuard] },
  { path: 'paies/edit/:id', component: PaieAddComponent, canActivate: [AuthGuard] },

  { path: 'presences', component: PresenceListComponent, canActivate: [AuthGuard] },
  { path: 'presences/add', component: PresenceAddComponent, canActivate: [AuthGuard] },
  { path: 'presences/edit/:id', component: PresenceAddComponent, canActivate: [AuthGuard] },

  // Redirection
  { path: '**', redirectTo: '' }
];