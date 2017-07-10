import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http, XHRBackend, ConnectionBackend, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { AuthenticationService } from './authentication/authentication.service';
import { I18nService } from './i18n.service';
import { HttpService } from './http/http.service';
import { HttpCacheService } from './http/http-cache.service';
import { ShellComponent } from './shell/shell.component';
import { AuthenticationGuard } from './authentication/authentication.guard';

export function createHttpService(backend: ConnectionBackend,
                                  defaultOptions: RequestOptions,
                                  httpCacheService: HttpCacheService) {
  return new HttpService(backend, defaultOptions, httpCacheService);
}

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    TranslateModule,
    IonicModule,
    RouterModule
  ],
  entryComponents: [
    ShellComponent
  ],
  declarations: [
    ShellComponent
  ],
  exports: [],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    I18nService,
    HttpCacheService,
    {
      provide: Http,
      deps: [XHRBackend, RequestOptions, HttpCacheService],
      useFactory: createHttpService
    }
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }

}
