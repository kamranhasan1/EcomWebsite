import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  productList: any[] = [];
  loading: boolean = false;

  async ngOnInit(): Promise<void> {
    await this.loadAllProducts();
  }

  async loadAllProducts() {
    this.loading = true;
    const data = await fetch(
      'https://glamora-backend.vercel.app/products'
    ).then((res) => {
      return res.json();
    });
    this.productList = data;
    this.loading = false;
  }

  addItemToCart(id: number) {
    console.log(id + ' added to the cart');
  }
}
