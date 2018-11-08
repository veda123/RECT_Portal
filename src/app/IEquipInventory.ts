export interface IEquipInventory{
    inventoryId         : number,
    serialNumber        : string,
    rev                 : string,
    manufactureDate     : string,
    status              : string,
    owner               : string,
    ownership           : string,
    equipment :{
        equipmentID         : number,
        equipmentname       : string,
        description         : string,
        equipmentPartNumber : string,
        equipmentType :{
            equipmentTypeID : number,
            equipmentType   : string
        }
    },
    location: {
        locationID      : number,
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
}