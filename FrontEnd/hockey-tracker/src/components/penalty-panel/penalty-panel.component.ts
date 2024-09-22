import { Component, Input } from '@angular/core';
import { PenaltyPanel } from '../../models/penalties';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-penalty-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './penalty-panel.component.html',
  styleUrl: './penalty-panel.component.css',
})
export class PenaltyPanelComponent {
  @Input() penalty!: PenaltyPanel;

  FormatDurationFromSeconds(durationInSeconds: number) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }
}
