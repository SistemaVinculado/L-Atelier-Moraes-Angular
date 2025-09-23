import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private readonly document = inject(DOCUMENT);

  scrollToElementById(id: string): void {
    const element = this.document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
