import { Component, OnInit } from "@angular/core";
import { WeightScaleService } from "../weight-scale.service";
@Component({
  selector: 'app-weight-display',
  standalone: false,
  templateUrl: './weight-display.component.html',
  styleUrl: './weight-display.component.css'
})
export class WeightDisplayComponent implements OnInit {
  weight: string = "Waiting for weight...";
  weightHistory: any[] = [];

  constructor(private weightService: WeightScaleService) {}

  ngOnInit() {
    this.weightService.getWeightData().subscribe((data) => {
      this.weight = `Weight: ${data} kg`;
      this.fetchWeightHistory();
    });

    this.fetchWeightHistory();
  }

  fetchWeightHistory() {
    this.weightService.getStoredWeights().subscribe((data) => {
      this.weightHistory = data;
    });
  }
}
