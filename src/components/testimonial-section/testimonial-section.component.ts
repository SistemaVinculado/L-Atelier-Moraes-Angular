import { Component, ChangeDetectionStrategy, signal, inject, effect, Renderer2, computed } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';

export interface ClientStory {
  name: string;
  logo: string;
  category: string;
  description: string;
  tags: string[];
  fullDescription: string;
  themeColor: string;
}

@Component({
  selector: 'app-testimonial-section',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective, ShimmerTextDirective],
  templateUrl: './testimonial-section.component.html',
  styles: [`
    .testimonial-card-content {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: #242424; /* charcoal-light */
      border-radius: 1rem; /* rounded-2xl */
      border: 1px solid rgb(255 255 255 / 0.1);
      transition: all 0.3s ease;
    }

    .testimonial-card-content::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: radial-gradient(circle 350px at 50% 150%, var(--theme-color), transparent 60%);
      opacity: 0;
      transition: opacity 0.5s ease;
      z-index: 1;
    }

    .group-hover\\:-translate-y-2 .testimonial-card-content::before {
      opacity: 0.15;
    }

    .testimonial-card-content::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239CA3AF' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      background-position: 0 0;
      transition: background-position 0.6s ease-out;
      z-index: 0;
    }

    .group-hover\\:-translate-y-2 .testimonial-card-content::after {
      background-position: -1.5rem -1.5rem;
    }

  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialSectionComponent {
  private readonly renderer = inject(Renderer2);
  private readonly document: Document = inject(DOCUMENT);
  readonly selectedStory = signal<ClientStory | null>(null);
  readonly activeIndex = signal(0);
  readonly cardTransform = signal('rotateX(0deg) rotateY(0deg)'); // For 3D tilt

  readonly cardStyles = computed(() => {
    const activeIdx = this.activeIndex();
    const numStories = this.clientStories.length;

    return this.clientStories.map((_, i) => {
      const offset = i - activeIdx;
      const absOffset = Math.abs(offset);

      let transform: string;
      let opacity = '1';
      let zIndex = numStories - absOffset;
      
      // Default to hidden state far away
      transform = `translateY(${offset * 2}rem) scale(0.8)`;
      opacity = '0';

      if (absOffset <= 2) { // Show active and 2 cards behind
        transform = `translateY(${offset * 2}rem) scale(${1 - absOffset * 0.1})`;
        opacity = '1';
      }
      
      if (offset < 0) { // Cards in the past animate out
        transform = 'translateX(-50%) scale(0.8)';
        opacity = '0';
      }

      if (offset === 0) { // Active card
        transform = 'scale(1)';
      }


      return {
        transform,
        opacity,
        zIndex,
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        pointerEvents: offset === 0 ? 'auto' : 'none',
      };
    });
  });

  clientStories: ClientStory[] = [
    {
      name: 'Vercel',
      logo: 'Vercel',
      category: 'PLATAFORMA FRONTEND',
      description: 'Otimizando pipelines de CI/CD para uma experiência de deploy instantânea e global para aplicações frontend complexas.',
      tags: ['Frontend', 'DevOps', 'CI/CD', 'Edge'],
      fullDescription: 'Nossa colaboração com a Vercel focou na otimização da experiência de deploy para equipes corporativas. Redesenhamos o fluxo de integração de projetos e os painéis de análise de performance, criando pipelines de CI/CD automatizados que reduziram o tempo de deploy em 70%. Isso permitiu que grandes equipes gerenciassem e implantassem suas aplicações em escala global com muito mais agilidade e confiança.',
      themeColor: '#FFFFFF', // White for Vercel's branding
    },
    {
      name: 'GitHub',
      logo: 'GitHub',
      category: 'FERRAMENTAS DE DESENV.',
      description: 'Construindo ferramentas para aprimorar o fluxo de trabalho e a colaboração de milhões de desenvolvedores.',
      tags: ['Developer Tools', 'GitHub Actions', 'API', 'Comunidade'],
      fullDescription: 'Trabalhamos com o GitHub para desenvolver uma suíte de ferramentas de produtividade, incluindo uma CLI avançada e integrações com o GitHub Actions. O objetivo era automatizar tarefas repetitivas e melhorar o fluxo de revisão de código. O resultado foi uma adoção massiva pela comunidade, com as ferramentas se tornando padrão em muitos times de desenvolvimento de código aberto e corporativo.',
      themeColor: '#E0E0E0', // Light Gray
    },
    {
      name: 'Stripe',
      logo: 'Stripe',
      category: 'INFRAESTRUTURA DE PAGAMENTOS',
      description: 'Projetando APIs robustas e seguras que simplificam a infraestrutura econômica da internet.',
      tags: ['API First', 'Fintech', 'Segurança', 'Pagamentos'],
      fullDescription: 'Fomos parceiros da Stripe no design e arquitetura de suas novas APIs de pagamentos para mercados emergentes. O desafio era criar uma API que fosse ao mesmo tempo poderosa e simples de integrar. Focamos em uma documentação impecável, SDKs idiomáticos e segurança de ponta. O projeto resultou em uma redução de 40% no tempo de integração para novos desenvolvedores e expandiu o alcance da Stripe globalmente.',
      themeColor: '#6772E5', // Stripe's Indigo
    },
    {
      name: 'OpenAI',
      logo: 'OpenAI',
      category: 'INTELIGÊNCIA ARTIFICIAL',
      description: 'Integrando modelos de linguagem de ponta para criar aplicações inteligentes e inovadoras.',
      tags: ['IA', 'LLM', 'API', 'Engenharia de Prompt'],
      fullDescription: 'Colaboramos com diversas startups para integrar a API da OpenAI em seus produtos. Desenvolvemos desde chatbots de atendimento ao cliente até ferramentas de geração de conteúdo e análise de dados. Nosso trabalho envolveu engenharia de prompt, otimização de custos e a criação de interfaces de usuário que abstraem a complexidade dos modelos de IA, tornando a tecnologia acessível e útil.',
      themeColor: '#10A37F', // OpenAI's Teal
    },
    {
      name: 'AWS Lambda',
      logo: 'AWS',
      category: 'ARQUITETURA SERVERLESS',
      description: 'Construindo backends altamente escaláveis e eficientes com arquitetura serverless na AWS.',
      tags: ['Serverless', 'Backend', 'AWS', 'Escalabilidade'],
      fullDescription: 'Para um cliente de grande escala no setor de mídia, migramos sua infraestrutura de backend monolítica para uma arquitetura serverless baseada em AWS Lambda e API Gateway. O resultado foi uma redução de 60% nos custos de infraestrutura e uma capacidade de escalar automaticamente para lidar com picos de tráfego de milhões de usuários simultâneos durante eventos ao vivo.',
      themeColor: '#FF9900', // AWS Yellow/Orange
    },
    {
      name: 'Grafana',
      logo: 'Grafana',
      category: 'OBSERVABILIDADE',
      description: 'Desenvolvendo soluções de monitoramento e visualização de dados em tempo real.',
      tags: ['Data Viz', 'Monitoramento', 'Plugins', 'Open Source'],
      fullDescription: 'Contribuímos para o ecossistema Grafana desenvolvendo plugins de visualização de dados customizados para clientes no setor financeiro. Nossos plugins permitiram a criação de dashboards de monitoramento de performance em tempo real para sistemas de trading de baixa latência, ajudando a identificar e resolver gargalos de performance de forma proativa.',
      themeColor: '#F46800', // Grafana's Orange
    },
    {
      name: 'DigitalOcean',
      logo: 'DigitalOcean',
      category: 'INFRAESTRUTURA CLOUD',
      description: 'Automatizando o provisionamento de infraestrutura para acelerar o ciclo de desenvolvimento.',
      tags: ['Cloud', 'Automação', 'IaaS', 'API'],
      fullDescription: 'Criamos uma plataforma interna de provisionamento (PaaS) para uma startup de rápido crescimento, utilizando a API da DigitalOcean. A plataforma permitiu que os desenvolvedores criassem novos ambientes de teste e produção com um único comando, reduzindo o tempo de setup de infraestrutura de horas para minutos e acelerando significativamente o ciclo de desenvolvimento e entrega.',
      themeColor: '#0080FF', // DigitalOcean Blue
    }
  ];

  constructor() {
    effect(() => {
        if (this.selectedStory()) {
            this.renderer.addClass(this.document.body, 'overflow-hidden');
        } else {
            this.renderer.removeClass(this.document.body, 'overflow-hidden');
        }
    });
  }
  
  next(): void {
    this.activeIndex.update(current => (current + 1) % this.clientStories.length);
  }

  prev(): void {
    this.activeIndex.update(current => (current - 1 + this.clientStories.length) % this.clientStories.length);
  }

  openModal(story: ClientStory): void {
    this.selectedStory.set(story);
  }
  
  closeModal(): void {
    this.selectedStory.set(null);
  }

  onMouseMove(event: MouseEvent, cardElement: HTMLElement): void {
    const rect = cardElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const { width, height } = rect;

    const rotateX = (y - height / 2) / (height / 2) * -7; // Max rotation 7 degrees
    const rotateY = (x - width / 2) / (width / 2) * 7;    // Max rotation 7 degrees

    this.cardTransform.set(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  }

  onMouseLeave(): void {
    this.cardTransform.set('rotateX(0deg) rotateY(0deg)');
  }
}