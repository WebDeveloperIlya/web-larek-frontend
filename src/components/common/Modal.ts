import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { ModalActions, ModalProps } from '../../types';

export class Modal extends Component<ModalProps> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(
		container: HTMLElement,
		protected actions?: Partial<ModalActions>
	) {
		super(container);

		this._closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._content = ensureElement<HTMLElement>('.modal__content', container);

		this._closeButton.addEventListener('click', this.close.bind(this));
		this._container.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	open() {
		this._container.classList.add('modal_active');
		this.actions?.onOpen();
	}

	close() {
		this._container.classList.remove('modal_active');
		this.content = null;
		this.actions?.onClose();
	}

	render(data: ModalProps): HTMLElement {
		super.render(data);
		this.open();
		return this._container;
	}
}
