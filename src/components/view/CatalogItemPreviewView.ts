import { CatalogItemPreviewViewProps, IEvents } from '../../types';
import { cloneTemplate, ensureElement } from '../../utils/utils';
import { Card } from '../common/Card';

export class CatalogItemPreviewView extends Card<CatalogItemPreviewViewProps> {
	private __descriptionElement: HTMLParagraphElement;

	constructor(events: IEvents) {
		super(cloneTemplate<HTMLDivElement>('#card-preview'), {
			onClick: () => events.emit('catalogItem:addToCartClick', { id: this.id }),
		});

		this.__descriptionElement = ensureElement<HTMLParagraphElement>(
			'.card__text',
			this._container
		);
	}

	set id(id: string) {
		this._container.dataset.id = id || '';
	}

	set disableBuyButton(value: boolean) {
		this.setDisabled(this._buttonElement, value);
	}

	get id() {
		return this._container.dataset.id || '';
	}

	set description(value: string) {
		this.setText(this.__descriptionElement, value);
	}
}
