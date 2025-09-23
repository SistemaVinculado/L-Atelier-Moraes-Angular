import { Component, ChangeDetectionStrategy, inject, signal, OnInit, OnDestroy, ElementRef, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { HeaderVisibilityService } from '../../services/header-visibility.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
  ],
})
export class FooterComponent implements OnInit, OnDestroy {
  private readonly scrollService = inject(ScrollService);
  // FIX: Explicitly type the injected Router to avoid type inference issues.
  private readonly router: Router = inject(Router);
  private readonly headerVisibilityService = inject(HeaderVisibilityService);
  private readonly elementRef = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  newsletterEmailControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  isSubmitting = signal(false);

  readonly currentYear = new Date().getFullYear();

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver(([entry]) => {
        this.headerVisibilityService.setFooterVisible(entry.isIntersecting);
      }, { threshold: 0.1 });
      this.observer.observe(this.elementRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (isPlatformBrowser(this.platformId)) {
      this.headerVisibilityService.setFooterVisible(false);
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollTo(id: string): void {
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollService.scrollToElementById(id), 100);
      });
    } else {
      this.scrollService.scrollToElementById(id);
    }
  }

  subscribeNewsletter(): void {
    if (this.newsletterEmailControl.invalid || this.isSubmitting()) {
      return;
    }
    this.isSubmitting.set(true);

    // Simulate network request
    setTimeout(() => {
      console.log('Subscribed with:', this.newsletterEmailControl.value);
      this.newsletterEmailControl.reset();
      this.isSubmitting.set(false);
    }, 1500);
  }
}
