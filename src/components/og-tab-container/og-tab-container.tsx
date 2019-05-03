/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { Component, Prop, EventEmitter, Event, Element, State, Method } from '@stencil/core';

@Component({
  tag: 'og-tab-container',
  styleUrl: 'og-tab-container.scss',
  shadow: true
})
export class OgTabContainer {
    @Element() el: HTMLElement;

    @State() tabs: HTMLOgTabElement[] = [];

    /**
     * Determines, whether the control is disabled or not
     */
    @Prop() disabled: boolean;

    /**
     * Event is being emitted when value changes.
     */
    @Event() tabSelected: EventEmitter<number>;

    @Method()
    openTab(index: number) {
        if (this.disabled) {
            return;
        }
        if (index >= this.tabs.length) {
          throw new Error(
            `[og-tabs] Index ${index} is out of bounds of tabs length`
          );
        }
        if (!this.tabs[index].disabled) {
          this.tabs = this.tabs.map((tab, i) => {
            tab.selected = i === index;
            return tab;
          });
        }
        this.tabSelected.emit(index);
    }

    componentWillLoad() {
      // Grab tabs from this component
      this.tabs = Array.from(this.el.querySelectorAll('og-tab'));
      if (this.tabs.length === 0) {
        throw new Error('[og-tabs] Must have at least one tab');
      }
    }

    render() {
        return (
            <div class="og-tabs">
                <nav class="og-tabs__nav">
                    <ul class="og-tabs__list">
                        {this.tabs.map((tab, index) => {
                            return (
                                <li
                                    class={
                                        "og-tabs__list-item" +
                                        (tab.selected
                                            ? " og-tabs__list-item--selected"
                                            : "") +
                                        (tab.disabled
                                            ? " og-tabs__list-item--disabled"
                                            : "")
                                    }
                                >
                                    <button
                                        role="tab"
                                        class={
                                            "og-tabs__tab" +
                                            (tab.selected
                                                ? " og-tabs__tab--selected"
                                                : "")
                                        }
                                        disabled={
                                            this.disabled || tab.disabled
                                        }
                                        onClick={() => this.openTab(index)}
                                    >
                                        {tab.label}
                                    </button>
                                    <div class="og-tabs__tab__indicator" />
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div class="og-tabs__content-container">
                    <div class="og-tabs__content">
                        <slot></slot>
                    </div>
                </div>
            </div>
        );
    }
}
