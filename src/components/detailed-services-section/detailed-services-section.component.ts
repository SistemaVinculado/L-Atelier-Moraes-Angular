import { Component, ChangeDetectionStrategy, signal, inject, computed, viewChild, ElementRef, effect, afterNextRender } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ModalService, ServiceOffering } from '../../services/modal.service';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';

@Component({
  selector: 'app-detailed-services-section',
  standalone: true,
  imports: [AnimateOnScrollDirective, ShimmerTextDirective],
  templateUrl: './detailed-services-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedServicesSectionComponent {
  private readonly modalService = inject(ModalService);
  
  activeTab = signal<'angular' | 'react' | 'backend'>('angular');
  selectedService = signal<string | null>(null);

  private readonly angularBtn = viewChild.required<ElementRef<HTMLButtonElement>>('angularBtn');
  private readonly reactBtn = viewChild.required<ElementRef<HTMLButtonElement>>('reactBtn');
  private readonly backendBtn = viewChild.required<ElementRef<HTMLButtonElement>>('backendBtn');

  private readonly highlightWidth = signal(0);
  private readonly highlightTransform = signal('translateX(0px)');

  readonly activeGlowColor = computed(() => {
    switch (this.activeTab()) {
      case 'angular': return '#ef4444'; // red-500
      case 'react': return '#3b82f6'; // blue-500
      case 'backend': return '#a855f7'; // purple-500
      default: return '#6b7280'; // gray-500
    }
  });

  readonly highlightStyle = computed(() => ({
    width: `${this.highlightWidth()}px`,
    transform: this.highlightTransform(),
    'box-shadow': `0 0 15px 2px ${this.activeGlowColor()}`
  }));


  angularServices: ServiceOffering[] = [
    {
      name: 'Landing Page de Alta Conversão',
      description: 'Páginas de destino otimizadas para performance e conversão.',
      price: 'A partir de R$ 5.000',
      details: 'O preço varia com a complexidade das animações e integrações.',
      isHighlighted: true,
      badge: 'Mais Popular',
      benefits: ['Experiência de usuário fluida', 'Performance otimizada para SEO', 'Maior captura de leads'],
      techStack: ['Angular', 'TypeScript', 'SCSS', 'RxJS'],
      scope: ['Design responsivo', 'Formulários de contato integrados', 'Testes de performance'],
      quotePrompt: 'Gostaria de solicitar um orçamento para uma Landing Page de Alta Conversão em Angular. Meu objetivo principal é...',
    },
    {
      name: 'Site para Pequenas Empresas',
      description: 'Solução completa com múltiplas páginas, CMS e design personalizado.',
      price: 'R$ 12.000 - R$ 30.000',
      details: 'Inclui páginas como Home, Sobre, Serviços e Contato.',
      benefits: ['Presença online profissional', 'Gerenciamento de conteúdo simplificado'],
      techStack: ['Angular', 'TypeScript', 'Headless CMS (ex: Strapi)'],
      scope: ['Design personalizado', 'Sistema de gerenciamento de conteúdo (CMS)', 'Otimização para motores de busca'],
      quotePrompt: 'Estou interessado em um orçamento para um site para minha pequena empresa, desenvolvido em Angular. As seções que eu preciso são...',
    },
    {
      name: 'Aplicação Web Corporativa (SPA)',
      description: 'Aplicações de página única (SPA) de larga escala e alto desempenho.',
      price: 'A partir de R$ 50.000',
      details: 'Ideal para painéis de controle, plataformas SaaS e sistemas internos.',
      benefits: ['Arquitetura robusta e segura', 'Escalável para demandas corporativas'],
      techStack: ['Angular', 'NgRx/Signals', 'Testes Unitários/Integração'],
      scope: ['Lógica de negócios complexa', 'Autenticação de usuários', 'Integração com APIs', 'Painéis de administração'],
      quotePrompt: 'Preciso de um orçamento para uma aplicação web corporativa (SPA) em Angular. A aplicação servirá para...',
    },
    {
      name: 'Loja E-commerce',
      description: 'Soluções de e-commerce personalizadas e integradas.',
      price: 'A partir de R$ 40.000',
      details: 'Depende do número de produtos, integrações e funcionalidades.',
      benefits: ['Experiência de compra otimizada', 'Integração com sistemas de pagamento'],
      techStack: ['Angular', 'Gateways de Pagamento (Stripe, PagSeguro)'],
      scope: ['Catálogo de produtos', 'Carrinho de compras', 'Checkout seguro', 'Painel de gerenciamento'],
      quotePrompt: 'Gostaria de um orçamento para uma loja e-commerce em Angular. Pretendo vender...',
    },
  ];

  reactServices: ServiceOffering[] = [
    {
      name: 'Landing Page com Next.js',
      description: 'Páginas otimizadas para SEO e performance com renderização no servidor (SSR).',
      price: 'A partir de R$ 6.000',
      details: 'O preço varia com a necessidade de SSR/SSG e design interativo.',
      isHighlighted: true,
      badge: 'Alta Performance',
      benefits: ['Excelente performance e SEO', 'Indexação otimizada', 'Alta taxa de conversão'],
      techStack: ['React', 'Next.js', 'TypeScript', 'Vercel'],
      scope: ['Renderização no servidor (SSR/SSG)', 'Design responsivo', 'Otimizações de Core Web Vitals'],
      quotePrompt: 'Gostaria de solicitar um orçamento para uma Landing Page de Alta Performance com Next.js. Meu objetivo é...',
    },
    {
      name: 'Site Institucional com Headless CMS',
      description: 'Sites flexíveis e modernos com React e um CMS desacoplado.',
      price: 'R$ 15.000 - R$ 35.000',
      details: 'Integração com CMS como Strapi, Contentful ou Sanity.',
      benefits: ['Flexibilidade para editores', 'Experiência de usuário rica e interativa'],
      techStack: ['React/Next.js', 'Headless CMS (Strapi, Contentful)'],
      scope: ['Frontend desacoplado', 'Treinamento para a equipe de conteúdo', 'Build otimizado'],
      quotePrompt: 'Estou interessado em um orçamento para um site institucional com React e um Headless CMS. As principais funcionalidades são...',
    },
    {
      name: 'Plataforma Web com Next.js',
      description: 'Aplicações web completas, rápidas e amigáveis para SEO.',
      price: 'A partir de R$ 55.000',
      details: 'Ideal para portais de conteúdo e aplicações com renderização híbrida.',
      benefits: ['Performance excepcional', 'Ótima DX', 'Flexibilidade de renderização'],
      techStack: ['React', 'Next.js', 'TypeScript', 'SWR/React Query'],
      scope: ['Arquitetura de renderização híbrida', 'Autenticação (NextAuth)', 'Integração com APIs'],
      quotePrompt: 'Preciso de um orçamento para uma plataforma web com Next.js. O conceito principal da plataforma é...',
    },
    {
      name: 'E-commerce Headless',
      description: 'Frontend de e-commerce ágil e personalizável com React.',
      price: 'A partir de R$ 50.000',
      details: 'Integração com plataformas como Shopify.',
      benefits: ['Total liberdade criativa', 'Performance superior a temas tradicionais', 'Otimização para conversão'],
      techStack: ['React/Next.js', 'Shopify Storefront API'],
      scope: ['Frontend desacoplado', 'Design system personalizado', 'Otimizações de performance'],
      quotePrompt: 'Gostaria de um orçamento para um e-commerce headless com React. A plataforma de backend que usamos é...',
    }
  ];

  backendServices: ServiceOffering[] = [
    {
      name: 'API RESTful com NestJS',
      description: 'Arquitetura de backend robusta, escalável e modular.',
      price: 'A partir de R$ 30.000',
      details: 'Ideal para aplicações que necessitam de uma base sólida e organizada.',
      isHighlighted: true,
      badge: 'Escalável',
      benefits: ['Código organizado', 'Alta testabilidade', 'Arquitetura escalável'],
      techStack: ['NestJS', 'TypeScript', 'TypeORM/Prisma', 'PostgreSQL/MongoDB'],
      scope: ['Definição de endpoints', 'Autenticação JWT', 'Documentação de API (Swagger)', 'Integração com banco de dados'],
      quotePrompt: 'Preciso de um orçamento para uma API RESTful com NestJS para o meu projeto, que envolve...',
    },
    {
      name: 'Aplicações em Tempo Real (WebSockets)',
      description: 'Funcionalidades de chat, notificações e dashboards ao vivo.',
      price: 'A partir de R$ 25.000',
      details: 'O preço varia com a complexidade da comunicação bidirecional.',
      benefits: ['Experiência de usuário dinâmica', 'Comunicação instantânea'],
      techStack: ['WebSockets', 'Socket.IO', 'NestJS Gateways'],
      scope: ['Configuração de servidores', 'Gerenciamento de salas (rooms)', 'Broadcasting de eventos', 'Autenticação'],
      quotePrompt: 'Gostaria de um orçamento para adicionar funcionalidades em tempo real (WebSockets) à minha aplicação. A ideia é...',
    },
    {
      name: 'Microsserviços com Node.js',
      description: 'Arquitetura distribuída para sistemas complexos e de alta escalabilidade.',
      price: 'Sob consulta',
      details: 'Preço personalizado com base na complexidade dos serviços.',
      benefits: ['Manutenção simplificada', 'Deploy independente', 'Otimização de recursos'],
      techStack: ['Node.js', 'gRPC/RabbitMQ', 'Docker', 'Kubernetes'],
      scope: ['Design da arquitetura', 'Comunicação entre serviços', 'Service discovery', 'Monitoramento'],
      quotePrompt: 'Estamos avaliando uma arquitetura de microsserviços para nosso sistema e gostaríamos de um orçamento. O sistema precisa...',
    },
    {
      name: 'Bancos de Dados e ORMs',
      description: 'Modelagem, otimização e integração de bancos de dados.',
      price: 'A partir de R$ 15.000',
      details: 'Foco em performance e segurança dos dados.',
      benefits: ['Consultas otimizadas', 'Segurança dos dados', 'Modelagem eficiente'],
      techStack: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'TypeORM'],
      scope: ['Design de schema', 'Otimização de queries', 'Configuração de ORM', 'Estratégias de backup'],
      quotePrompt: 'Preciso de ajuda com a arquitetura de banco de dados do meu projeto. Estamos usando...',
    }
  ];

  readonly activeServices = computed(() => {
    switch(this.activeTab()) {
      case 'angular': return this.angularServices;
      case 'react': return this.reactServices;
      case 'backend': return this.backendServices;
    }
  });

  constructor() {
    const sortFn = (a: ServiceOffering, b: ServiceOffering) => this.parsePrice(a.price) - this.parsePrice(b.price);
    this.angularServices.sort(sortFn);
    this.reactServices.sort(sortFn);
    this.backendServices.sort(sortFn);

    afterNextRender(() => {
        this.updateHighlight(this.activeTab());
    });

    effect(() => {
        this.updateHighlight(this.activeTab());
    });
  }

  private parsePrice(price: string): number {
    if (price.toLowerCase() === 'sob consulta') {
      return Infinity;
    }
    // Extracts the first number from strings like "R$ 12.000 - R$ 30.000" or "A partir de R$ 5.000"
    const match = price.match(/(\d{1,3}(?:\.\d{3})*)/);
    if (match) {
      // "12.000" -> "12000" -> 12000
      const numberString = match[0].replace(/\./g, '');
      return parseInt(numberString, 10);
    }
    return 0; // Fallback for unexpected formats
  }

  setActiveTab(tab: 'angular' | 'react' | 'backend'): void {
    this.activeTab.set(tab);
    this.selectedService.set(null);
  }

  private updateHighlight(tab: 'angular' | 'react' | 'backend'): void {
    let activeBtnElRef: ElementRef<HTMLButtonElement> | undefined;

    switch (tab) {
        case 'angular':
            activeBtnElRef = this.angularBtn();
            break;
        case 'react':
            activeBtnElRef = this.reactBtn();
            break;
        case 'backend':
            activeBtnElRef = this.backendBtn();
            break;
    }

    if (activeBtnElRef) {
        const el = activeBtnElRef.nativeElement;
        this.highlightWidth.set(el.offsetWidth);
        this.highlightTransform.set(`translateX(${el.offsetLeft}px)`);
    }
  }

  toggleService(serviceName: string): void {
    this.selectedService.update(current => current === serviceName ? null : serviceName);
  }

  requestQuote(service: ServiceOffering): void {
    this.modalService.requestQuote(service);
  }
}