interface IInsurance{
  id: number;
  status: string;
  setVehicle(vehicle: any):void;
  submit():Promise<boolean>
}

class TFInsurance implements IInsurance{
  id: number = 2;
  status: string= 'tf';
  private vehicle:any

  setVehicle(vehicle: any): void {
    this.vehicle = vehicle;
  }

  async submit(): Promise<boolean> {
    const res = await fetch('', 
      {
        method:'POST',
        body: JSON.stringify({vehicle: this.vehicle})
      })
    const data = await res.json();
    return data.isSuccess;
  }
}

class ABInsurance implements IInsurance{
  id: number = 5;
  status: string = 'AB';
  price: number = 12;

  setVehicle(vehicle: any): void {
    this.price = vehicle;
  }

  async submit(): Promise<boolean> {
    const res = await fetch('AB', 
      {
        method:'POST',
        body: JSON.stringify({price: this.price})
      })
    const data = await res.json();
    return data.ok;
  }
}

abstract class InsuranceFactory{
  db:any;
  abstract createInsurance(): IInsurance

  saveHistory(ins:IInsurance){
    this.db.save(ins.id, ins.status);
  }
}

class TFInsuranceFacroty extends InsuranceFactory{
  createInsurance(): TFInsurance {
    return new TFInsurance();
  }
}

class ABInsuranceFacroty extends InsuranceFactory{
  createInsurance(): ABInsurance {
    return new ABInsurance();
  }
}

const tfInsuranceFacroty = new TFInsuranceFacroty();
const ins = tfInsuranceFacroty.createInsurance();
tfInsuranceFacroty.saveHistory(ins);

// Альтернативный метод, более компактный, но менее гибкий

const INSURANCE_TYPE = {
  tf: TFInsurance,
  ab: ABInsurance
}

type IT = typeof INSURANCE_TYPE;

class InsuranceFactoryAlt{
  db:any;

  createInsurance <T extends keyof IT>(type:T): IT[T]{
    return INSURANCE_TYPE[type];
  }

  saveHistory(ins:IInsurance){
    this.db.save(ins.id, ins.status);
  }
}

const insuranceFactoryAlt = new InsuranceFactoryAlt();
const ins2 = new (insuranceFactoryAlt.createInsurance('tf'));
tfInsuranceFacroty.saveHistory(ins);