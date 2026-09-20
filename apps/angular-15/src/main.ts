import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'formation-root',
  standalone: true,
  template: '<p>Les exercices Angular 15 sont disponibles dans Storybook.</p>',
})
class AppComponent {}
bootstrapApplication(AppComponent).catch(console.error);
