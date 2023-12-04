import { Routes } from '@angular/router'

export const plotRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add' },
  {
    path: 'add',
    loadComponent: () =>
      import('./add-plot/add-plot.component').then(
        (m) => m.AddPlotComponent,
      ),
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('./edit-plot/edit-plot.component').then(
        (m) => m.EditPlotComponent,
      ),
  }
]
