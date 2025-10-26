import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IGX_CARD_DIRECTIVES, IGX_GRID_DIRECTIVES, IgxAvatarComponent, IgxButtonDirective, IgxIconComponent, IgxRippleDirective } from '@infragistics/igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { TeacherInventoryType } from '../../models/teacher-inventory-list/teacher-inventory-type';
import { TeacherInventoryListService } from '../../services/teacher-inventory-list.service';

@Component({
  selector: 'app-equipments-read-only',
  imports: [IGX_CARD_DIRECTIVES, IGX_GRID_DIRECTIVES, IgxAvatarComponent, IgxIconComponent, IgxButtonDirective, IgxRippleDirective, RouterLink],
  templateUrl: './equipments-read-only.component.html',
  styleUrls: ['./equipments-read-only.component.scss']
})
export class EquipmentsReadOnlyComponent implements OnInit, OnDestroy {
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
