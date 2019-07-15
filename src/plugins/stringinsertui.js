import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { createDropdown, addToolbarToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

const list = new Map( [
	[ 'recipient', 'Recipient Name' ],
	[ 'survey', 'Survey Link' ],
	[ 'user', 'User Name' ],
	[ 'company', 'Company Name' ]
] );

export default class StringInsertUI extends Plugin {
	static get pluginName() {
		return 'StringInsertUI';
	}
	init() {
		const editor = this.editor;
		const componentFactory = editor.ui.componentFactory;
		const options = Array.from( list.keys() );

		options.forEach( option => this._addButton( option ) );

		componentFactory.add( 'stringinsert', locale => {
			const dropdownView = createDropdown( locale );

			// Add existing alignment buttons to dropdown's toolbar.
			const buttons = options.map( option => componentFactory.create( option ) );
			addToolbarToDropdown( dropdownView, buttons );

			// Configure dropdown properties an behavior.
			dropdownView.buttonView.set( { label: 'Insert', tooltip: true, withText: true } );

			dropdownView.toolbarView.isVertical = true;

			dropdownView.extendTemplate( {
				attributes: {
					class: 'ck-insert-dropdown'
				}
			} );

			// Enable button if any of the buttons is enabled.
			dropdownView.bind( 'isEnabled' ).toMany( buttons, 'isEnabled', ( ...areEnabled ) => areEnabled.some( isEnabled => isEnabled ) );

			return dropdownView;
		} );
	}

	get localizedOptionTitles() {
		const t = this.editor.t;

		return {
			'recipient': t( 'Insert Recipient Name' ),
			'survey': t( 'Survey Link' ),
			'user': t( 'User Name' ),
			'company': t( 'Company Name' )
		};
	}

	_addButton( option ) {
		const editor = this.editor;

		editor.ui.componentFactory.add( option, locale => {
			const command = editor.commands.get( 'stringinsert' );
			const buttonView = new ButtonView( locale );

			buttonView.set( {
				label: this.localizedOptionTitles[ option ],
				tooltip: true,
				withText: true
			} );

			buttonView.bind( 'isEnabled' ).to( command );
			buttonView.bind( 'isOn' ).to( command, 'value', value => value === option );

			this.listenTo( buttonView, 'execute', () => editor.execute( 'stringinsert', `[${ list.get( option ) }]` ) );

			return buttonView;
		} );
	}
}
