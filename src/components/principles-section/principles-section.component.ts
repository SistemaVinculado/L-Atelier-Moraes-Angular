import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Principle {
  title: string;
  description: string;
  iconSvg: SafeHtml;
}

@Component({
  selector: 'app-principles-section',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective, ShimmerTextDirective],
  templateUrl: './principles-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrinciplesSectionComponent {
  private readonly sanitizer = inject(DomSanitizer);
  principles: Principle[];

  constructor() {
    const rawPrinciples = [
      {
        title: 'Clareza Fundamental',
        description: 'A complexidade é destilada até sua essência mais simples. Cada elemento existe por um propósito fundamental, cada interação é governada pela intuição, resultando em experiências de clareza absoluta.',
        iconSvg: `
          <style>
            .c1-1 { fill: #f0fdf4; transition: fill 0.3s; } .group:hover .c1-1 { fill: #dcfce7; }
            .c1-2 { fill: rgba(26, 26, 26, 0.05); transition: fill 0.3s; } .group:hover .c1-2 { fill: rgba(26, 26, 26, 0.1); }
            .c1-3 { fill: #4ade80; transition: fill 0.3s; } .group:hover .c1-3 { fill: #22c55e; }
          </style>
          <circle cx="20" cy="44" r="16" class="c1-1" />
          <circle cx="44" cy="20" r="16" class="c1-2" />
          <circle cx="29" cy="29" r="12" class="c1-3" />
        `
      },
      {
        title: 'Elegância Funcional',
        description: 'A estética em meu trabalho é uma consequência da função perfeitamente executada. É a elegância que emerge quando forma e propósito são fundamentalmente inseparáveis.',
        iconSvg: `
          <style>
            .c2-1 { stroke: #4ade80; transition: stroke 0.3s; } .group:hover .c2-1 { stroke: #22c55e; }
          </style>
          <path d="M4,4 C4,60 60,4 60,60" stroke-width="8" stroke-linecap="round" class="c2-1" fill="none" />
        `
      },
      {
        title: 'Impacto Fundamental',
        description: 'Design sem resultado é ornamental. Meu foco é arquitetar soluções que não apenas impressionam, mas que geram, por princípio, crescimento e valor fundamental.',
        iconSvg: `
          <style>
            .c3-1 { fill: #4ade80; transition: fill 0.3s, transform 0.3s; transform-origin: center; } .group:hover .c3-1 { fill: #22c55e; transform: scale(1.1); }
          </style>
          <path d="M32,4 L38,26 60,28 42,42 48,64 32,52 16,64 22,42 4,28 26,26 Z" class="c3-1" />
        `
      }
    ];

    this.principles = rawPrinciples.map(p => ({
      ...p,
      iconSvg: this.sanitizer.bypassSecurityTrustHtml(p.iconSvg)
    }));
  }
}