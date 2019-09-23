const ATTRIBUTE_WHITESPACES = /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205f\u3000]/g; // eslint-disable-line no-control-regex

// eslint-disable-next-line max-len
const IS_URL = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/i;
const IS_EMAIL = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

export function isUrlEmail( url ) {
	url = String( url );

	const normalizedUrl = _normalizeUrl( url );
	return normalizedUrl.match( IS_EMAIL ) || normalizedUrl.match( IS_URL );
}

export function createLinkElement( model, url, replaceRange ) {
	model.enqueueChange( writer => {
		// writer.setAttribute( 'link', true, replacePosition );

		// After attribute, remove given attribute from the selection. Preventing user to edit text.
		const urlElement = writer.createText( _parseUrl( url ), { 'linkHref': _parseUrl( url ) } );
		model.insertContent( urlElement, replaceRange );
		model.insertContent( writer.createText( '\u200b' ) ); // Zero character width space to get focus out
	} );
}

export function mergeNodes( nodeList ) {
	const _nodeList = Array.isArray( nodeList ) ? nodeList : Array.from( nodeList );
	return _nodeList.reduce( ( rangeText, node ) => {
		if ( node.is( 'softBreak' ) ) {
			return '';
		}

		return rangeText + node.data;
	}, '' );
}

function _parseUrl( url ) {
	const normalizedUrl = _normalizeUrl( url );
	return normalizedUrl.match( IS_EMAIL ) ? `mailto:${ url }` : url;
}

function _normalizeUrl( url ) {
	url = String( url );
	return url.replace( ATTRIBUTE_WHITESPACES, '' );
}
