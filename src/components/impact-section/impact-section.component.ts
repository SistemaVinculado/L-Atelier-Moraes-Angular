import { Component, ChangeDetectionStrategy, signal, inject, ElementRef, PLATFORM_ID, effect, OnDestroy, afterNextRender } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';

interface Stat {
  value: number;
  displayValue: number;
  suffix: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-impact-section',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective, ShimmerTextDirective],
  templateUrl: './impact-section.component.html',
  styles: [`
    .stat-card-inner {
      transform-style: preserve-3d;
      transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    .group:hover .stat-card-inner {
      transform: translateZ(20px) rotateX(5deg) rotateY(-3deg);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImpactSectionComponent implements OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  private animationFrameId?: number;

  private readonly stats: Omit<Stat, 'displayValue'>[] = [
    { value: 150, suffix: '%', label: 'Aumento em Conversão', description: 'Através da otimização fundamental de funis e jornadas, gero um aumento médio de 150% nas taxas de conversão para parceiros de e-commerce e SaaS.' },
    { value: 80, suffix: '%', label: 'Engajamento de Usuário', description: 'Com um design de experiência focado em princípios humanos, alcanço um aumento de 80% no engajamento e tempo de permanência.' },
    { value: 30, suffix: '%', label: 'Redução de Custo', description: 'Meus sistemas de design e componentes reutilizáveis otimizam o tempo de desenvolvimento em até 30%, um resultado direto da engenharia fundamentalista.' },
    { value: 99, suffix: '%', label: 'Satisfação do Cliente', description: 'Meu processo, fundamentado na colaboração e transparência, resulta em um índice de satisfação e parceria de 99%.' },
  ];

  readonly displayedStats = signal<Stat[]>(this.stats.map(s => ({ ...s, displayValue: 0 })));

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            this.startCountUpAnimation();
            this.observer?.unobserve(this.elementRef.nativeElement);
          }
        }, { threshold: 0.5 });
        this.observer.observe(this.elementRef.nativeElement);
      }
    });
  }

  private startCountUpAnimation(): void {
    const DURATION = 2500;
    let startTime: number | null = null;
    
    const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      const easedProgress = easeOutExpo(progress);

      this.displayedStats.update(currentStats => 
        currentStats.map((stat, i) => ({
          ...stat,
          displayValue: Math.floor(easedProgress * this.stats[i].value),
        }))
      );

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }
  
  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}