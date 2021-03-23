import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  previous: string;
  current: string;
  operation: string | undefined;
  isBinary = false;
  decBin = 'dec';

  constructor() {
  }

  allClear(): void {
    this.previous = '';
    this.current = '';
    this.operation = undefined;
  }

  delete(): void {
    if (isNaN(parseFloat(this.current))) {
      this.allClear();
    }
    this.current = this.current.slice(0, -1);
  }

  getNumber(num: number | string): void {
    if (num === '.' && this.current.includes('.')) {
      return;
    }
    this.current += num;
  }

  getOperation(operand: string): void {
    if (this.current === '') {
      return;
    }
    if (this.previous !== '') {
      this.compute();
    }
    this.operation = operand;
    this.previous = this.current + operand;
    this.current = '';
  }

  toggleCalc(): void {
    if ((this.current || this.previous) !== '') {
      this.current = this.isBinary
        ? parseInt(this.current, 2).toString()
        : parseInt(this.current, 10).toString(2);
      this.previous = this.isBinary
        ? parseInt(this.previous, 2).toString() + this.operation
        : parseInt(this.previous, 10).toString(2) + this.operation;
      if (isNaN(parseFloat(this.current))) {
        this.current = '';
      }

      if (isNaN(parseFloat(this.previous))) {
        this.previous = '';
      }
    }
    this.isBinary = !this.isBinary;
    this.decBin = this.isBinary ? 'bin' : 'dec';
  }

  compute(): void {
    let result: number;
    const previous: number = this.isBinary
      ? parseInt(this.previous, 2)
      : parseFloat(this.previous);
    const current: number = this.isBinary
      ? parseInt(this.current, 2)
      : parseFloat(this.current);
    if (isNaN(previous) || isNaN(current)) {
      return;
    }
    switch (this.operation) {
      case '+': {
        result = previous + current;
        break;
      }
      case '-': {
        result = previous - current;
        break;
      }
      case 'x': {
        result = previous * current;
        break;
      }
      case '÷': {
        result = this.isBinary
          ? Math.round(previous / current)
          : Math.round((previous / current) * 1000) / 1000;
        break;
      }
      default:
        return;
    }
    this.current = this.isBinary ? result.toString(2) : result.toString();
    this.previous = '';
    this.operation = undefined;
  }

  ngOnInit(): void {
    this.allClear();
  }

}
