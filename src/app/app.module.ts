import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { TableDataComponent } from './table-data/table-data.component';
import { GridModule } from "@progress/kendo-angular-grid";
import { CommonModule } from '@angular/common';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { TooltipModule } from "@progress/kendo-angular-tooltip";
import { ViewSummaryComponent } from './view-summary/view-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    TableDataComponent,
    ViewSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule,
    CommonModule,
    GridModule,
    TooltipModule,
    RouterModule.forRoot([
      { path: '', component: UploadComponent },
      { path: 'table-data', component: TableDataComponent },
      { path: 'view-summary', component: ViewSummaryComponent }
    ])

  ],
  exports: [
    UploadComponent,
    TableDataComponent,
    ViewSummaryComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
