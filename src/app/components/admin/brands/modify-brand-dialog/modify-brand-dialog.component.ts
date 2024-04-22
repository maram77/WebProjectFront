import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modify-brand-dialog',
  templateUrl: './modify-brand-dialog.component.html',
  styleUrls: ['./modify-brand-dialog.component.sass']
})
export class ModifyBrandDialogComponent {
  newBrandName: string;

  constructor(
    public dialogRef: MatDialogRef<ModifyBrandDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.newBrandName = data.brandName;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.newBrandName);
  }
}