import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import AutoLinkCommand from './autolink-command';

export default class AutoLink extends Plugin {
	static get requires() { return [ AutoLinkCommand ]; }
	static get pluginName() { return 'AutoLink'; }
}
