import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GoalPanel } from '../../models/goal';

@Component({
  selector: 'goal-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './goal-panel.component.html',
  styleUrl: './goal-panel.component.css',
})
export class GoalPanelComponent {
  @Input() goal?: GoalPanel;

  FormatDurationFromSeconds(durationInSeconds: number) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }
}
