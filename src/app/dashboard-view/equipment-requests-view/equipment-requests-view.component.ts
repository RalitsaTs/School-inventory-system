import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGX_GRID_DIRECTIVES, IgxButtonDirective, IgxRippleDirective } from 'igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { EmployeesType } from '../../models/northwind/employees-type';
import { NorthwindService } from '../../services/northwind.service';

@Component({
  selector: 'app-equipment-requests-view',
  imports: [IGX_GRID_DIRECTIVES, IgxButtonDirective, IgxRippleDirective],
  templateUrl: './equipment-requests-view.component.html',
  styleUrls: ['./equipment-requests-view.component.scss']
})
export class EquipmentRequestsViewComponent implements OnInit, OnDestroy {
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
