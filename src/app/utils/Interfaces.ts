
export interface sidenavItem  {
  name: string,
  icon: string,
  route: string
}
export interface user{
  id:string,
  name:string,
  email:string,
  type:string,
  gender:string,
  address:{city:string,country:string},
  image:string
}

