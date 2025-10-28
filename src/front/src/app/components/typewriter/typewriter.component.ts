import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-typewriter',
  standalone: true,
  imports: [],
  templateUrl: './typewriter.component.html',
  styleUrl: './typewriter.component.css'
})
export class TypewriterComponent {
  @Input() text: string = '';
  displayedText: string = '';
  index: number = 0;
  speed: number = 50;

  ngOnInit() {
    this.typeText();
  }

  typeText() {
    if (this.index < this.text.length) {
      this.displayedText += this.text[this.index];
      this.index++;
      setTimeout(() => this.typeText(), this.speed);
    }
  }
}
