import { CardActions, CardCategory, CardProps } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

export class Card<T> extends Component<CardProps & T> {
	private __chipElement: HTMLSpanElement;
	private __titleElement: HTMLHeadingElement;
	private __imageElement: HTMLImageElement;
	private __priceElement: HTMLSpanElement;
	protected _buttonElement: HTMLButtonElement | null;

	constructor(container: HTMLElement, actions?: CardActions) {
		super(container);
		this.__titleElement = ensureElement<HTMLHeadingElement>(
			'.card__title',
			this._container
		);
		this.__chipElement = ensureElement<HTMLSpanElement>(
			'.card__category',
			this._container
		);
		this.__imageElement = ensureElement<HTMLImageElement>(
			'.card__image',
			this._container
		);
		this.__priceElement = ensureElement<HTMLSpanElement>(
			'.card__price',
			this._container
		);

		this._buttonElement =
			this._container.querySelector<HTMLButtonElement>('.card__button');

		if (actions) {
			if (this._buttonElement) {
				this._buttonElement.addEventListener('click', actions.onClick);
			} else this._container.addEventListener('click', actions.onClick);
		}
	}

	set title(value: string) {
		this.setText(this.__titleElement, value);
	}

	set price(value: string) {
		if (value) this.setText(this.__priceElement, `${value} синапсов`);
		else this.setText(this.__priceElement, 'Бесценно');
	}

	set image(value: string) {
		this.setImage(this.__imageElement, value);
	}

	set category(value: keyof typeof CardCategory) {
		const category = CardCategory[value];
		this.setText(this.__chipElement, category.title);
		this.setClass(
			this.__chipElement,
			`card__category card__category_${category.modifier}`
		);
	}
}
