import { Component, ChangeDetectionStrategy, computed, signal, inject, ElementRef } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ModalService } from '../../services/modal.service';
import { CursorHoverDirective } from '../../directives/cursor-hover.directive';

@Component({
  selector: 'app-availability-section',
  standalone: true,
  imports: [AnimateOnScrollDirective, CursorHoverDirective],
  templateUrl: './availability-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(mousemove)': 'onMouseMove($event)',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class AvailabilitySectionComponent {
  private readonly modalService = inject(ModalService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly transformStyle = signal('rotateX(0deg) rotateY(0deg) scale(1)');

  private readonly solidPhrases = signal(['Disponível para Colaborações Seletas']);
  private readonly outlinePhrases = signal(["Vamos Arquitetar o Futuro"]);

  // Repeat the phrase multiple times to ensure a seamless loop
  readonly repeatedSolidPhrases = computed(() => {
    const basePhrases = this.solidPhrases();
    const repeated = [];
    for (let i = 0; i < 10; i++) {
      repeated.push(...basePhrases);
    }
    return repeated;
  });

  readonly repeatedOutlinePhrases = computed(() => {
    const basePhrases = this.outlinePhrases();
    const repeated = [];
    for (let i = 0; i < 10; i++) {
      repeated.push(...basePhrases);
    }
    return repeated;
  });

  onMouseMove(event: MouseEvent): void {
    const el = this.elementRef.nativeElement;
    const rect = el.getBoundingClientRect();
    
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = x - centerX;
    const deltaY = y - centerY;

    const rotateX = (deltaY / centerY) * -6; // Max rotation 6 degrees
    const rotateY = (deltaX / centerX) * 6;  // Max rotation 6 degrees
    
    this.transformStyle.set(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
  }

  onMouseLeave(): void {
    this.transformStyle.set('rotateX(0deg) rotateY(0deg) scale(1)');
  }

  openAiModal(): void {
    this.modalService.openAiBriefModal('Estou interessado em iniciar um novo projeto.');
  }
}