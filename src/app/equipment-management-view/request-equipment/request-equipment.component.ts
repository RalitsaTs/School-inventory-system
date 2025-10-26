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
  templateUrl: './request-equipment.component.html',
  styleUrls: ['./request-equipment.component.scss']
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
    this.resetForm();
    this.requestDialog.open();
  }

  private resetForm() {
    this.requestStartDate = '';
    this.requestEndDate = '';
    this.requestNotes = '';
  }

  isRequestValid(): boolean {
    if (!this.selectedEquipment || !this.requestStartDate || !this.requestEndDate) {
      return false;
    }
    
    if (!this.selectedEquipment.equipmentId) {
      return false;
    }
    
    const start = new Date(this.requestStartDate);
    const end = new Date(this.requestEndDate);
    const now = new Date();
    
    // Check if dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return false;
    }
    
    return start >= now && end > start;
  }

  submitRequest() {
    if (!this.selectedEquipment || !this.isRequestValid()) {
      this.snackbar?.open('Please check all required fields and ensure dates are valid.');
      return;
    }

    if (!this.selectedEquipment.equipmentId) {
      this.snackbar?.open('Equipment ID is missing. Please try again.');
      return;
    }

    const request: CreateEquipmentRequest = {
      equipmentId: this.selectedEquipment.equipmentId,
      start: new Date(this.requestStartDate),
      end: new Date(this.requestEndDate),
      notes: this.requestNotes.trim() || undefined
    };

    console.log('Submitting request:', request);

    this.equipmentRequestService.createRequest(request).subscribe({
      next: (response) => {
        console.log('Request submitted successfully:', response);
        this.snackbar?.open('Equipment request submitted successfully!');
        this.requestDialog.close();
        this.loadAvailableEquipment();
        this.selectedEquipment = null;
        this.resetForm();
      },
      error: (error) => {
        console.error('Error creating request:', error);
        let errorMessage = 'Error creating request. Please try again.';
        
        if (error.status === 400) {
          errorMessage = error.error?.message || 'Invalid request data. Please check your input.';
        } else if (error.status === 401) {
          errorMessage = 'You must be logged in to make a request.';
        } else if (error.status === 404) {
          errorMessage = 'Equipment not found.';
        } else if (error.status === 409) {
          errorMessage = 'Equipment is already requested for this time period.';
        }
        
        this.snackbar?.open(errorMessage);
      }
    });
  }
}