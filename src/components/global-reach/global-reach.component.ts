import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-global-reach',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  templateUrl: './global-reach.component.html',
  styles: [`
    .pulsing-dot {
      animation: pulse 2.5s infinite cubic-bezier(0.4, 0, 0.6, 1);
    }
    @keyframes pulse {
      0%, 100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.5);
      }
      50% {
        transform: scale(1);
        box-shadow: 0 0 0 12px rgba(255, 255, 255, 0);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalReachComponent {
  stats = [
    { value: '150+', label: 'Projetos de Sucesso' },
    { value: '25+', label: 'Mercados Globais' },
    { value: '10 anos', label: 'Na Vanguarda Digital' },
    { value: '99%', label: 'Índice de Parceria' }
  ];
}