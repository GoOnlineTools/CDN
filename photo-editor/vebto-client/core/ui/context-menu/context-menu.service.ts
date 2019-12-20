import {ComponentFactoryResolver, ComponentRef, Injectable, Injector, NgZone, Type, ViewContainerRef, ElementRef} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {ComponentPortal} from "@angular/cdk/portal";
import {Overlay, OverlayRef, PositionStrategy} from "@angular/cdk/overlay";
import {filter} from "rxjs/operators";

export interface ContextMenuParams {
    data?: object,
    overlay?: Overlay,
    offsetX?: number,
    offsetY?: number
}

@Injectable()
export class ContextMenu {

    /**
     * Context menu placeholder.
     */
    private vcRef: ViewContainerRef;

    /**
     * Whether scroll, click and router events are bound already.
     */
    private eventsBound = false;

    private isOpen = false;

    private overlayRef: OverlayRef;

    private componentRef: ComponentRef<any>;

    private origin: ElementRef;

    /**
     * ModalService constructor.
     */
    constructor(
        private router: Router,
        private zone: NgZone,
        private injector: Injector,
        private resolver: ComponentFactoryResolver,
        private overlay: Overlay,
    ) {}

    /**
     * Show specified modal.
     */
    public open<T>(component: Type<T>, e: MouseEvent, params: ContextMenuParams): ComponentRef<T> {
        this.bindToEvents();

        if (this.isOpen) this.close();

        this.componentRef = this.createOverlay(e, params).attach(new ComponentPortal(component));
        this.componentRef.instance['params'] = params.data || {};

        this.isOpen = true;

        return this.componentRef;
    }

    /**
     * Close currently open context menu.
     */
    public close() {
        if ( ! this.isOpen || ! this.overlayRef) return;
        this.overlayRef.dispose();
        this.overlayRef = null;
    }

    /**
     * Register context menu placeholder view reference.
     */
    public registerViewContainerRef(vcRef: ViewContainerRef, origin: ElementRef) {
        this.vcRef = vcRef;
        this.origin = origin;
    }

    /**
     * Bind to events needed to close context menu on scroll, click and route change.
     */
    private bindToEvents() {
        if (this.eventsBound) return;

        //close menu on navigation to different route
        this.router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => this.close());

        //close menu on scroll or click outside it
        this.zone.runOutsideAngular(() => {
            document.addEventListener('click', e => {
                const target = e.target as HTMLElement;

                if (target.closest('.context-menu-item')) {
                    this.close();
                }

                if ( ! this.menuContainsEl(target)) {
                    this.close();
                }
            });

            document.addEventListener('contextmenu', e => {
                e.preventDefault();
                if (this.menuContainsEl(e.target as HTMLElement)) return;
                this.close();
            });
        });

        this.eventsBound = true;
    }

    private menuContainsEl(el: HTMLElement) {
        const menu = this.componentRef.location.nativeElement;
        return menu === el || menu.contains(el);
    }

    private createOverlay(e: MouseEvent, params: ContextMenuParams) {
        const overlay = params.overlay || this.overlay;

        this.overlayRef = overlay.create({
            positionStrategy: this.getMenuPositionStrategy(e, params),
            scrollStrategy: this.overlay.scrollStrategies.close(),
        });

        return this.overlayRef;
    }

    private getMenuPositionStrategy(e: MouseEvent, params: ContextMenuParams): PositionStrategy {
        const origin = this.origin.nativeElement;
        origin.style.top = e.clientY+'px';
        origin.style.left = e.clientX + params.offsetX +'px';

        return this.overlay.position().connectedTo(
            new ElementRef(origin),
            {originX: 'end', originY: 'bottom'},
            {overlayX: 'start', overlayY: 'top'}
        ).withFallbackPosition(
            {originX: 'end', originY: 'bottom'},
            {overlayX: 'start', overlayY: 'bottom'}
        ).withFallbackPosition(
            {originX: 'end', originY: 'bottom'},
            {overlayX: 'end', overlayY: 'top'}
        ).withFallbackPosition(
            {originX: 'end', originY: 'bottom'},
            {overlayX: 'end', overlayY: 'bottom'}
        );
    }
}
