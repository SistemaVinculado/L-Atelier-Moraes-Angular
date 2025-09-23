import { Directive, ElementRef, OnInit, Renderer2, inject, OnDestroy, input } from '@angular/core';

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: true,
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  animationDelay = input<string>('0ms');
  
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const nativeElement = this.elementRef.nativeElement;

    this.renderer.setStyle(nativeElement, 'opacity', '0');
    this.renderer.setStyle(nativeElement, 'transform', 'translateY(20px)');
    this.renderer.setStyle(nativeElement, 'transition', 'opacity 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)');
    this.renderer.setStyle(nativeElement, 'transition-delay', this.animationDelay());

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.setStyle(nativeElement, 'opacity', '1');
          this.renderer.setStyle(nativeElement, 'transform', 'translateY(0)');
          this.observer?.unobserve(nativeElement);
        }
      });
    }, {
      threshold: 0.1
    });

    this.observer.observe(nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}