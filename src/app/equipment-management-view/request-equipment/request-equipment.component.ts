import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { 
  IgxGridModule, 
  IgxButtonDirective, 
  IgxRippleDirective, 
  IGX_INPUT_GROUP_DIRECTIVES,
  IgxDialogModule,
  IgxIconComponent,
  IgxSnackbarComponent 
} from 'igniteui-angular';
import { EquipmentService } from '../../services/equipment.service';
import { EquipmentRequestService } from '../../services/equipment-request.service';
import { Equipment } from '../../models/api/equipment.model';
import { CreateEquipmentRequest } from '../../models/api/equipment-request.model';
import { EquipmentStatus } from '../../models/api/enums';

@Component({
  selector: 'app-request-equipment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IgxGridModule,
    IgxButtonDirective,
    IgxRippleDirective,
    IGX_INPUT_GROUP_DIRECTIVES,
    IgxDialogModule,
    IgxIconComponent,
    IgxSnackbarComponent
  ],
  template: `
    <div class="equipment-request-container">
      <div class="header-section">
        <h2>Request Equipment</h2>
        <p>Select equipment and specify the time period for your request.</p>
      </div>

      <div class="search-section">
        <igx-input-group type="search">
          <input igxInput [(ngModel)]="searchText" (ngModelChange)="onSearchChange()" placeholder="Search equipment..." />
          <label igxLabel>Search</label>
        </igx-input-group>
      </div>

      <igx-grid #grid 
                [data]="availableEquipment" 
                [allowFiltering]="true"
                [filterMode]="'excelStyleFilter'"
                height="400px"
                width="100%">
        
        <igx-column field="name" header="Name" [sortable]="true" [filterable]="true"></igx-column>
        <igx-column field="type" header="Type" [sortable]="true" [filterable]="true"></igx-column>
        <igx-column field="location" header="Location" [sortable]="true" [filterable]="true"></igx-column>
        <igx-column field="condition" header="Condition" [sortable]="true" [filterable]="true"></igx-column>
        <igx-column field="status" header="Status" [sortable]="true" [filterable]="true"></igx-column>
        
        <igx-column field="actions" header="Actions" [sortable]="false" [filterable]="false">
          <ng-template igxCell let-cell="cell">
            <button 
              igxButton="outlined" 
              igxRipple 
              (click)="openRequestDialog(cell.row.data)"
              [disabled]="cell.row.data.status !== 'Available'">
              <igx-icon>add_shopping_cart</igx-icon>
              Request
            </button>
          </ng-template>
        </igx-column>
      </igx-grid>

      <!-- Request Dialog -->
      <igx-dialog #requestDialog [closeOnOutsideSelect]="true">
        <div igxDialogTitle>Request Equipment</div>
        <div igxDialogContent>
          @if (selectedEquipment) {
            <div class="dialog-content">
              <h4>{{ selectedEquipment.name }}</h4>
              <p><strong>Type:</strong> {{ selectedEquipment.type }}</p>
              <p><strong>Location:</strong> {{ selectedEquipment.location }}</p>
              <p><strong>Condition:</strong> {{ selectedEquipment.condition }}</p>
              
              <div class="date-inputs">
                <igx-input-group>
                  <input igxInput type="datetime-local" [(ngModel)]="requestStartDate" required />
                  <label igxLabel>Start Date & Time</label>
                </igx-input-group>
                
                <igx-input-group>
                  <input igxInput type="datetime-local" [(ngModel)]="requestEndDate" required />
                  <label igxLabel>End Date & Time</label>
                </igx-input-group>
              </div>
              
              <igx-input-group>
                <textarea igxInput [(ngModel)]="requestNotes" rows="3"></textarea>
                <label igxLabel>Notes (Optional)</label>
              </igx-input-group>
            </div>
          }
        </div>
        <div igxDialogActions>
          <button igxButton="flat" (click)="requestDialog.close()">Cancel</button>
          <button 
            igxButton="contained" 
            igxRipple 
            (click)="submitRequest()"
            [disabled]="!isRequestValid()">
            Submit Request
          </button>
        </div>
      </igx-dialog>

      <igx-snackbar #snackbar></igx-snackbar>
    </div>
  `,
  styles: [`
    .equipment-request-container {
      padding: 24px;
      height: 100%;
    }

    .header-section {
      margin-bottom: 24px;
    }

    .header-section h2 {
      margin: 0 0 8px 0;
      color: var(--igx-primary-600);
    }

    .search-section {
      margin-bottom: 16px;
      max-width: 400px;
    }

    .dialog-content {
      min-width: 400px;
    }

    .date-inputs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin: 16px 0;
    }
  `]
})
export class RequestEquipmentComponent implements OnInit {
  @ViewChild('requestDialog', { static: true }) requestDialog: any;
  @ViewChild('snackbar', { static: true }) snackbar: any;

  public availableEquipment: Equipment[] = [];
  public searchText = '';
  public selectedEquipment: Equipment | null = null;
  public requestStartDate = '';
  public requestEndDate = '';
  public requestNotes = '';

  constructor(
    private equipmentService: EquipmentService,
    private equipmentRequestService: EquipmentRequestService
  ) {}

  ngOnInit() {
    this.loadAvailableEquipment();
  }

  loadAvailableEquipment() {
    this.equipmentService.searchEquipment({ status: EquipmentStatus.Available }).subscribe({
      next: (equipment) => {
        this.availableEquipment = equipment;
      },
      error: (error) => {
        console.error('Error loading equipment:', error);
      }
    });
  }

  onSearchChange() {
    if (this.searchText.trim()) {
      this.equipmentService.searchEquipment({ qtext: this.searchText.trim() }).subscribe({
        next: (equipment) => {
          this.availableEquipment = equipment.filter(eq => eq.status === EquipmentStatus.Available);
        }
      });
    } else {
      this.loadAvailableEquipment();
    }
  }

  openRequestDialog(equipment: Equipment) {
    this.selectedEquipment = equipment;
    this.requestStartDate = '';
    this.requestEndDate = '';
    this.requestNotes = '';
    this.requestDialog.open();
  }

  isRequestValid(): boolean {
    if (!this.selectedEquipment || !this.requestStartDate || !this.requestEndDate) {
      return false;
    }
    
    const start = new Date(this.requestStartDate);
    const end = new Date(this.requestEndDate);
    const now = new Date();
    
    return start >= now && end > start;
  }

  submitRequest() {
    if (!this.selectedEquipment || !this.isRequestValid()) {
      return;
    }

    const request: CreateEquipmentRequest = {
      equipmentId: this.selectedEquipment.equipmentId!,
      start: new Date(this.requestStartDate),
      end: new Date(this.requestEndDate),
      notes: this.requestNotes.trim() || undefined
    };

    this.equipmentRequestService.createRequest(request).subscribe({
      next: (response) => {
        this.snackbar.open('Equipment request submitted successfully!');
        this.requestDialog.close();
        this.loadAvailableEquipment();
        this.selectedEquipment = null;
      },
      error: (error) => {
        this.snackbar.open('Error creating request. Please try again.');
        console.error('Error creating request:', error);
      }
    });
  }
}