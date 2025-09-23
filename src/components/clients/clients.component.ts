import { Component, ChangeDetectionStrategy, signal, computed, ElementRef, viewChild } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnimateOnScrollDirective, ShimmerTextDirective],
})
export class ClientsComponent {
  private readonly marqueeContainerRef = viewChild.required<ElementRef<HTMLElement>>('marqueeContainer');

  readonly isHovering = signal(false);
  private readonly mouseX = signal(0);
  private readonly mouseY = signal(0);
  
  readonly glowStyle = computed(() => {
    if (!this.isHovering()) {
      return { opacity: '0' };
    }
    return {
      '--mouse-x': `${this.mouseX()}px`,
      '--mouse-y': `${this.mouseY()}px`,
      opacity: '1'
    };
  });

  private originalLogos = signal([
    'Google', 'Microsoft', 'Meta', 'Amazon', 'Stripe', 
    'Figma', 'Notion', 'Slack', 'Webflow', 'Brex', 
    'MIT', 'Stanford University', 'Harvard University', 'Rappi', 'Nubank',
    'Shopify', 'Uber', 'Airbnb', 'Salesforce', 'University of Cambridge', 'University of Oxford'
  ]);
  
  // Split logos into three tracks
  private track1Logos = computed(() => this.originalLogos().slice(0, 7));
  private track2Logos = computed(() => this.originalLogos().slice(7, 14));
  private track3Logos = computed(() => this.originalLogos().slice(14, 21));

  // Duplicate logos for each track for a seamless marquee effect
  clientLogos1 = computed(() => [...this.track1Logos(), ...this.track1Logos()]);
  clientLogos2 = computed(() => [...this.track2Logos(), ...this.track2Logos()]);
  clientLogos3 = computed(() => [...this.track3Logos(), ...this.track3Logos()]);

  onMouseMove(event: MouseEvent): void {
    this.isHovering.set(true);
    const rect = this.marqueeContainerRef().nativeElement.getBoundingClientRect();
    this.mouseX.set(event.clientX - rect.left);
    this.mouseY.set(event.clientY - rect.top);
  }

  onMouseLeave(): void {
    this.isHovering.set(false);
  }
}