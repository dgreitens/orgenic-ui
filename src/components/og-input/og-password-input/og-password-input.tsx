import { h, Component, Prop, Event, EventEmitter, Method, Host, Watch } from '@stencil/core';

@Component({
  tag: 'og-password-input',
  styleUrl: 'og-password-input.scss',
  shadow: true
})
export class OgPasswordInput {
  /**
   * Optional placeholder text if input is empty.
   */
  @Prop()
  public placeholder?: string;

  /**
   * The initial value. Can be updated at runtime.
   */
  @Prop({ mutable: true })
  public value: string;

  @Watch('value')
  updateValue(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.valueChanged.emit(newValue);
    }
  }

  /**
   * Define, whether the password is visible or not.
   */
  @Prop({ mutable: true })
  public passwordVisible: boolean = false;

  /**
   * Define, whether a switch should be visible, to show the password in plain text.
   */
  @Prop()
  public showTogglePasswordVisibility: boolean = false;

  /**
   * Determines, whether the control is disabled or not.
   */
  @Prop()
  public disabled: boolean;

  /**
   * Event is being emitted when value changes.
   */
  @Event()
  public valueChanged: EventEmitter<string>;


  /**
   * Event is being emitted when input gets focus..
   */
  @Event()
  public focusGained: EventEmitter<FocusEvent>;

  /**
   * Event is being emitted when focus gets lost.
   */
  @Event()
  public focusLost: EventEmitter<FocusEvent>;

  @Method()
  public async togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  public handleChange(e) {
    this.value = e.target.value;
    this.valueChanged.emit(this.value);
  }

  public render(): HTMLElement {
    return (
      <Host class={{ 'og-form-item__editor': true }}>
        <input type={ this.passwordVisible ? 'text' : 'password' }
          class="og-input__input"
          value={ this.value }
          disabled={ this.disabled }
          onInput={ (event) => this.handleChange(event) }
          onFocus={ (event) => this.focusGained.emit(event) }
          onBlur={ (event) => this.focusLost.emit(event) }
          placeholder={ this.placeholder }
        />
        <div class="og-input__indicator"></div>
        {
          this.showTogglePasswordVisibility &&
                      <div class="og-input__visibility-button"
                        onClick={ () => this.togglePasswordVisibility() }>
                        <svg class="og-input__eye og-input__eye--opened" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z"/></svg>
                        <svg class="og-input__eye og-input__eye--closed" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.604 2.562l-3.346 3.137c-1.27-.428-2.686-.699-4.243-.699-7.569 0-12.015 6.551-12.015 6.551s1.928 2.951 5.146 5.138l-2.911 2.909 1.414 1.414 17.37-17.035-1.415-1.415zm-6.016 5.779c-3.288-1.453-6.681 1.908-5.265 5.206l-1.726 1.707c-1.814-1.16-3.225-2.65-4.06-3.66 1.493-1.648 4.817-4.594 9.478-4.594.927 0 1.796.119 2.61.315l-1.037 1.026zm-2.883 7.431l5.09-4.993c1.017 3.111-2.003 6.067-5.09 4.993zm13.295-4.221s-4.252 7.449-11.985 7.449c-1.379 0-2.662-.291-3.851-.737l1.614-1.583c.715.193 1.458.32 2.237.32 4.791 0 8.104-3.527 9.504-5.364-.729-.822-1.956-1.99-3.587-2.952l1.489-1.46c2.982 1.9 4.579 4.327 4.579 4.327z"/></svg>
                      </div>
        }
      </Host>
    );
  }
}
