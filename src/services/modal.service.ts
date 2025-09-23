import { Injectable, signal } from '@angular/core';

// Exporting this interface so it can be used by other components
export interface ServiceOffering {
  name: string;
  description: string;
  price: string;
  details?: string;
  quotePrompt: string;
  isHighlighted?: boolean;
  badge?: string;
  benefits?: string[];
  techStack?: string[];
  scope?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  readonly isAiBriefModalOpen = signal(false);
  readonly initialBriefText = signal<string>('');

  openAiBriefModal(initialText: string = ''): void {
    this.initialBriefText.set(initialText);
    this.isAiBriefModalOpen.set(true);
  }

  requestQuote(service: ServiceOffering): void {
    this.openAiBriefModal(service.quotePrompt);
  }

  closeAiBriefModal(): void {
    this.isAiBriefModalOpen.set(false);
  }
}
