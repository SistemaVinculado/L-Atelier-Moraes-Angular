import { Directive, inject, input } from '@angular/core';
import { CursorService, CursorType } from '../services/cursor.service';

@Directive({
  selector: '[appCursorHover]',
  standalone: true,
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class CursorHoverDirective {
  private readonly cursorService = inject(CursorService);

  cursorType = input<CursorType>('link');
  cursorText = input<string>('');

  onMouseEnter(): void {
    this.cursorService.setState(this.cursorType(), this.cursorText());
  }

  onMouseLeave(): void {
    this.cursorService.setState('default');
  }
}