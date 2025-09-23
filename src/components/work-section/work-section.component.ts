import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';
import { CommonModule } from '@angular/common';

interface Tech {
  name: string;
  isPrimary?: boolean;
}

interface TechCategory {
  name: string;
  technologies: Tech[];
}

@Component({
  selector: 'app-work-section',
  templateUrl: './work-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AnimateOnScrollDirective,
    ShimmerTextDirective,
    CommonModule,
  ],
})
export class WorkSectionComponent {
  techCategories: TechCategory[] = [
    {
      name: 'Frontend',
      technologies: [
        { name: 'Angular', isPrimary: true },
        { name: 'React', isPrimary: true },
        { name: 'TypeScript', isPrimary: true },
        { name: 'RxJS' },
        { name: 'Tailwind CSS' },
        { name: 'WebGL' },
        { name: 'Vite' },
        { name: 'Nx' },
      ],
    },
    {
      name: 'Backend',
      technologies: [
        { name: 'Node.js', isPrimary: true },
        { name: 'NestJS', isPrimary: true },
        { name: 'Go' },
        { name: 'Python' },
        { name: 'GraphQL' },
        { name: 'PostgreSQL' },
        { name: 'MongoDB' },
        { name: 'Redis' },
      ],
    },
    {
      name: 'DevOps & Cloud',
      technologies: [
        { name: 'Docker', isPrimary: true },
        { name: 'Kubernetes' },
        { name: 'GitHub Actions', isPrimary: true },
        { name: 'AWS' },
        { name: 'Google Cloud' },
        { name: 'Vercel' },
        { name: 'Terraform' },
      ],
    },
    {
      name: 'Data & AI',
      technologies: [
        { name: 'TensorFlow' },
        { name: 'PyTorch' },
        { name: 'OpenAI API', isPrimary: true },
        { name: 'LangChain' },
        { name: 'D3.js' },
        { name: 'Grafana' },
        { name: 'BigQuery' },
      ],
    },
  ];
}
