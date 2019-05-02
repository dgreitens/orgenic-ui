import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { SVGContent } from '../utils/svg-content';

@Component({
  tag: 'og-message-dialog',
  styleUrl: 'og-message-dialog.scss',
  shadow: true
})
export class OgMessageDialog {
    /**
     * The title for this modal dialog
     */
    @Prop() name: string;

    /**
     * Visibility state of this dialog.
     */
    @Prop({ mutable: true, reflectToAttr: true }) visible: boolean = false;

    /**
     * Dialog type can be: success / warning / error / info with.
     * An icon as well as the icon color will be automatically assigned.
     */
    @Prop() type: 'success' | 'warning' | 'error' | 'info' = 'success';

    /**
     * Optional SVG Icon as markup.
     */
    @Prop() svgIcon: string;

    /**
     * Label for approve button.
     */
    @Prop() approveLabel: string = 'OK';

    /**
     * Event is being emitted when value changes.
     */
    @Event() confirmed: EventEmitter<Event>;

    handleConfirm() {
        this.confirmed.emit();
        this.visible = false
    }

    private getIcon() {
        if (this.svgIcon) {
            return this.svgIcon;
        }
        return SVGContent[this.type];
    }

    render() {
        return (
            <og-dialog class={ 'og-dialog--' + this.type } name={ this.name } svg-icon={ this.getIcon() } visible={ this.visible }>
                <div slot="content">
                    <slot></slot>
                </div>
                <div slot="footer">
                    <og-button label={ this.approveLabel } onClicked={ _e => this.handleConfirm() }></og-button>
                </div>
            </og-dialog>
        );
    }
}
