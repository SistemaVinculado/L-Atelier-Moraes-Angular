import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ScrollService } from '../../services/scroll.service';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';

interface Service {
  name: string;
  description: string;
  imageUrl: string;
  iconSvg: SafeHtml;
  themeColor: string;
  details: string;
  benefits: string[];
  techStack: string[];
}

@Component({
  selector: 'app-services-section',
  templateUrl: './services-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnimateOnScrollDirective, ShimmerTextDirective, CommonModule],
})
export class ServicesSectionComponent {
  private readonly scrollService = inject(ScrollService);
  private readonly sanitizer = inject(DomSanitizer);

  hoveredService = signal<string | null>(null);
  selectedService = signal<string | null>(null);
  services: Service[];

  readonly imageForService = computed(() => {
    return this.hoveredService() ?? this.selectedService();
  });

  constructor() {
    const rawServices = [
      {
        name: 'Estratégia e Identidade de Marca',
        description: 'Posicionamento de marca, naming, identidade visual completa.',
        imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=1200&fit=crop',
        iconSvgPath: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a7.5 7.5 0 0 1-7.5 0c1.433-2.124 2.867-4.247 4.3-6.37 1.433-2.123 2.867-4.247 4.3-6.37a7.5 7.5 0 0 1 7.5 0" />`,
        themeColor: '#22C55E', // green-500
        details: 'Meu processo de estratégia e identidade de marca é uma imersão profunda nos princípios do seu negócio. O objetivo é arquitetar uma marca que não seja apenas esteticamente agradável, mas fundamentalmente ressonante com seu público e alinhada aos seus objetivos de longo prazo.',
        benefits: ['Posicionamento de mercado claro e de prestígio.', 'Consistência de marca em todos os pontos de contato.', 'Aumento do reconhecimento e lealdade à marca.'],
        techStack: ['Pesquisa de Mercado', 'Arquitetura de Marca', 'Figma', 'Adobe Suite']
      },
      {
        name: 'Design de Experiência Web',
        description: 'Websites, plataformas e e-commerce com foco em UX/UI.',
        imageUrl: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=1200&fit=crop',
        iconSvgPath: `<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.037-.502.068-.75.097h-1.5c-.248-.029-.499-.06-.75-.097M9.75 3.104c.251.037.502.068.75.097m-1.5-.097c-.248-.029-.499-.06-.75-.097m1.5.097c.248.029.499.06.75.097M7.5 14.25l-2.25-2.25a2.25 2.25 0 0 0-3.182 0l-2.25 2.25a2.25 2.25 0 0 0 0 3.182l2.25 2.25a2.25 2.25 0 0 0 3.182 0l2.25-2.25a2.25 2.25 0 0 0 0-3.182Z" />`,
        themeColor: '#16A34A', // green-600
        details: 'Arquitetura de websites e plataformas que são fundamentalmente intuitivos e eficazes. Cada jornada do usuário é meticulosamente planejada para guiar, engajar e converter, transformando visitantes em defensores da marca.',
        benefits: ['Aumento da taxa de conversão e retenção.', 'Melhora na satisfação e usabilidade do usuário.', 'Fortalecimento da percepção da marca.'],
        techStack: ['Figma', 'Miro', 'Testes de Usabilidade', 'Análise de Dados']
      },
      {
        name: 'Design de Interface e Experiência do Usuário',
        description: 'Pesquisa, testes de usabilidade, prototipagem interativa.',
        imageUrl: 'https://images.unsplash.com/photo-1504624720137-3233c858a363?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=1200&fit=crop',
        iconSvgPath: `<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />`,
        themeColor: '#10B981', // emerald-500
        details: 'Criação de interfaces que são a manifestação visual da estratégia da marca. Foco em estética de prestígio, microinterações significativas e um sistema de design coeso que garante uma experiência de usuário impecável em qualquer dispositivo.',
        benefits: ['Interface visualmente impactante e moderna.', 'Experiência de usuário consistente e memorável.', 'Processo de design escalável e eficiente.'],
        techStack: ['Figma (Auto Layout, Variants)', 'Design Systems', 'Prototipagem de Alta Fidelidade', 'Acessibilidade (WCAG)']
      },
      {
        name: 'Desenvolvimento Webflow Avançado',
        description: 'CMS, integrações complexas e animações de ponta.',
        imageUrl: 'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=1200&fit=crop',
        iconSvgPath: `<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />`,
        themeColor: '#059669', // emerald-600
        details: 'Implementação de designs complexos no Webflow com um foco fundamentalista em performance, acessibilidade e animações de alta qualidade. Construo sites que não são apenas visualmente impressionantes, mas também perfeitamente gerenciáveis pela sua equipe.',
        benefits: ['Lançamento rápido de sites de marketing.', 'Animações ricas e interativas sem sacrificar a performance.', 'Autonomia para equipes de conteúdo com um CMS poderoso.'],
        techStack: ['Webflow', 'GSAP (GreenSock)', 'Javascript Personalizado', 'Integrações de API']
      },
      {
        name: 'Design de Produtos Digitais (SaaS & Apps)',
        description: 'Soluções para SaaS, aplicativos móveis e plataformas.',
        imageUrl: 'https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=1200&fit=crop',
        iconSvgPath: `<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />`,
        themeColor: '#14B8A6', // teal-500
        details: 'Desde a concepção até o lançamento, eu arquiteturo produtos digitais que resolvem problemas fundamentais de forma elegante. Meu processo é centrado no usuário, validado por dados e focado em criar soluções que seus clientes amarão e usarão repetidamente.',
        benefits: ['Produto alinhado às necessidades do mercado.', 'Ciclos de desenvolvimento mais rápidos com prototipagem.', 'Maior engajamento e retenção de usuários.'],
        techStack: ['Design de Produto', 'Pesquisa de Usuário', 'Product Roadmapping', 'Análise de Cohort']
      },
      {
        name: 'Arquitetura de Sistemas de Design',
        description: 'Criação de bibliotecas de componentes escaláveis em Figma.',
        imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=1200&fit=crop',
        iconSvgPath: `<path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0-2.25l2.25 1.313M9 15l2.25-1.313M9 15l2.25 1.313M9 15v-2.25m-6 4.5l2.25-1.313M3 17.25l2.25 1.313M3 17.25v-2.25m15-3l2.25-1.313M18 14.25l2.25 1.313M18 14.25v-2.25m3-3l2.25-1.313M21 9.75l2.25 1.313M21 9.75v-2.25" />`,
        themeColor: '#0D9488', // teal-600
        details: 'Construo a fundação para a consistência e escalabilidade do seu design. Crio sistemas de design abrangentes em Figma que servem como a única fonte de verdade para equipes de design e engenharia, acelerando o desenvolvimento e garantindo a coesão da marca.',
        benefits: ['Consistência de marca em todos os produtos.', 'Aceleração do processo de design e desenvolvimento.', 'Colaboração aprimorada entre equipes.'],
        techStack: ['Figma (Tokens, Variants)', 'Storybook', 'Documentação de Componentes', 'Governança de Design']
      },
    ];

    this.services = rawServices.map((service) => ({
      ...service,
      iconSvg: this.sanitizer.bypassSecurityTrustHtml(service.iconSvgPath),
    }));
  }

  onServiceMouseEnter(serviceName: string): void {
    this.hoveredService.set(serviceName);
  }

  onServiceMouseLeave(): void {
    this.hoveredService.set(null);
  }

  toggleService(serviceName: string): void {
    this.selectedService.update(current => (current === serviceName ? null : serviceName));
  }

  scrollToQuoteBuilder(): void {
    this.scrollService.scrollToElementById('quote-builder');
  }
}
