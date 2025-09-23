import { Component, ChangeDetectionStrategy, inject, signal, computed, viewChild, ElementRef, effect, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';
import { ModalService } from '../../services/modal.service';

interface TechFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  iconSvg: SafeHtml;
}

type TechStack = 'angular' | 'react' | 'backend';

@Component({
  selector: 'app-quote-builder',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective, ShimmerTextDirective],
  templateUrl: './quote-builder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteBuilderComponent {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly modalService = inject(ModalService);

  activeTab = signal<TechStack>('angular');
  selectedFeatures = signal<Set<string>>(new Set());
  targetBudget = signal(15000);

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

  allFeatures: Record<TechStack, TechFeature[]>;

  activeFeatures = computed(() => this.allFeatures[this.activeTab()]);

  totalCost = computed(() => {
    const selectedIds = this.selectedFeatures();
    return this.activeFeatures()
      .filter(f => selectedIds.has(f.id))
      .reduce((sum, f) => sum + f.price, 0);
  });

  budgetDifference = computed(() => this.targetBudget() - this.totalCost());
  
  absBudgetDifference = computed(() => Math.abs(this.budgetDifference()));

  constructor() {
    this.allFeatures = {
      angular: this.mapRawFeatures([
        { id: 'angular-landing', name: 'Landing Page de Alta Conversão', description: 'Página de destino otimizada para performance e conversão.', price: 5000, icon: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z' },
        { id: 'angular-smb', name: 'Site para Pequenas Empresas (5 Pág.)', description: 'Solução completa com múltiplas páginas e design personalizado.', price: 12000, icon: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m-1.125 0H5.625A2.25 2.25 0 0 0 3.375 6v12a2.25 2.25 0 0 0 2.25 2.25h12.75A2.25 2.25 0 0 0 20.625 18V6a2.25 2.25 0 0 0-2.25-2.25H15M12 9l3 3m0 0l3-3m-3 3v.028' },
        { id: 'angular-spa', name: 'Aplicação Web Corporativa (SPA)', description: 'Aplicações de página única de larga escala e alto desempenho.', price: 50000, icon: 'M2.25 7.125A3.375 3.375 0 0 1 5.625 3.75h12.75c1.86 0 3.375 1.515 3.375 3.375v9.75c0 1.86-1.515 3.375-3.375 3.375H5.625a3.375 3.375 0 0 1-3.375-3.375V7.125ZM12 15.75v-1.5' },
        { id: 'angular-ecom', name: 'Loja E-commerce', description: 'Soluções de e-commerce personalizadas e integradas.', price: 40000, icon: 'M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .962-.328 1.102-.823l1.823-6.874a.675.675 0 0 0-.64-1.028H6.097M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' },
      ]),
      react: this.mapRawFeatures([
        { id: 'react-landing', name: 'Landing Page com Next.js', description: 'Páginas otimizadas para SEO com renderização no servidor (SSR).', price: 6000, icon: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z' },
        { id: 'react-cms', name: 'Site Institucional com Headless CMS', description: 'Sites flexíveis com React e um CMS desacoplado.', price: 15000, icon: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m-1.125 0H5.625A2.25 2.25 0 0 0 3.375 6v12a2.25 2.25 0 0 0 2.25 2.25h12.75A2.25 2.25 0 0 0 20.625 18V6a2.25 2.25 0 0 0-2.25-2.25H15M12 9l3 3m0 0l3-3m-3 3v.028' },
        { id: 'react-platform', name: 'Plataforma Web com Next.js', description: 'Aplicações completas, rápidas e amigáveis para SEO.', price: 55000, icon: 'M2.25 7.125A3.375 3.375 0 0 1 5.625 3.75h12.75c1.86 0 3.375 1.515 3.375 3.375v9.75c0 1.86-1.515 3.375-3.375 3.375H5.625a3.375 3.375 0 0 1-3.375-3.375V7.125ZM12 15.75v-1.5' },
        { id: 'react-ecom', name: 'E-commerce Headless', description: 'Frontend de e-commerce ágil e personalizável com React.', price: 50000, icon: 'M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .962-.328 1.102-.823l1.823-6.874a.675.675 0 0 0-.64-1.028H6.097M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' },
      ]),
      backend: this.mapRawFeatures([
        { id: 'backend-api', name: 'API RESTful com NestJS', description: 'Arquitetura de backend robusta, escalável e modular.', price: 30000, icon: 'M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z' },
        { id: 'backend-realtime', name: 'Aplicações em Tempo Real', description: 'Funcionalidades de chat, notificações e dashboards ao vivo.', price: 25000, icon: 'M15.042 21.672L13.684 16.6m0 0l-2.51-2.222m5.864 4.444l.487-2.612a4.5 4.5 0 0 0-3.49-4.562l-2.512-2.223M15.042 21.672L13.684 16.6m0 0l-2.51 2.222m5.864-4.444l.487 2.612a4.5 4.5 0 0 1-3.49 4.562l-2.512 2.223M15.042 21.672L13.684 16.6' },
        { id: 'backend-micro', name: 'Microsserviços com Node.js', description: 'Arquitetura distribuída para sistemas complexos.', price: 70000, icon: 'M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0-2.25l2.25 1.313M9 15l2.25-1.313M9 15l2.25 1.313M9 15v-2.25' },
        { id: 'backend-db', name: 'Bancos de Dados e ORMs', description: 'Modelagem, otimização e integração de bancos de dados.', price: 15000, icon: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375' },
      ]),
    };

    afterNextRender(() => {
      this.updateHighlight(this.activeTab());
    });

    effect(() => {
        this.updateHighlight(this.activeTab());
    });
  }

  private mapRawFeatures(raw: {id: string, name: string, description: string, price: number, icon: string}[]): TechFeature[] {
    return raw.map(f => ({
      id: f.id,
      name: f.name,
      description: f.description,
      price: f.price,
      iconSvg: this.sanitizer.bypassSecurityTrustHtml(`<path stroke-linecap="round" stroke-linejoin="round" d="${f.icon}" />`),
    })).sort((a,b) => a.price - b.price);
  }

  setActiveTab(tab: TechStack): void {
    this.activeTab.set(tab);
    this.selectedFeatures.set(new Set()); // Reset selections when tab changes
  }

  private updateHighlight(tab: TechStack): void {
    let activeBtnElRef: ElementRef<HTMLButtonElement> | undefined;

    switch (tab) {
        case 'angular': activeBtnElRef = this.angularBtn(); break;
        case 'react': activeBtnElRef = this.reactBtn(); break;
        case 'backend': activeBtnElRef = this.backendBtn(); break;
    }

    if (activeBtnElRef) {
        const el = activeBtnElRef.nativeElement;
        this.highlightWidth.set(el.offsetWidth);
        this.highlightTransform.set(`translateX(${el.offsetLeft}px)`);
    }
  }

  toggleFeature(featureId: string): void {
    this.selectedFeatures.update(currentSet => {
      const newSet = new Set(currentSet);
      if (newSet.has(featureId)) {
        newSet.delete(featureId);
      } else {
        newSet.add(featureId);
      }
      return newSet;
    });
  }

  onBudgetChange(event: Event): void {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.targetBudget.set(value);
  }

  generateBriefPrompt(): void {
    const selectedIds = this.selectedFeatures();
    const selected = this.activeFeatures().filter(f => selectedIds.has(f.id));
    
    const techName = this.activeTab().charAt(0).toUpperCase() + this.activeTab().slice(1);
    
    if (selected.length === 0) {
      this.modalService.openAiBriefModal(`Estou interessado em um projeto com a tecnologia ${techName}, mas ainda não selecionei funcionalidades. Meu orçamento alvo é de R$${this.targetBudget().toLocaleString('pt-BR')}.`);
      return;
    }

    const featureNames = selected.map(f => f.name).join(', ');
    const prompt = `Gostaria de solicitar um orçamento para um projeto ${techName} com as seguintes funcionalidades: ${featureNames}. O custo estimado é de R$${this.totalCost().toLocaleString('pt-BR')} e meu orçamento alvo é R$${this.targetBudget().toLocaleString('pt-BR')}.`;
    
    this.modalService.openAiBriefModal(prompt);
  }
}