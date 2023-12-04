import { Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list'
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatIconModule, MatDividerModule, MatListModule, MatCardModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {}
