export interface ILocationCapability{
    locationCapID   :   number,
    establishedDate :   string,
    location  :  {
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
    },
    repairCapability    : {
        capabilityId        :   number,
        lrupartnumber       :   string,
        lrudescription      :   string,
        cmm                 :   string,
        equipment:{
            equipmentID             : number,
            equipmentname           : string,
            description             : string,
            equipmentPartNumber     : string,
            equipmentType:{
                equipmentTypeID     : number,
                equipmentType       : string
            }
        }
    }
}