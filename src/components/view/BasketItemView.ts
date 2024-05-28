import { BasketItemViewProps, IEvents } from '../../types';
import { cloneTemplate } from '../../utils/utils';
import { BasketItem } from '../common/BasketItem';

export class BasketItemView extends BasketItem<BasketItemViewProps> {
	constructor(events: IEvents) {
		super(cloneTemplate<HTMLLIElement>('#card-basket'), {
			onDelete: () => events.emit('basketItem:delete', { id: this.id }),
		});
	}

	set id(id: string) {
		this._container.dataset.id = id || '';
	}

	get id() {
		return this._container.dataset.id || '';
	}
}
