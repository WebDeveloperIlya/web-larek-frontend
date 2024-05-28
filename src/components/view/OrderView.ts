import { IEvents, OrderForm } from '../../types';
import { cloneTemplate, ensureElement } from '../../utils/utils';
import { Form } from '../common/Form';

export class OrderView extends Form<OrderForm> {
	constructor(events: IEvents) {
		super(cloneTemplate<HTMLFormElement>('#order'), {
			onInput: (field, value) =>
				events.emit('order:change', { address: value }),
			onSubmit: () => events.emit('order:submit'),
		});

		const onlineButton = ensureElement<HTMLButtonElement>(
			'button[name="card"]',
			this._container
		);
		const cashButton = ensureElement<HTMLButtonElement>(
			'button[name="cash"]',
			this._container
		);

		this.toggleClass(onlineButton, 'button_alt-active');

		onlineButton.addEventListener('click', () => {
			this.toggleClass(cashButton, 'button_alt-active', false);
			this.toggleClass(onlineButton, 'button_alt-active', true);
			events.emit('order:change', { paymentType: 'online' });
		});

		cashButton.addEventListener('click', () => {
			this.toggleClass(onlineButton, 'button_alt-active', false);
			this.toggleClass(cashButton, 'button_alt-active', true);
			events.emit('order:change', { paymentType: 'cash' });
		});
	}
}
