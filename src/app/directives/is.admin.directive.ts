import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appIsAdmin]'
})
export class IsAdminDirective implements OnInit, OnDestroy {
  stop$ = new Subject();
  isVisible = false;
  

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.user.pipe(
      takeUntil(this.stop$)
    ).subscribe(user => {
      if (!user?.isAdmin) {
        this.viewContainerRef.clear();
      }
      if (user?.isAdmin) {
        if (!this.isVisible) {
          this.isVisible = true;
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      } else {
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    });
  }

  ngOnDestroy() {
    this.stop$.next(null);
  }
}
