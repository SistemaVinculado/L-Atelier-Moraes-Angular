import { Component, ChangeDetectionStrategy, inject, signal, OnInit, OnDestroy, effect, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CaseStudyService } from '../../services/case-study.service';
import { CaseStudy } from '../../models/case-study.model';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';
import { ImagePlaceholderComponent } from '../../components/image-placeholder/image-placeholder.component';

@Component({
  selector: 'app-case-study-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AnimateOnScrollDirective,
    ShimmerTextDirective,
    ImagePlaceholderComponent,
  ],
  templateUrl: './case-study-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseStudyDetailComponent implements OnInit, OnDestroy {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  private readonly caseStudyService = inject(CaseStudyService);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  
  readonly caseStudy = signal<CaseStudy | null>(null);

  private readonly defaultTitle = 'BB Agency Clone';
  private readonly defaultDescription = 'A minimalist and elegant digital agency website clone, inspired by bb.agency, built with Angular and styled with Tailwind CSS.';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    effect(() => {
      // Scroll to top when case study data changes
      if (this.caseStudy() && isPlatformBrowser(this.platformId)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        const study = this.caseStudyService.getCaseStudyBySlug(slug);
        if (study) {
          this.caseStudy.set(study);

          // Set dynamic SEO tags based on the case study content
          this.titleService.setTitle(`${study.title}: ${study.description} | ${this.defaultTitle}`);
          this.metaService.updateTag({ name: 'description', content: study.challenge });

        } else {
          this.router.navigate(['/case-studies']);
        }
      }
    });
  }

  ngOnDestroy(): void {
    // Reset SEO tags to default when leaving the page
    this.titleService.setTitle(this.defaultTitle);
    this.metaService.updateTag({ name: 'description', content: this.defaultDescription });
  }
}