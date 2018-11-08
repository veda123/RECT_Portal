export interface IRepairCapability{
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