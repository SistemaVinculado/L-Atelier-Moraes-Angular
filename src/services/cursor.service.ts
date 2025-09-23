import { Injectable, signal } from '@angular/core';

export type CursorType = 'default' | 'link' | 'text';

@Injectable({
  providedIn: 'root'
})
export class CursorService {
  readonly type = signal<CursorType>('default');
  readonly text = signal<string>('');

  setState(type: CursorType, text = ''): void {
    this.type.set(type);
    this.text.set(text);
  }
}