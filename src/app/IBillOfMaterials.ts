export interface IBillOfMaterails{
    billID              :   number,
    lrupartnumber       :   string,
    manufacture         :   string,
    quantity            :   number,
    equipment : {
        equipmentID         : number,
        equipmentname       : string,
        description         : string,
        equipmentPartNumber : string,
        equipmentType:{
            equipmentTypeID   : number,
            equipmentType     : string
        } 
    }
    equipmentPart : {
        equipmentID         : number,
        equipmentname       : string,
        description         : string,
        equipmentPartNumber : string,
        equipmentType:{
            equipmentTypeID   : number,
            equipmentType     : string
        } 
    }
}