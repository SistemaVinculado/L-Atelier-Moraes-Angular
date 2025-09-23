import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ModalService } from '../../services/modal.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  templateUrl: './cta-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AnimateOnScrollDirective,
    ReactiveFormsModule,
    CommonModule,
    ShimmerTextDirective
  ],
})
export class CtaSectionComponent {
  private readonly modalService = inject(ModalService);

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  isSubmitting = signal(false);

  submitForm(): void {
    if (this.emailControl.invalid || this.isSubmitting()) {
      return;
    }
    this.isSubmitting.set(true);

    // Simulate network request
    setTimeout(() => {
      const email = this.emailControl.value;
      const initialText = `O cliente com o e-mail '${email}' está interessado em um projeto. Minha ideia é...`;
      this.modalService.openAiBriefModal(initialText);
      this.isSubmitting.set(false);
    }, 750);
  }
}