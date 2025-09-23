import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';

@Component({
  selector: 'app-awards-section',
  templateUrl: './awards-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnimateOnScrollDirective, ShimmerTextDirective],
})
export class AwardsSectionComponent {
  awards = [
    { name: 'Awwwards', count: 'x12' },
    { name: 'The FWA', count: 'x8' },
    { name: 'CSS Design Awards', count: 'x15' },
    { name: 'Webby Awards', count: 'x3' },
  ];
}