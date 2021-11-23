export interface RestBody {
  code:number;
  message:string;
  data:dataMap;
}

type dataMap = {
  [key:string]:string;
}
