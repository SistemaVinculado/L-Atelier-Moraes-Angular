import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AiBriefModalComponent } from './components/ai-brief-modal/ai-brief-modal.component';
import { ModalService } from './services/modal.service';
import { CustomCursorComponent } from './components/custom-cursor/custom-cursor.component';
import { MouseFollowerComponent } from './components/mouse-follower/mouse-follower.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    :host {
      display: block;
      animation: app-fade-in 0.5s ease-out 100ms both;
    }

    @keyframes app-fade-in {
      from { 
        opacity: 0; 
      }
      to { 
        opacity: 1; 
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    AiBriefModalComponent,
    CustomCursorComponent,
    MouseFollowerComponent,
  ],
})
export class AppComponent {
  readonly modalService = inject(ModalService);
}