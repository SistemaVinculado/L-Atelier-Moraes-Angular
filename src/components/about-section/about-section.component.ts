import { Component, ChangeDetectionStrategy, signal, computed, ElementRef, inject, effect, PLATFORM_ID, OnDestroy, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';
import { HeaderVisibilityService } from '../../services/header-visibility.service';

interface Feature {
  id: string;
  number: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    AnimateOnScrollDirective,
    ShimmerTextDirective,
  ],
  templateUrl: './about-section.component.html',
  styles: [`
    :host {
      display: block;
    }
    .carousel-3d {
      transform-style: preserve-3d;
      transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .card-3d {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      transition: opacity 0.5s ease;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutSectionComponent implements AfterViewInit, OnDestroy {
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly headerVisibilityService = inject(HeaderVisibilityService);
  private observer?: IntersectionObserver;

  // ESTA LINHA AGORA É PÚBLICA POR PADRÃO, CORRIGINDO O ERRO
  readonly scrollProgress = signal(0);
  readonly activeFeatureIndex = signal(0);
  readonly carouselRotation = computed(() => this.scrollProgress() * -120);

  features: Feature[] = [
    {
      id: 'strategy',
      number: '01',
      title: 'Pensamento Fundamental',
      description:
        'O processo inicia-se com uma imersão nos princípios do seu negócio. Atuo como um parceiro de pensamento para definir um roteiro que alinha a inovação digital aos seus objetivos mais fundamentais.',
    },
    {
      id: 'design',
      number: '02',
      title: 'Design de Princípios',
      description:
        'Um design de prestígio é a fusão de estética e propósito. Arquitetamos jornadas de usuário que são, por princípio, intuitivas e memoráveis, fortalecendo a lealdade e impulsionando a conversão.',
    },
    {
      id: 'tech',
      number: '03',
      title: 'Engenharia de Precisão',
      description:
        'Minha engenharia é sinônimo de excelência fundamental. Emprego tecnologias de ponta para construir produtos digitais robustos, seguros e perpetuamente escaláveis.',
    },
  ];

  constructor() {
    effect(() => {
      const progress = this.scrollProgress();
      const newIndex = Math.min(this.features.length - 1, Math.floor(progress * this.features.length));
      this.activeFeatureIndex.set(newIndex);
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      };

      this.observer = new IntersectionObserver(([entry]) => {
        this.headerVisibilityService.setHeaderForceHidden(entry.isIntersecting);
        if (entry.isIntersecting) {
          window.addEventListener('scroll', this.onScroll);
        } else {
          window.removeEventListener('scroll', this.onScroll);
        }
      }, options);

      this.observer.observe(this.elementRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.onScroll);
      this.headerVisibilityService.setHeaderForceHidden(false);
    }
  }

  private onScroll = (): void => {
    const hostElement = this.elementRef.nativeElement;
    const rect = hostElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const scrollableDistance = hostElement.offsetHeight - viewportHeight;

    if (rect.top > 0 || rect.bottom < viewportHeight) {
      if (rect.top > 0) {
        this.scrollProgress.set(0);
      } else {
        this.scrollProgress.set(1);
      }
      return;
    }

    const scrolledFromTop = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolledFromTop / scrollableDistance));

    this.scrollProgress.set(progress);
  }
}
```

### O Que Fazer Agora:

1.  Abra o arquivo `src/components/about-section/about-section.component.ts` no seu editor.
2.  Apague todo o conteúdo e cole o código que forneci acima.
3.  Salve o arquivo.
4.  Faça o `commit` e o `push` para o GitHub:

    ```bash
    git add .
    git commit -m "Fix: Torna scrollProgress público em AboutSectionComponent"
    git push
    

