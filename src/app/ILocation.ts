export interface ILocation{
    locationId      : number,
    locationName    : string,
    address         : string,
    city            : string,
    phone           : string,
    zipcode         : string,
    timezone        : number,
    country:{
        id           : number,
        shortName    : string,
        countryName  : string
    }
}