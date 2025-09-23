import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';

interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  iconSvgPath: string;
}

@Component({
  selector: 'app-process-section',
  standalone: true,
  imports: [
    CommonModule,
    AnimateOnScrollDirective,
    ShimmerTextDirective,
  ],
  templateUrl: './process-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessSectionComponent {
  steps: ProcessStep[] = [
    {
      id: 'discovery',
      number: '01',
      title: 'Descoberta & Estratégia',
      description: 'Através de uma imersão profunda, estabeleço os princípios fundamentais do projeto. Defino os vetores de sucesso e construo um roteiro estratégico que servirá de alicerce para toda a execução.',
      iconSvgPath: 'M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a7.5 7.5 0 0 1-7.5 0c1.433-2.124 2.867-4.247 4.3-6.37 1.433-2.123 2.867-4.247 4.3-6.37a7.5 7.5 0 0 1 7.5 0',
    },
    {
      id: 'design',
      number: '02',
      title: 'Design & Prototipagem',
      description: 'Desenvolvo sistemas de design que são a manifestação visual da estratégia. Crio protótipos de alta fidelidade que validam os princípios da experiência do usuário antes de uma única linha de código ser escrita.',
      iconSvgPath: 'M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0-2.25l2.25 1.313M9 15l2.25-1.313M9 15l2.25 1.313M9 15v-2.25m-6 4.5l2.25-1.313M3 17.25l2.25 1.313M3 17.25v-2.25m15-3l2.25-1.313M18 14.25l2.25 1.313M18 14.25v-2.25m3-3l2.25-1.313M21 9.75l2.25 1.313M21 9.75v-2.25',
    },
    {
      id: 'engineering',
      number: '03',
      title: 'Engenharia de Precisão',
      description: 'Com uma abordagem fundamentalista à engenharia de software, construo arquiteturas robustas e escrevo código que é, por princípio, limpo, testável e de altíssimo calibre.',
      iconSvgPath: 'M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z',
    },
    {
      id: 'qa',
      number: '04',
      title: 'Validação & Qualidade Fundamental',
      description: 'Meu processo de validação é intransigente. Implemento múltiplos níveis de testes para garantir que o produto final não seja apenas funcional, mas fundamentalmente seguro, performático e livre de falhas.',
      iconSvgPath: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.42-.38-2.754-1.025-3.998A11.959 11.959 0 0112 2.75c-1.12 0-2.207.146-3.25.414z',
    },
    {
      id: 'deploy',
      number: '05',
      title: 'Entrega & Evolução Contínua',
      description: 'Realizo a entrega em infraestrutura de classe mundial, monitorando a performance obsessivamente. O lançamento não é o fim, mas o início de um ciclo de evolução contínua, guiado por dados e princípios.',
      iconSvgPath: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a6 6 0 016.38 8.48l-10.9-10.9a6 6 0 018.48 6.38zM6.28 15.15A6 6 0 0114.37 5.84l-10.9 10.9a6 6 0 01-2.56-5.84z',
    },
  ];
}