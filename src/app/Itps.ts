export interface Itps{
    tpsId           :   number,
    version         :   string,
    releaseDate     :   string,
    checksum        :   string,
    checksumType    :   string,
    comments        :   string,
    releaseNotes    :   string,
    tpsName         :   string,
    tpsPart   :   string,
    repairCapability   : {
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