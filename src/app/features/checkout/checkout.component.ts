import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, Product } from 'src/app/services/common.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  category = '';

  displayedColumns: string[] = ['name', 'category','price', 'action'];
  dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public commonService: CommonService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.commonService.basket);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  remove(element: Product): void {
    const data = this.dataSource.data;
    const ind = data.findIndex(t => t.id === element.id);
    if (ind > -1 && element.qtyToBuy > 0) {
      this.dataSource.data[ind].qtyToBuy--;
      const cInd = this.commonService.products.findIndex(t => t.id === element.id);
      if (cInd > -1) {
        this.commonService.products[cInd] = data[ind];
      }

      const bInd = this.commonService.basket.findIndex(t => t.id === element.id);
      if (bInd > -1) {
        if (element.qtyToBuy === 0) {
          this.commonService.basket.splice(bInd, 1);
        } else {
          this.commonService.basket[bInd] = this.dataSource.data[ind];
        }
      }
    }
  }

  add(element: Product): void {
    const data = this.dataSource.data;
    const ind = data.findIndex(t => t.id === element.id);
    if (ind > -1 && element.qtyToBuy < element.quantity) {
      this.dataSource.data[ind].qtyToBuy++;
      const cInd = this.commonService.products.findIndex(t => t.id === element.id);
      if (cInd > -1) {
        this.commonService.products[cInd] = data[ind];
      }

      const bInd = this.commonService.basket.findIndex(t => t.id === element.id);
      if (bInd === -1 && element.qtyToBuy === 1) {
        this.commonService.basket.push(element);
      } else if (bInd > -1) {
        this.commonService.basket[bInd] = this.dataSource.data[ind];
      }
    }
  }

  payNow(): void {
    if (this.dataSource.data.length > 0) {
      this.commonService.basket.forEach(t => {
        const cId = this.commonService.products.findIndex(r => r.id === t.id);
        if (cId > -1) {
          this.commonService.products[cId].quantity =
            this.commonService.products[cId].quantity - this.commonService.products[cId].qtyToBuy;
          this.commonService.products[cId].qtyToBuy = 0;
          if (this.commonService.products[cId].qtyToBuy === 0) {
            this.commonService.products.splice(cId, 1);
          }
        }
      });
      this.dataSource = new MatTableDataSource([]);
      this.commonService.basket = [];
    }
    this.commonService.successMsg('Order successfully Placed');
    this.router.navigateByUrl('/landing');

  }
}
