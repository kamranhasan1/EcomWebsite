import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface productType {
  id: number;
  category: string;
  image: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
  price: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  constructor(private route: ActivatedRoute, private toastr: ToastrService) {}
  product: productType = {
    id: -1,
    category: '',
    image: '',
    description: '',
    rating: {
      rate: -1,
      count: -1,
    },
    title: '',
    price: -1,
  };

  loading = false;
  async ngOnInit() {
    await this.getThisProduct();
  }

  async getThisProduct() {
    this.loading = true;
    const newid = this.route.snapshot.paramMap.get('id');
    const data = await fetch(
      `https://glamora-backend.vercel.app/products/${newid}`
    ).then((res) => {
      return res.json();
    });
    this.product = data;
    this.loading = false;
  }

  addtoCart(prod: productType) {
    const isPresent = localStorage.getItem(prod.id.toString());

    if (isPresent) {
      const thisProd = JSON.parse(isPresent);

      var updatedQuantity = {
        ...thisProd,
        quantity: thisProd.quantity + 1,
      };

      localStorage.setItem(
        JSON.stringify(prod.id),
        JSON.stringify(updatedQuantity)
      );
    } else {
      var updatedProduct = {
        ...prod,
        quantity: 1,
      };
      localStorage.setItem(
        JSON.stringify(prod.id),
        JSON.stringify(updatedProduct)
      );
    }
    this.toastr.success('Added to cart');
  }
}
