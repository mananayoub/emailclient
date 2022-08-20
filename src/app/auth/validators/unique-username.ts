import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms"; 
import { catchError, map, of } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({ 
    providedIn: 'root' 
})
export class UniqueUsername {
    constructor(private authService: AuthService) {}
    
    validate = (control: AbstractControl) => {
        const { value } = control;

        return this.authService.usernameAvailable(value).pipe(map( () => {
                return null;
            }),
            catchError( (err) => {
                if(err.error.username) {
                    return of({ usernameTaken: true });
                } else {
                    return of({ noConnection: true });
                }
            })
        );
    };
}
