import { Directive, OnInit, Renderer2, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appAdvancedHighlight]'
})
export class AdvancedHightlightDirective implements OnInit {

  // setting an alias for directive
  @Input('appAdvancedHighlight') defaultBGColor = 'pink';
  @Input() defaultTextColor = 'black';
  @Input() highlightBGColor = 'blue';
  @Input() highlightTextColor = 'white';

  @HostBinding('style.backgroundColor') backgroundColor: string;
  @HostBinding('style.color') textColor: string;

  constructor( private elRef: ElementRef , private renderer: Renderer2 ){}
  ngOnInit(){
    // better to use Renderer2 for dom access
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'pink');
    // this.renderer.setStyle(this.elRef.nativeElement, 'color', 'black');
    this.backgroundColor = this.defaultBGColor;
    this.textColor = this.defaultTextColor;
  }

  @HostListener('mouseenter') mouseOver(){
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    // this.renderer.setStyle(this.elRef.nativeElement, 'color', 'white');
    this.backgroundColor = this.highlightBGColor;
    this.textColor = this.highlightTextColor;
  }

  @HostListener('mouseleave') mouseLeave(){
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'pink');
    // this.renderer.setStyle(this.elRef.nativeElement, 'color', 'black');
    this.backgroundColor = this.defaultBGColor;
    this.textColor = this.defaultTextColor;
  }
}
