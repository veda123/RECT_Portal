export interface IEquipment{
    equipmentID         : number,
    equipmentName       : string,
    description         : string,
    equipmentPartNumber : string,
    equipmentType:{
        equipmentTypeID   : number,
        equipmentType     : string
    }         
}