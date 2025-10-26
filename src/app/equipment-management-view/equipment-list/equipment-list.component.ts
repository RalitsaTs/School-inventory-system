import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { 
  IGX_GRID_DIRECTIVES, 
  IGX_INPUT_GROUP_DIRECTIVES,
  IgxButtonDirective,
  IgxRippleDirective,
  IgxIconComponent 
} from 'igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { EquipmentService } from '../../services/equipment.service';
import { Equipment } from '../../models/api/equipment.model';

@Component({
  selector: 'app-equipment-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IGX_GRID_DIRECTIVES,
    IGX_INPUT_GROUP_DIRECTIVES,
    IgxButtonDirective,
    IgxRippleDirective,
    IgxIconComponent
  ],
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public equipment: Equipment[] = [];
  public searchText = '';

  constructor(
    private equipmentService: EquipmentService
  ) {}

  ngOnInit() {
    this.loadEquipment();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadEquipment() {
    this.equipmentService.getAllEquipment().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.equipment = data;
      },
      error: (error) => {
        console.error('Error loading equipment:', error);
      }
    });
  }

  onSearchChange() {
    if (this.searchText.trim()) {
      this.equipmentService.searchEquipment({ qtext: this.searchText.trim() }).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data) => {
          this.equipment = data;
        }
      });
    } else {
      this.loadEquipment();
    }
  }
}