import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { CtaSectionComponent } from '../../components/cta-section/cta-section.component';
import { GlobalReachComponent } from '../../components/global-reach/global-reach.component';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';
import { ImagePlaceholderComponent } from '../../components/image-placeholder/image-placeholder.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    AnimateOnScrollDirective,
    CtaSectionComponent,
    GlobalReachComponent,
    ShimmerTextDirective,
    ImagePlaceholderComponent
  ],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'Matheus Moraes',
      role: 'Fundador & Desenvolvedor Web',
      description: 'Como um estúdio de um, uno pensamento fundamental com execução de precisão para arquitetar experiências que são, por princípio, estéticas e fundamentalmente eficazes.',
      imageUrl: 'https://picsum.photos/seed/matheus/400/400',
      imageWidth: 400,
      imageHeight: 400,
      social: {
        linkedin: '#',
        github: '#'
      }
    }
  ];
}