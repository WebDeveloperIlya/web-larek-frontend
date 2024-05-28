import { CatalogItemViewProps, IEvents } from '../../types';
import { cloneTemplate } from '../../utils/utils';
import { Card } from '../common/Card';

export class CatalogItemView extends Card<CatalogItemViewProps> {
	constructor(events: IEvents) {
		super(cloneTemplate<HTMLButtonElement>('#card-catalog'), {
			onClick: () => events.emit('catalogItem:click', { id: this.id }),
		});
	}

	set id(id: string) {
		this._container.dataset.id = id || '';
	}

	get id() {
		return this._container.dataset.id || '';
	}
}
