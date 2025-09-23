import { Component, ChangeDetectionStrategy, signal, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ModalService } from '../../services/modal.service';
import { GeminiService } from '../../services/gemini.service';

@Component({
  selector: 'app-ai-brief-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ai-brief-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiBriefModalComponent {
  readonly modalService = inject(ModalService);
  private readonly geminiService = inject(GeminiService);
  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);

  readonly ideaControl = new FormControl('', [Validators.required, Validators.minLength(10)]);
  readonly isLoading = signal(false);
  readonly briefResult = signal<SafeHtml | null>(null);
  readonly error = signal<string | null>(null);
  
  readonly hasGenerated = signal(false);

  constructor() {
    effect(() => {
      const initialText = this.modalService.initialBriefText();
      if (initialText) {
        this.ideaControl.setValue(initialText);
      }
    });
  }

  async generateBrief(): Promise<void> {
    if (this.ideaControl.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);
    this.briefResult.set(null);
    this.hasGenerated.set(true);

    try {
      const idea = this.ideaControl.value ?? '';
      const markdownResponse = await this.geminiService.generateProjectBrief(idea);
      const htmlResponse = this.parseMarkdown(markdownResponse);
      this.briefResult.set(this.sanitizer.bypassSecurityTrustHtml(htmlResponse));
    } catch (e) {
      this.error.set('An unexpected error occurred. Please try again.');
      console.error(e);
    } finally {
      this.isLoading.set(false);
    }
  }

  closeModal(): void {
    this.modalService.closeAiBriefModal();
    // Reset state after a short delay to allow for fade-out animation
    setTimeout(() => {
      this.hasGenerated.set(false);
      this.briefResult.set(null);
      this.error.set(null);
      this.ideaControl.reset('');
      this.modalService.initialBriefText.set('');
    }, 300);
  }
  
  startAgain(): void {
      this.hasGenerated.set(false);
      this.briefResult.set(null);
      this.error.set(null);
      const initialText = this.modalService.initialBriefText();
      this.ideaControl.reset(initialText || '');
  }

  private parseMarkdown(text: string): string {
    // Split the entire text block into sections. Each section starts with a bolded title.
    const sections = text.split(/(?=\*\*.*?\*\*)/g).filter(s => s.trim());

    return sections.map((section, index) => {
        const delay = 150 + (index * 150); // Staggered delay for each section

        const sectionHtml = section
            // First, replace the bolded title with a strong tag.
            .replace(/\*\*(.*?)\*\*/, '<strong class="text-white font-bold block mb-4 text-lg">$1</strong>')
            // Then, convert all markdown-style list items into styled paragraphs.
            .replace(/^\s*\*\s(.*?)$/gm, '<p class="flex items-start mb-2"><span class="mr-3 mt-2.5 block w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span><span>$1</span></p>')
            // Finally, remove any remaining newline characters to prevent extra spaces.
            .replace(/\n/g, '');

        // Wrap each processed section in a div with the animation styles.
        return `<div class="section-fade-in opacity-0" style="animation-delay: ${delay}ms; animation-fill-mode: forwards;">${sectionHtml}</div>`;
    }).join('');
  }
}