import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mouse-follower',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mouse-follower.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:mousemove)': 'onMouseMove($event)'
  }
})
export class MouseFollowerComponent {
  private readonly posX = signal(0);
  private readonly posY = signal(0);

  readonly transformStyle = computed(() => `translate(${this.posX()}px, ${this.posY()}px)`);

  onMouseMove(event: MouseEvent): void {
    this.posX.set(event.clientX);
    this.posY.set(event.clientY);
  }
}
