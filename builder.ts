enum ImageFormat{
  Png = 'png',
  Jpeg = 'jpeg'
}

interface IResolution{
  width: number;
  height: number;
}

interface IImageConversion extends IResolution{
  format: ImageFormat
}

export class ImageBuilder{
  private formats: ImageFormat[] = [];
  private resolution: IResolution[] = [];

  addPng(){
    if(!this.formats.includes(ImageFormat.Png)){
      this.formats.push(ImageFormat.Png);
    }
    return this;
  }

  addJpeg(){
    if(!this.formats.includes(ImageFormat.Jpeg)){
      this.formats.push(ImageFormat.Jpeg);
    }
    return this;
  }

  addResolution(width:number, height:number){
    this.resolution.push({width, height});
    return this;
  }
  
  build(): IImageConversion[]{
    const res: IImageConversion[] = [];

    for (const r of this.resolution){
      for (const f of this.formats){
        res.push({
          format: f,
          width: r.width,
          height: r.height
        })
      }
    }
    return res;
  }
}