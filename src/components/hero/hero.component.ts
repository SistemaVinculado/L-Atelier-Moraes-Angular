import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ModalService } from '../../services/modal.service';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnimateOnScrollDirective, ShimmerTextDirective]
})
export class HeroComponent {
  private readonly modalService = inject(ModalService);

  openAiModal(): void {
    this.modalService.openAiBriefModal();
  }
}