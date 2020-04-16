import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  public doSpinner = new BehaviorSubject<any>(null);

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  markFormGroupTouched(formGroup) {
    (Object as any).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
  showLoading() {
    this.doSpinner.next(true);
  }
  hideLoading() {
    this.doSpinner.next(false);
  }
}
