import Command from '@ckeditor/ckeditor5-core/src/command';

export default class Macroinsertcommand extends Command {
	refresh() {
		this.isEnabled = true;
	}

	execute( text ) {
		const model = this.editor.model;
		const selection = model.document.selection;

		model.change( writer => writer.insert( writer.createText( text ), selection.getFirstPosition() ) );
	}
}

