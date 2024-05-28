import { ContactsForm, IEvents } from '../../types';
import { cloneTemplate } from '../../utils/utils';
import { Form } from '../common/Form';

export class ContactsView extends Form<ContactsForm> {
	constructor(events: IEvents) {
		super(cloneTemplate<HTMLFormElement>('#contacts'), {
			onInput: (field, value) =>
				events.emit(
					'contacts:change',
					field === 'email' ? { email: value } : { phone: value }
				),
			onSubmit: () => events.emit('contacts:submit'),
		});
	}
}
