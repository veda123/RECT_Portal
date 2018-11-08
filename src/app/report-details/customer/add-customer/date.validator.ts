import { AbstractControl } from "@angular/forms";

export class DateValidator{

    static verifyDates(formdata:AbstractControl){
        let startDate = formdata.get('contractStartDate');
        let endDate = formdata.get('contractEndDate');
        if(startDate.value > endDate.value)
            formdata.get('contractStartDate').setErrors({verifyDates:true});
        else
            return null;
    }
}