import { MatIcon } from '@angular/material/icon';

export interface Card {
  title: string;
  content: Array<string>;
  icon: string;
  detail?: string;
  link?: string;
}
