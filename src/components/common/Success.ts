import { SuccessActions, SuccessProps } from '../../types';
import { ensureElement, formatNumber } from '../../utils/utils';
import { Component } from '../base/Component';

export class Success extends Component<SuccessProps> {
	private __descriptionElement: HTMLParagraphElement;

	constructor(container: HTMLElement, actions?: Partial<SuccessActions>) {
		super(container);
		this.__descriptionElement = ensureElement<HTMLParagraphElement>(
			'.order-success__description',
			this._container
		);

		ensureElement<HTMLButtonElement>(
			'.order-success__close',
			this._container
		).addEventListener('click', actions?.onClick);
	}

	set total(value: number) {
		this.setText(
			this.__descriptionElement,
			`Списано ${formatNumber(value)} синапсов`
		);
	}
}
