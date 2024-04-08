import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { TaskDTO } from '../models/task-interface';
const TaskData = 'taskData'
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  container: any = {};

  constructor(
  ) { }

  saveToLocalStorage(data: any) {
    localStorage.setItem(TaskData, JSON.stringify(data));
  }

  getToLocalStorage() {
   const taskData: any = localStorage.getItem(TaskData);
    return JSON.parse(taskData);
  }

  findInvalidControlsRecursive(formToInvestigate: FormGroup| FormArray): string[] {
    const invalidControls: any = {};
    const recursiveFunc = (form: FormGroup| FormArray) => {
      Object.keys(form.controls).forEach(field => {
        const control = form.get(field);
        if (control?.invalid && !(control instanceof FormArray) && !(control instanceof FormGroup)) {
          invalidControls[field] = control.errors;
        }
        if (control instanceof FormGroup) {
          recursiveFunc(control);
        } else if (control instanceof FormArray) {
          recursiveFunc(control);
        }
      });
    }
    recursiveFunc(formToInvestigate);
    return invalidControls;
  }

  controlnvalid(controlToInvestigate: FormControl | any): string[] | any {
    const invalidControls: any = {};
    if (controlToInvestigate?.invalid ) {
      const controlName: any = (Object.keys(controlToInvestigate.parent.controls).find(key => controlToInvestigate.parent.controls[key] === controlToInvestigate))
      invalidControls[controlName] = controlToInvestigate.errors;
    }
    return invalidControls;
  }

  displayErrors(formErrors: any, ValidationMessages: any, errors: any, uiErrors: any) {
    Object.keys(formErrors).forEach((control) => {
      formErrors[control] = '';
    });
    Object.keys(errors).forEach((control) => {
      Object.keys(errors[control]).forEach(error => {
        uiErrors[control] = ValidationMessages[control][error];
      })
    });
    return {formErrors: formErrors, uiErrors: uiErrors};
  }
}
