import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGX_CARD_DIRECTIVES, IGX_GRID_DIRECTIVES, IgxAvatarComponent, IgxIconComponent } from 'igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { BorrowedItemsType } from '../../models/student-borrowed-items-list/borrowed-items-type';
import { StudentBorrowedItemsListService } from '../../services/student-borrowed-items-list.service';

@Component({
  selector: 'app-student-dashboard',
  imports: [IGX_CARD_DIRECTIVES, IGX_GRID_DIRECTIVES, IgxAvatarComponent, IgxIconComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public studentBorrowedItemsListBorrowedItems: BorrowedItemsType[] = [];

  constructor(
    public studentBorrowedItemsListService: StudentBorrowedItemsListService,
  ) {}


  ngOnInit() {
    this.studentBorrowedItemsListService.getBorrowedItems().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.studentBorrowedItemsListBorrowedItems = data
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
