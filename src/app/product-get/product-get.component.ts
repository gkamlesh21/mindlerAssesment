import { Component, OnInit } from '@angular/core';
import { Product } from "./../product";
import { ProductsService } from './../products.service';

@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.scss']
})
export class ProductGetComponent implements OnInit {

  title = 'angular-text-search-highlight';

  products: Product[] = [];
  message: string = '';  
  searchedKeyword: any = { title: '' };
  reverse: boolean = true;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService
    .getProducts()
    .subscribe((res: any = []) => {
      console.log(res);

      if(res.length != 0){

        var result = Object.keys(res.products).map((key) => res.products[key]);
        // console.log(result);

        this.products = result;

        this.sort(false);

      } else {
        this.message = "Error!!! Data Not Found";
      }
    });
  }

  sort(param){
    this.reverse = !param;

    if (this.reverse) {
      this.products.sort((a, b) => {
        return Number(b['popularity']) - Number(a['popularity']);
      });
    } else {
      this.products.sort((a, b) => {
        return Number(a['popularity']) - Number(b['popularity']);
      });
    }
   
    // console.log(this.products);
  }

  searchClear(){
    
  }

}
