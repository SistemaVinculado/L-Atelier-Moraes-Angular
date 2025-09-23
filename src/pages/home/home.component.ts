import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ClientsComponent } from '../../components/clients/clients.component';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';
import { WorkSectionComponent } from '../../components/work-section/work-section.component';
import { TestimonialSectionComponent } from '../../components/testimonial-section/testimonial-section.component';
import { AwardsSectionComponent } from '../../components/awards-section/awards-section.component';
import { CtaSectionComponent } from '../../components/cta-section/cta-section.component';
import { AvailabilitySectionComponent } from '../../components/availability-section/availability-section.component';
import { AboutSectionComponent } from '../../components/about-section/about-section.component';
import { ImpactSectionComponent } from '../../components/impact-section/impact-section.component';
import { QuoteBuilderComponent } from '../../components/quote-builder/quote-builder.component';
import { ProcessSectionComponent } from '../../components/process-section/process-section.component';
import { PrinciplesSectionComponent } from '../../components/principles-section/principles-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroComponent,
    ClientsComponent,
    ServicesSectionComponent,
    ProcessSectionComponent,
    AboutSectionComponent,
    PrinciplesSectionComponent,
    WorkSectionComponent,
    TestimonialSectionComponent,
    AwardsSectionComponent,
    ImpactSectionComponent,
    AvailabilitySectionComponent,
    QuoteBuilderComponent,
    CtaSectionComponent,
  ],
})
export class HomeComponent {}
