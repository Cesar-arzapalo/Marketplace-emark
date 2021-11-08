import { NgModule } from '@angular/core';
// Componentes de angular amterial
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatOptionModule, MatRippleModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";

const materialToInclude = [
	MatSidenavModule,
	MatListModule,
	MatTooltipModule,
	MatOptionModule,
	MatSelectModule,
	MatMenuModule,
	MatSnackBarModule,
	MatGridListModule,
	MatToolbarModule,
	MatIconModule,
	MatButtonModule,
	MatRadioModule,
	MatCheckboxModule,
	MatCardModule,
	MatProgressSpinnerModule,
	MatRippleModule,
	MatDialogModule,
	MatTableModule,
	MatPaginatorModule,
	MatSortModule,
	MatFormFieldModule,
	MatInputModule,
	MatTabsModule,
];

@NgModule({
	exports: [
		materialToInclude
	]
})
export class MaterialModule { }
