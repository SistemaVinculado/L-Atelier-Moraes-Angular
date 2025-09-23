import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderVisibilityService {
  readonly isHeaderForcedHidden = signal(false);
  readonly isFooterVisible = signal(false);

  setHeaderForceHidden(isHidden: boolean): void {
    this.isHeaderForcedHidden.set(isHidden);
  }

  setFooterVisible(isVisible: boolean): void {
    this.isFooterVisible.set(isVisible);
  }
}
