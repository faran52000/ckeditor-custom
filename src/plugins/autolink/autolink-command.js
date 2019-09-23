import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { isUrlEmail, createLinkElement, mergeNodes } from './utils';

export default class AutoLinkCommand extends Plugin {
	static get pluginName() { return 'AutoLinkCommand'; }

	init() {
		const editor = this.editor;
		const modelDocument = editor.model.document;

		editor.keystrokes.set( 'space', () => this._convertToLink( editor, modelDocument ) );
	}

	_convertToLink( editor ) {
		const model = editor.model;
		const document = model.document;
		const selection = document.selection;
		const selectionParent = editor.model.document.selection.focus.parent;
		const probe = model.createSelection( model.document.selection );

		const rangeBeforeSelection = model.createRange( model.createPositionAt( selection.focus.parent, 0 ), selection.focus );

		// Do nothing if selection is not collapsed.
		if ( !selection.isCollapsed ) {
			return;
		}

		const nodesMerged = mergeNodes( rangeBeforeSelection.getItems() );

		if ( !( nodesMerged && nodesMerged.length ) ) {
			return;
		}

		const dataArr = nodesMerged.split( ' ' );
		const url = dataArr[ dataArr.length - 1 ];

		if ( !isUrlEmail( url ) ) {
			return;
		}

		const replaceIndex = nodesMerged.indexOf( url );

		const replacePosition = model.createPositionAt( selectionParent, replaceIndex );
		const replaceRange = model.createRange( replacePosition, replacePosition.getShiftedBy( url.length ) );
		createLinkElement( model, url, replaceRange );

		model.modifySelection( probe, { direction: 'forward' }, { unit: 'character' } );
		probe.focus.nodeAfter;
	}
}
