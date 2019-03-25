import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import StringInsertUI from './stringinsertui';
import StringInsertEditing from './stringinsertediting';

export default class StringInsert extends Plugin {
	static get requires() {
		return [ StringInsertUI, StringInsertEditing ];
	}

	static get pluginName() {
		return 'StringInsert';
	}
}
