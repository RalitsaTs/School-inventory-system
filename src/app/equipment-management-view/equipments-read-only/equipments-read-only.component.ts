import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IGX_CARD_DIRECTIVES, 
  IGX_GRID_DIRECTIVES, 
  IgxAvatarComponent, 
  IgxButtonDirective, 
  IgxIconComponent, 
  IgxRippleDirective,
  IGX_INPUT_GROUP_DIRECTIVES 
} from 'igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { EquipmentService } from '../../services/equipment.service';
import { Equipment } from '../../models/api/equipment.model';

@Component({
  selector: 'app-equipments-read-only',
  imports: [
    CommonModule,
    FormsModule,
    IGX_CARD_DIRECTIVES, 
    IGX_GRID_DIRECTIVES, 
    IgxAvatarComponent, 
    IgxIconComponent, 
    IgxButtonDirective, 
    IgxRippleDirective, 
    RouterLink,
    IGX_INPUT_GROUP_DIRECTIVES
  ],
  templateUrl: './equipments-read-only.component.html',
  styleUrls: ['./equipments-read-only.component.scss']
})
export class EquipmentsReadOnlyComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public equipmentList: Equipment[] = [];
  public filteredEquipment: Equipment[] = [];
  public searchText = '';

  constructor(
    private equipmentService: EquipmentService,
  ) {}

  ngOnInit() {
    this.loadEquipment();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadEquipment() {
    this.equipmentService.getAllEquipment()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.equipmentList = data;
          this.filteredEquipment = data;
        },
        error: (error) => {
          console.error('Error loading equipment:', error);
        }
      });
  }

  public onSearchChange() {
    if (this.searchText.trim()) {
      this.equipmentService.searchEquipment({ qtext: this.searchText.trim() })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            this.filteredEquipment = data;
          },
          error: (error) => {
            console.error('Error searching equipment:', error);
          }
        });
    } else {
      this.filteredEquipment = this.equipmentList;
    }
  }

  public getStatusColor(status: string): string {
    switch (status) {
      case 'Available': return 'green';
      case 'CheckedOut': return 'orange';
      case 'UnderRepair': return 'red';
      case 'Retired': return 'gray';
      case 'Unavailable': return 'red';
      default: return 'gray';
    }
  }

  public getConditionColor(condition: string): string {
    switch (condition) {
      case 'Excellent': return 'green';
      case 'Good': return 'lightgreen';
      case 'Fair': return 'orange';
      case 'Damaged': return 'red';
      default: return 'gray';
    }
  }

  public getAvailableCount(): number {
    return this.equipmentList.filter(eq => eq.status === 'Available').length;
  }
}
