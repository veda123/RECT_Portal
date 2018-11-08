import { summaryFileName } from "@angular/compiler/src/aot/util";

export interface ICustomer{
    customerId          : number,
    customerName        : string,
    contractStartDate   : string,
    contractEndDate     : string,
    pointOfContact      : string,
    dbFile  : {
        id          :   string,
        fileName    :   string,
        fileType    :   string,
        data        :   string
    },
    contractTypeId :{
        contractTypeId  : number,
        contractType    : string
    },
    inventory:{
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
            country         : string,
            phone           : string,
            zipcode         : string,
            timezone        : number
        }
    }
    
}