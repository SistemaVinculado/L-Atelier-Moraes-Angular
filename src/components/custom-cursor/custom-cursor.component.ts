import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CursorService } from '../../services/cursor.service';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  templateUrl: './custom-cursor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:mousemove)': 'onMouseMove($event)',
    '(window:mousedown)': 'onMouseDown()',
    '(window:mouseup)': 'onMouseUp()',
  }
})
export class CustomCursorComponent {
  private readonly cursorService = inject(CursorService);
  readonly type = this.cursorService.type;
  readonly text = this.cursorService.text;

  private readonly posX = signal(-100);
  private readonly posY = signal(-100);
  readonly isMouseDown = signal(false);

  readonly transformStyle = computed(() => `translate(${this.posX()}px, ${this.posY()}px) translate(-50%, -50%)`);

  onMouseMove(event: MouseEvent): void {
    this.posX.set(event.clientX);
    this.posY.set(event.clientY);
  }

  onMouseDown(): void {
    this.isMouseDown.set(true);
  }

  onMouseUp(): void {
    this.isMouseDown.set(false);
  }
}