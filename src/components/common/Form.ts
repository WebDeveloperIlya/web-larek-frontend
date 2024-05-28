import { FormActions, FormProps } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

export class Form<T> extends Component<FormProps> {
	private __submitButtonElement: HTMLButtonElement;
	private __errorElement: HTMLSpanElement;

	constructor(
		protected _container: HTMLFormElement,
		protected actions?: Partial<FormActions<T>>
	) {
		super(_container);

		this.__submitButtonElement = ensureElement<HTMLButtonElement>(
			'button[type="submit"]',
			this._container
		);

		this.__errorElement = ensureElement<HTMLSpanElement>(
			'.form__errors',
			this._container
		);

		if (actions?.onInput) {
			this._container.addEventListener('input', this.onInputChange);
		}

		if (actions?.onSubmit) {
			this._container.addEventListener('submit', this.submitHandler);
		}
	}

	private onInputChange = (e: KeyboardEvent) => {
		const target = e.target as HTMLInputElement;
		this.actions.onInput(
			target.name as keyof T,
			target.value,
			target.validationMessage
		);
	};

	private submitHandler = (e: SubmitEvent) => {
		e.preventDefault();
		this.actions.onSubmit();
	};

	public reset() {
		this._container.reset();
	}

	set valid(value: boolean) {
		this.setDisabled(this.__submitButtonElement, !value);
	}

	set errors(value: string[]) {
		this.setText(this.__errorElement, value.join(', '));
	}
}
