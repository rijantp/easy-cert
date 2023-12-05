import { Routes } from '@angular/router'
import { PlotComponent } from './plot.component'

export const plotRoutes: Routes = [
  { path: '', pathMatch: 'full', component: PlotComponent },
  {
    path: 'add',
    loadComponent: () =>
      import('./add-plot/add-plot.component').then((m) => m.AddPlotComponent),
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('./edit-plot/edit-plot.component').then(
        (m) => m.EditPlotComponent
      ),
  },
]
