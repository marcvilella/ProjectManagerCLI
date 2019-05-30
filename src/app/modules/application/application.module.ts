import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

// Modules
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AvatarModule } from 'ngx-avatar';
import { SharedLazyModule } from '../../shared/modules/shared-lazy.module';
import { MaterialDesignModule, getTranslatePaginatorIntl } from '../../shared/modules/material-design.module';
import { PrimeNgModule } from 'src/app/shared/modules/primeng.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MentionModule } from 'angular-mentions';
import { NgScrollbarModule } from 'ngx-scrollbar';

// Routing
import { ApplicationRouting } from './application.routing';

// Provider
import { SocketService } from '../../shared/services/socket.service';
import { BoardsService } from 'src/app/shared/services/boards.service';
import { UploadService } from 'src/app/shared/services/upload.service';

// Components
import { ApplicationComponent } from './application.component';
import { DashboardComponent } from './components/dashboard.component';
import { CalendarComponent } from './components/calendar.component';
import { BoardComponent } from './components/board.component';
import { BoardMenuItemComponent } from './components/application-components/board-menu-item-component/board-menu-item.component';
import { BoardCreateDialogComponent, BoardCardDialogComponent, BoardCreateDataService } from './components/board-components/board-creator-dialog/board.create.dialog.component';
import { BoardContainerComponent } from './components/board-components/board-container/board.container';
import { BoardCardListComponent } from './components/board-components/card-list/board-card-list.component';
import { BoardCardItemComponent } from './components/board-components/card-item/board-card-item.component';
import { CardItemDialogComponent } from './components/board-components/card-item-dialog/board-card-item-dialog.component';
import { DatepickerComponent } from './components/common-components/datepicker/datepicker.component';
import { MembersSelectorComponent } from './components/common-components/members-selector/members.selector.component';
import { AttachmentsSelectorComponent } from './components/common-components/attachments-selector/attachments.selector.component';
import { AttachmentsAvatarComponent } from './components/common-components/attachments-selector/attachment.avatar.component';
import { AttachmentUploadDialogComponent } from './components/common-components/attachments-selector/attachment.upload.dialog';
import { PrioritySelectorComponent } from './components/common-components/priority-selector/priority.selector.component';
import { CheckListComponent } from './components/common-components/checklist/checklist.component';
import { TimesheetWeeklyInsertComponent } from './components/timesheet-components/timesheet-weekly-insert/timesheet.weekly.insert.component';
import { ActivityViewerComponent } from './components/common-components/activity/activity.viewer.component';
import { ActivityMessageComponent } from './components/common-components/activity/activity.message.component';
import { CardItemDialogContainerComponent } from './components/board-components/card-item-dialog/board-card-item-dialog-container.component';
import { MemberAvatarComponent } from './components/common-components/members-selector/member.avatar.component';
import { BoardSettingsDialogComponent } from './components/board-components/board-settings-dialog/board.settings.dialog.component';
import { BoardSettingsDialogContainerComponent } from './components/board-components/board-settings-dialog/board.settings.dialog.container.component';

// Directives
import { AutoFocusDirective, ClickOutsideDirective, ClickInsideDirective, AutoSizeInputDirective, AutoSizeTextAreaDirective } from 'src/app/shared/modules/directives';

// Pipes
import { MyDatePipe, TimeAgoPipe, NumberPipe, HighlightSearch } from 'src/app/shared/modules/pipes';

// Animations
import { AnimatedIconComponent } from 'src/app/shared/modules/animated.icons';
import { BoardHomeComponent } from './components/board-components/board-home/board.home.component';
import { MatPaginatorIntl } from '@angular/material';

@NgModule({
  declarations: [
    ApplicationComponent,
    DashboardComponent,

    // #region Application

    BoardMenuItemComponent,

    // #endregion

    // #region Calendar

    CalendarComponent,

    // #endregion

    // #region Board

    BoardHomeComponent,
    BoardCardDialogComponent,
    BoardComponent,
    BoardSettingsDialogContainerComponent,
    BoardSettingsDialogComponent,
    BoardCreateDialogComponent,
    BoardContainerComponent,
    BoardCardListComponent,
    BoardCardItemComponent,
    CardItemDialogContainerComponent,
    CardItemDialogComponent,

    // #endregion Board

    // #region Timesheet

    TimesheetWeeklyInsertComponent,

    // #endregion

    // #region Common Components

    DatepickerComponent,
    MembersSelectorComponent,
    MemberAvatarComponent,
    AttachmentsSelectorComponent,
    AttachmentsAvatarComponent,
    AttachmentUploadDialogComponent,
    PrioritySelectorComponent,
    CheckListComponent,
    ActivityViewerComponent,
    ActivityMessageComponent,

    // #endregion

    // #region Pipes

    HighlightSearch,
    MyDatePipe,
    NumberPipe,
    TimeAgoPipe,

    // #endregion

    // #region Directives

    AutoFocusDirective,
    ClickOutsideDirective,
    ClickInsideDirective,
    AutoSizeInputDirective,
    AutoSizeTextAreaDirective,

    // #endregion

    // #region Animations

    AnimatedIconComponent

    // #endregion
  ],
  entryComponents: [
    BoardSettingsDialogContainerComponent,
    BoardCreateDialogComponent,
    BoardCardDialogComponent,
    CardItemDialogContainerComponent,
    AttachmentUploadDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ApplicationRouting,
    RouterModule,
    // RootStoreModule,
    SharedLazyModule,
    MaterialDesignModule,
    PrimeNgModule,
    MentionModule,
    AvatarModule,
    TranslateModule.forChild(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgScrollbarModule
  ],
  providers: [
    SocketService,
    BoardsService,
    BoardCreateDataService,
    UploadService,
    {provide: MatPaginatorIntl, useFactory: getTranslatePaginatorIntl, deps: [TranslateService]}

  ]
})
export class ApplicationModule { }
