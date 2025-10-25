import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGX_CARD_DIRECTIVES, IGX_GRID_DIRECTIVES, IgxAvatarComponent, IgxButtonDirective, IgxIconComponent, IgxRippleDirective } from 'igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { EmployeesType } from '../../models/northwind/employees-type';
import { NorthwindService } from '../../services/northwind.service';

@Component({
  selector: 'app-equipment-requests-and-condition-update-view',
  imports: [IGX_CARD_DIRECTIVES, IGX_GRID_DIRECTIVES, IgxAvatarComponent, IgxIconComponent, IgxButtonDirective, IgxRippleDirective],
  templateUrl: './equipment-requests-and-condition-update-view.component.html',
  styleUrls: ['./equipment-requests-and-condition-update-view.component.scss']
})
export class EquipmentRequestsAndConditionUpdateViewComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public northwindEmployees: EmployeesType[] = [];

  constructor(
    public northwindService: NorthwindService,
  ) {}


  ngOnInit() {
    this.northwindService.getEmployees().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.northwindEmployees = data
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
