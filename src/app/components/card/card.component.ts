import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Card } from 'src/app/shared/models/card.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {

  @Input()
  card: Card;

  constructor(private matIconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    // this.matIconRegistry.addSvgIcon(
    //   'thumbsUp', sanitizer.bypassSecurityTrustHtml(thumbsUp));
    // )
  }

  ngOnInit(): void {}

}
