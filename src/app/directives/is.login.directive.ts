import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appIsLogin]'
})
export class IsLoginDirective implements OnInit, OnDestroy {
  @Input() appIsLogin: boolean = true;
  stop$ = new Subject();
  isVisible = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.user.pipe(
      takeUntil(this.stop$)
    ).subscribe(user => {
      const isLoggedIn = user !== null;
      const shouldShow = this.appIsLogin ? isLoggedIn : !isLoggedIn;

      if (shouldShow && !this.isVisible) {
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else if (!shouldShow && this.isVisible) {
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    });
  }

  ngOnDestroy() {
    this.stop$.next(null);
    this.stop$.complete();
  }
}
