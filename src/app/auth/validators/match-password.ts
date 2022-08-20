import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class MatchPassword {
    validate = (control: AbstractControl) => {
        const { password, passwordConfirmation } = control.value;
        if(password === passwordConfirmation) {
            return null;
        } else {
            return { passwordsDontMatch: true} ;
        }
    }
}
