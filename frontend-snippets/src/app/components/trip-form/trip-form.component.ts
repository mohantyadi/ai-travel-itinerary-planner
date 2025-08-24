import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css']
})
export class TripFormComponent {
  formData: any = { destination: '', duration: 3, budget: 'medium', interests: [] };
  itineraryMarkdown = '';
  loading = false;
  error = '';

  constructor(private api: ApiService) {}

  submit() {
    this.loading = true;
    this.error = '';
    this.api.generateItinerary(this.formData).subscribe({
      next: (res) => {
        this.loading = false;
        this.itineraryMarkdown = res?.itinerary?.markdown || '';
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.error || 'Request failed';
      }
    });
  }
}
