export interface ILocationPOC{
    id          :   number,
    contactName :   string,
    email       :   string,
    phone       :   string,
    title       :   string,
    location:[ {
        locationID      : number,
        locationName    : string,
        address         : string,
        city            : string,
        phone           : string,
        zipCode         : string,
        timeZone        : number,
        country:{
            id           : number,
            shortName    : string,
            countryName  : string
        }
    }]
}