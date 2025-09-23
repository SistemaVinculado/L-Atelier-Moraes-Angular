import { Directive, ElementRef, OnInit, Renderer2, inject, input } from '@angular/core';

@Directive({
  selector: '[appShimmerText]',
  standalone: true,
  host: {
    '(mouseenter)': 'onMouseEnter($event)',
    '(mousemove)': 'onMouseMove($event)',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class ShimmerTextDirective implements OnInit {
  alternateText = input<string>('');

  private readonly el: HTMLElement = inject(ElementRef).nativeElement;
  private readonly renderer = inject(Renderer2);

  ngOnInit(): void {
    this.renderer.addClass(this.el, 'app-shimmer-text');
    this.renderer.setStyle(this.el, 'position', 'relative');
    this.renderer.setStyle(this.el, 'transition', 'color 0.3s ease-out');
  }

  onMouseEnter(event: MouseEvent): void {
    if (this.alternateText()) {
      this.el.style.setProperty('--alternate-text', `"${this.alternateText()}"`);
      this.renderer.addClass(this.el, 'shimmer-active');
    }
    
    this.renderer.setStyle(this.el, 'color', 'transparent');
    this.renderer.setStyle(this.el, 'background-clip', 'text');
    this.renderer.setStyle(this.el, '-webkit-background-clip', 'text');
    this.renderer.setStyle(
      this.el,
      'background-image',
      `radial-gradient(circle 400px at var(--x, 50%), var(--y, 50%), white 20%, rgba(255, 255, 255, 0.2) 100%)`
    );
    // Set initial mouse position
    this.onMouseMove(event);
  }

  onMouseMove(event: MouseEvent): void {
    const rect = this.el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.el.style.setProperty('--x', `${x}px`);
    this.el.style.setProperty('--y', `${y}px`);
  }

  onMouseLeave(): void {
    // Revert to the default text color (letting it be inherited)
    this.renderer.setStyle(this.el, 'color', '');
    this.renderer.setStyle(this.el, 'background-image', 'none');
    if (this.alternateText()) {
      this.renderer.removeClass(this.el, 'shimmer-active');
    }
  }
}
