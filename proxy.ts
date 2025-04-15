interface IPaymentAPI {
  getPaymentDetail(id: number): IPaymantDetail | undefined;
}

interface IPaymantDetail {
  id: number;
  sum: number;
}

class PaymentAPI implements IPaymentAPI {
  private data = [{ id: 1, sum: 10000 }];

  getPaymentDetail(id: number): IPaymantDetail | undefined {
    return this.data.find((d) => d.id === id);
  }
}

class PaymentProxy implements IPaymentAPI {
  constructor(private api: PaymentAPI, private uid: number) {}

  getPaymentDetail(id: number): IPaymantDetail | undefined {
    if (this.uid === 1) {
      return this.api.getPaymentDetail(id);
    }
    console.log("403 Forbidden");
    return;
  }
}

const proxy = new PaymentProxy(new PaymentAPI(), 1);
proxy.getPaymentDetail(1);

const proxy2 = new PaymentProxy(new PaymentAPI(), 2);
proxy2.getPaymentDetail(1);
