import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewChecked,
  OnDestroy
} from '@angular/core';

// tslint:disable-next-line: no-conflicting-lifecycle
@Component({
  selector: 'app-life-cycle',
  template: `
    <h1 class="game_title">Tic Tac Toe</h1>
    <div class="status">STATUS : {{!isGameOver ? isPlayerOneMove ? "Player One's Move" : "Player Two's Move" : "GAME OVER...  "}}</div>
    <hr />
    <button (click)="resetGame()">Reset</button>
    <div class="game_field">
      <div class="row" *ngFor="let row of [1, 2, 3]">
        <button *ngFor="let col of [1, 2, 3]" class="square" data-points="0"></button>
      </div>
    </div>
    <h2>{{message}}</h2>
  `,
  styleUrls: ['./life-cycle.component.sass']
})
export class LifeCycleComponent implements
  OnChanges, OnInit, AfterViewInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewChecked, OnDestroy {

  isPlayerOneMove: boolean;
  playerOneSelected = [];
  playerTwoSelected = [];
  message = '';
  totalFilledBlock = 0;
  arr = Array.from(Array(3), () => new Array(3));
  isGameOver = false;

  initArry() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.arr[i][j] = 0;
      }
    }
  }

  modifyPoints(index: number, bt: Element) {
    switch (index) {
      case 0:
        this.arr[0][0] = +bt.getAttribute('data-points');

        break;
      case 1:
        this.arr[0][1] = +bt.getAttribute('data-points');
        break;
      case 2:
        this.arr[0][2] = +bt.getAttribute('data-points');
        break;
      case 3:
        this.arr[1][0] = +bt.getAttribute('data-points');
        break;
      case 4:
        this.arr[1][1] = +bt.getAttribute('data-points');
        break;
      case 5:
        this.arr[1][2] = +bt.getAttribute('data-points');
        break;
      case 6:
        this.arr[2][0] = +bt.getAttribute('data-points');
        break;
      case 7:
        this.arr[2][1] = +bt.getAttribute('data-points');
        break;
      case 8:
        this.arr[2][2] = bt.getAttribute('data-points');
        break;
    }
  }

  checkWinning(isPlayerOneMove: boolean) {

    // Tie
    if (this.totalFilledBlock === 9) {
      alert('ITS A TIE!');
      this.message = 'ITS A TIE! PLEASE RESTART.';
      this.isGameOver = true;
    } else {
      // row check
      for (let i = 0; i < 3; i++) {
        let rowSum = 0;
        for (let j = 0; j < 3; j++) {
          rowSum += this.arr[i][j];
        }
        if (rowSum === 3) {
          alert('Player One Won!');
          this.message = 'Player One Won!';
          this.isGameOver = true;
        } else if (rowSum === -3) {
          alert('Player Two Won!');
          this.message = 'Player Two Won!';
          this.isGameOver = true;
        }
      }

      // column check
      for (let i = 0; i < 3; i++) {
        let colSum = 0;
        for (let j = 0; j < 3; j++) {
          colSum += this.arr[j][i];
        }
        if (colSum === 3) {
          alert('Player One Won!');
          this.message = 'Player One Won!';
          this.isGameOver = true;
        } else if (colSum === -3) {
          alert('Player Two Won!');
          this.message = 'Player Two Won!';
          this.isGameOver = true;
        }
      }

      // cross check
      if (this.arr[0][0] + this.arr[1][1] + this.arr[2][2] === 3) {
        alert('Player One Won!');
        this.message = 'Player One Won!';
        this.isGameOver = true;
      } else if (this.arr[0][0] + this.arr[1][1] + this.arr[2][2] === -3) {
        alert('Player Two Won!');
        this.message = 'Player Two Won!';
        this.isGameOver = true;
      }
      if (this.arr[2][0] + this.arr[1][1] + this.arr[0][2] === 3) {
        alert('Player One Won!');
        this.isGameOver = true;
        this.message = 'Player One Won!';
      } else if (this.arr[0][0] + this.arr[1][1] + this.arr[2][2] === -3) {
        alert('Player Two Won!');
        this.isGameOver = true;
        this.message = 'Player Two Won!';
      }
    }
  }

  resetGame() {
    this.initArry();
    this.isPlayerOneMove = true;
    this.playerOneSelected = [];
    this.playerTwoSelected = [];
    this.message = '';
    this.totalFilledBlock = 0;
    this.isGameOver = false;
    const bts = document.getElementsByClassName('square');
    Array.from(bts).map(bt => {
      bt.textContent = '';
      bt.setAttribute('class', 'square');
      bt.setAttribute('data-points', '0');
    });
  }

  constructor() { }

  // Angular lifecycle in sequence
  ngOnChanges(changes: SimpleChanges) {
    console.log('changes happened =>  ', changes);
  }

  ngOnInit(): void {
    /*
      At this point, view might not be rendered and visible
      try to acess dom element might result in undefined
       document.getElementsByClassName('square')[0];  => undefined
    */
    this.isPlayerOneMove = true;
    console.log('- ngOnInit -');

    // init arr
    this.initArry();

    /* use javascript dom state check to insure that DOMContent is already loaded
    document.addEventListener('DOMContentLoaded', (event) => {
      console.log(document.readyState); => interactive
      const bts = document.getElementsByClassName('square'); // accessible
    });
    */
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngDoCheck() {
    console.log('- ngDoCheck -');
  }
  ngAfterContentInit() {
    console.log('- ngAfterContentInit -');
  }

  ngAfterContentChecked() {
    console.log('- ngAfterContentChecked -');
  }
  ngAfterViewInit() {
    // View Init and accessible
    console.log('- ngAfterViewInit -');
    const bts = document.getElementsByClassName('square');

    Array.from(bts).map((bt, index) => {
      bt.addEventListener('click', () => {
        if (bt.getAttribute('class').includes('filled')) {
          this.message = 'Please select another box';
        } else {
          this.totalFilledBlock += 1;
          this.message = '';
          bt.textContent = this.isPlayerOneMove ? 'X' : 'O';
          if (this.isPlayerOneMove) {
            bt.classList.add('filled');
            bt.classList.add('playerOne');
            bt.setAttribute('data-points', '1');
            this.modifyPoints(index, bt);
          } else {
            this.playerTwoSelected.push(index);
            bt.classList.add('filled');
            bt.classList.add('playerTwo');
            bt.setAttribute('data-points', '-1');
            this.modifyPoints(index, bt);
          }
          this.checkWinning(this.isPlayerOneMove);
          this.isPlayerOneMove = !this.isPlayerOneMove;
        }
      });
    });

  }
  ngAfterViewChecked() {
    console.log('- ngAfterViewChecked -');
  }
  ngOnDestroy() {
    console.log('- ngOnDestroy -');
  }
}
