import { Component, ChangeDetectionStrategy, signal, effect, inject, Renderer2, computed } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';
import { ModalService } from '../../services/modal.service';
import { HeaderVisibilityService } from '../../services/header-visibility.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  host: {
    '(window:scroll)': 'onScroll()'
  }
})
export class HeaderComponent {
  isMenuOpen = signal(false);
  isClosing = signal(false);
  isScrolled = signal(false);
  
  private readonly scrollY = signal(0);
  private readonly lastScrollY = signal(0);

  private readonly document: Document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private readonly scrollService = inject(ScrollService);
  private readonly modalService = inject(ModalService);
  private readonly router: Router = inject(Router);
  private readonly headerVisibilityService = inject(HeaderVisibilityService);

  readonly isHeaderVisible = computed(() => {
    // Priority 1: If the mobile menu is open, the header must be visible.
    if (this.isMenuOpen()) {
        return true;
    }

    // Priority 2: If footer is visible, hide header.
    if (this.headerVisibilityService.isFooterVisible()) {
        return false;
    }

    // Priority 3: If a component forces the header to be hidden, it's hidden.
    if (this.headerVisibilityService.isHeaderForcedHidden()) {
        return false;
    }
    
    const currentScrollY = this.scrollY();
    const previousScrollY = this.lastScrollY();

    // If scrolling down AND we are past the initial 100px threshold, hide the header.
    if (currentScrollY > previousScrollY && currentScrollY > 100) {
        return false;
    }

    // In all other cases (at the top, or scrolling up), the header is visible.
    return true;
  });

  constructor() {
    effect(() => {
      if (this.isMenuOpen() && !this.isClosing()) {
        this.renderer.addClass(this.document.body, 'overflow-hidden');
      } else {
        this.renderer.removeClass(this.document.body, 'overflow-hidden');
      }
    });
  }

  onScroll(): void {
    const currentScrollY = this.document.documentElement.scrollTop;
    this.lastScrollY.set(this.scrollY());
    this.scrollY.set(currentScrollY < 0 ? 0 : currentScrollY);
    this.isScrolled.set(currentScrollY > 0);
  }

  toggleMenu(): void {
    if (this.isMenuOpen() && !this.isClosing()) {
      this.isClosing.set(true);
      setTimeout(() => {
        this.isMenuOpen.set(false);
        this.isClosing.set(false);
      }, 400); // Animation duration
    } else if (!this.isMenuOpen()) {
      this.isMenuOpen.set(true);
    }
  }

  scrollTo(id: string): void {
    this.closeMenu();
    // Add a small delay to allow the menu to start closing before scrolling
    setTimeout(() => {
      if (this.router.url !== '/') {
        this.router.navigate(['/']).then(() => {
          // A brief delay to ensure the home page component is rendered
          setTimeout(() => this.scrollService.scrollToElementById(id), 100);
        });
      } else {
        this.scrollService.scrollToElementById(id);
      }
    }, 150);
  }

  openAiModal(): void {
    this.closeMenu();
     // A small delay to ensure the menu closing animation starts before modal opens
    setTimeout(() => {
      this.modalService.openAiBriefModal();
    }, 100);
  }

  closeMenu(): void {
    if (this.isMenuOpen() && !this.isClosing()) {
      this.toggleMenu();
    }
  }
}
