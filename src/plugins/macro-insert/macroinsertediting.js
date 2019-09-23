import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Macroinsertcommand from './macroinsertcommand';

export default class MacroInsertEditing extends Plugin {
	init() {
		this.editor.commands.add( 'macroinsert', new Macroinsertcommand( this.editor ) );
	}
}
