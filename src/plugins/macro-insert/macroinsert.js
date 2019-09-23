import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Macroinsertui from './macroinsertui';
import Macroinsertediting from './macroinsertediting';

export default class MacroInsert extends Plugin {
	static get requires() {
		return [ Macroinsertui, Macroinsertediting ];
	}

	static get pluginName() {
		return 'MacroInsert';
	}
}
