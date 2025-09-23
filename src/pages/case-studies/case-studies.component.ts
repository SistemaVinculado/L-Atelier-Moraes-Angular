import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CaseStudyService } from '../../services/case-study.service';
import { CaseStudy } from '../../models/case-study.model';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';
import { ImagePlaceholderComponent } from '../../components/image-placeholder/image-placeholder.component';

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AnimateOnScrollDirective,
    ShimmerTextDirective,
    ImagePlaceholderComponent
  ],
  templateUrl: './case-studies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseStudiesComponent {
  private readonly caseStudyService = inject(CaseStudyService);
  readonly caseStudies: CaseStudy[] = this.caseStudyService.getCaseStudies();
}