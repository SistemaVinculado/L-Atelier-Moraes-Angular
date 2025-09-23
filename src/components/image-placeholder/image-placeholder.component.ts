import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-image-placeholder',
  standalone: true,
  template: `
    <div
      class="w-full h-full bg-charcoal-light border border-gray-800 rounded-lg flex flex-col items-center justify-center text-center p-4 relative overflow-hidden group-hover:scale-105 transition-transform duration-500 ease-in-out"
      [style.aspect-ratio]="width() + '/' + height()">
      <div class="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.02)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.02)_50%,rgba(255,255,255,0.02)_75%,transparent_75%,transparent)] bg-[length:40px_40px]"></div>
      <div class="relative z-10">
        <svg class="w-12 h-12 mx-auto text-gray-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        <p class="text-sm font-semibold text-gray-400">Em Desenvolvimento</p>
        <p class="text-xs text-gray-600 mt-1">{{ width() }} x {{ height() }}</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagePlaceholderComponent {
  width = input.required<number>();
  height = input.required<number>();
}
