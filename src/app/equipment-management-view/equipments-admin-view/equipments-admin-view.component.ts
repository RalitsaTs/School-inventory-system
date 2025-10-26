import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IGX_GRID_DIRECTIVES, IgxButtonDirective, IgxRippleDirective } from '@infragistics/igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { TeacherInventoryType } from '../../models/teacher-inventory-list/teacher-inventory-type';
import { TeacherInventoryListService } from '../../services/teacher-inventory-list.service';

@Component({
  selector: 'app-equipments-admin-view',
  imports: [IGX_GRID_DIRECTIVES, IgxButtonDirective, IgxRippleDirective, RouterLink],
  templateUrl: './equipments-admin-view.component.html',
  styleUrls: ['./equipments-admin-view.component.scss']
})
export class EquipmentsAdminViewComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public teacherInventoryListTeacherInventory: TeacherInventoryType[] = [];

  constructor(
    public teacherInventoryListService: TeacherInventoryListService,
  ) {}


  ngOnInit() {
    this.teacherInventoryListService.getTeacherInventory().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.teacherInventoryListTeacherInventory = data
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
