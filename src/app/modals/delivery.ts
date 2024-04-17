export class Delivery {
    id: number;
    address: string;
    contactNumber: string;
    companyName: string;
    city: string;
    state: string;
    postCode: string;
  
    constructor(
      address: string,
      contactNumber: string,
      companyName: string,
      city: string,
      state: string,
      postCode: string
    ) {
      this.address = address;
      this.contactNumber = contactNumber;
      this.companyName = companyName;
      this.city = city;
      this.state = state;
      this.postCode = postCode;
    }
  }