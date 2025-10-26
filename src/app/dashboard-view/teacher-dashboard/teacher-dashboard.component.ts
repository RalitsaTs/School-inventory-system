import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGX_CARD_DIRECTIVES, IGX_GRID_DIRECTIVES, IgxAvatarComponent, IgxIconComponent } from 'igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { TeacherInventoryType } from '../../models/teacher-inventory-list/teacher-inventory-type';
import { TeacherInventoryListService } from '../../services/teacher-inventory-list.service';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [IGX_CARD_DIRECTIVES, IGX_GRID_DIRECTIVES, IgxAvatarComponent, IgxIconComponent],
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit, OnDestroy {
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
