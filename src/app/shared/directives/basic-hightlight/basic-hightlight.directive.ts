import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHightlightDirective implements OnInit {

  constructor( private elementRef: ElementRef ){}
  ngOnInit(){
    // might not has access to dom yet
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}
