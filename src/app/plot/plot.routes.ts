import { Routes } from '@angular/router'
import { PlotComponent } from './plot.component'

export const plotRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add' },
  {
    path: 'add',
    loadComponent: () =>
      import('./plot.component').then((m) => m.PlotComponent),
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('./components/edit-plot/edit-plot.component').then(
        (m) => m.EditPlotComponent
      ),
  },
]
