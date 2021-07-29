import { FormControl } from "@angular/forms";

export class DateValidator {

    cantMeses: number = 12*13;

    public static validarFecha(element: FormControl) {
        let cantMeses = 12*13;
        let maxDate = null
        let now = new Date();
        maxDate = new Date(now.getFullYear(), now.getMonth() - cantMeses, now.getDate());
        let fecha = element.value;
        let date = new Date(fecha);
        if (maxDate < date) {
            return { fechaInvalida : true };
        }
        return null;
    }
}