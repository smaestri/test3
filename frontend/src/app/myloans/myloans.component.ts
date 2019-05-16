import { Component, OnInit } from '@angular/core';
import { LoanService } from '../shared/loan.service';
import { LoanModel } from '../shared/loanmodel';

@Component({
  selector: 'app-myloans',
  templateUrl: './myloans.component.html',
  styleUrls: ['./myloans.component.scss']
})
export class MyloansComponent implements OnInit {
  myLoans: LoanModel[] = [];

  constructor(private loanService : LoanService) { }

  ngOnInit() {
    this.loanService.getMyLoans().subscribe((data: LoanModel[]) => {
      this.myLoans = data;
    });
  }

  closeLoan(idLoan : number) {
    this.loanService.closeLoan(idLoan).subscribe(() => {
      this.ngOnInit();
    })
  }

}
