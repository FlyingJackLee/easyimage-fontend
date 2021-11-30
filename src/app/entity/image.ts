export interface Tag{
  id:number,
  type:string
}

export interface Image{
  id:number,
  name:string,
  filePath:string,
  state:string,
  tags:Tag[],
  uploadDate:Date,
}
