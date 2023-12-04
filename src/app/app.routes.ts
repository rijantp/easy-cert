import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'plot' },
  {
    path: 'plot',
    loadChildren: () => import('./plot/plot.routes').then((m) => m.plotRoutes),
  },
];
