// class Product {
//   name: string;
//   price: number;

//   constructor(name: string, price: number) {
//     this.name = name;
//     this.price = price;
//   }

//   describe() {
//     console.log(this.name + " costs " + this.price + " EUR");
//   }

//   isExpensive() {
//     if (this.price > 10) {
//       console.log(this.name + " is expensive");
//     } else {
//       console.log(this.name + " is cheap");
//     }
//   }
// }

// const hammer = new Product("Hammer", 12);
// const pliers = new Product("Pliers", 9);

// hammer.describe();
// pliers.describe();

// hammer.isExpensive();
// pliers.isExpensive();

// class User {
//   name: string;
//   email: string;
//   role: string;

//   constructor(name: string, email: string, role: string) {
//     this.name = name;
//     this.email = email;
//     this.role = role;
//   }

//   introduce() {
//     console.log(this.name + " is logged in as " + this.role);
//   }

//   canManage() {
//     if (this.role === "admin") {
//       console.log(this.name + " can manage products.");
//     } else {
//       console.log(this.name + " cannot manage products.");
//     }
//   }
// }
// const John = new User("John", "admin@practicesoftwaretesting.com", "admin");
// const Jane = new User("Jane", "customer@practicesoftwaretesting.com", "admin");

// John.introduce();
// Jane.introduce();

// John.canManage();
// Jane.canManage();

// class Product {
//   name: string;
//   price: number;
//   constructor(name: string, price: number) {
//     this.name = name;
//     this.price = price;
//   }

//   getDiscountedPrice(percent: number): number {
//     return this.price - (this.price * percent) / 100;
//   }
// }
// const hammer = new Product("Hammer", 20);
// const discounted = hammer.getDiscountedPrice(25);
// console.log(hammer.name + " costs " + discounted + " EUR after discount");

class Product {
  name: string;
  price: number;
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  getPriceWithVat(percent: number): number {
    return this.price + (this.price * percent) / 100;
  }
}
const hammer = new Product("Hammer", 20);
const finalPrice = hammer.getPriceWithVat(21);
console.log(hammer.name + " costs " + finalPrice + " EUR with applied vat");
