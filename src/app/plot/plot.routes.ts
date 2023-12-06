import { Routes } from '@angular/router'

export const plotRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add' },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-plot/add-plot.component').then(
        (m) => m.AddPlotComponent
      ),
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('./components/edit-plot/edit-plot.component').then(
        (m) => m.EditPlotComponent
      ),
  },
]
