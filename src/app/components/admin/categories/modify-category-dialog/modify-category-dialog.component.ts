import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modify-category-dialog',
  templateUrl: './modify-category-dialog.component.html',
  styleUrls: ['./modify-category-dialog.component.sass']
})
export class ModifyCategoryDialogComponent {

  newCategoryName: string;

  constructor(
    public dialogRef: MatDialogRef<ModifyCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.newCategoryName = data.categoryName;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.newCategoryName);
  }
}
