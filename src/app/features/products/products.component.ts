import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CommonService, Product } from 'src/app/services/common.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {

  category = '';

  displayedColumns: string[] = ['name', 'price', 'action'];
  dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    public commonService: CommonService
  ) {
    this.category = decodeURIComponent(route.snapshot.params.category);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.commonService.products.filter(t => t.category === this.category));
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

}
