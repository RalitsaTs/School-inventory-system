import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGX_CARD_DIRECTIVES, IgxAvatarComponent, IgxButtonDirective, IgxIconComponent, IgxRippleDirective } from 'igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { EquipmentRequestsType } from '../../models/generate-alist-of-equipment-requests-including-it/equipment-requests-type';
import { GenerateAListOfEquipmentRequestsIncludingItService } from '../../services/generate-alist-of-equipment-requests-including-it.service';

@Component({
  selector: 'app-equipment-requests-view',
  imports: [IGX_CARD_DIRECTIVES, IgxAvatarComponent, IgxIconComponent, IgxButtonDirective, IgxRippleDirective],
  templateUrl: './equipment-requests-view.component.html',
  styleUrls: ['./equipment-requests-view.component.scss']
})
export class EquipmentRequestsViewComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public generateAListOfEquipmentRequestsIncludingItEquipmentRequests: EquipmentRequestsType[] = [];

  constructor(
    public generateAListOfEquipmentRequestsIncludingItService: GenerateAListOfEquipmentRequestsIncludingItService,
  ) {}


  ngOnInit() {
    this.generateAListOfEquipmentRequestsIncludingItService.getEquipmentRequests().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.generateAListOfEquipmentRequestsIncludingItEquipmentRequests = data
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
