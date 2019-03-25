import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import StringInsertCommand from './stringinsertcommand';

export default class StringInsertEditing extends Plugin {
	init() {
		this.editor.commands.add( 'stringinsert', new StringInsertCommand( this.editor ) );
	}
}
