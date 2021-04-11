import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const NewWindow = forwardRef(({ url, name, title, features, onBlock, onOpen, onClose, center, copyStyles: _copyStyles, children }, ref) => {
	const popup = useRef(null);
	const container = useRef(null);
	const windowChecker = useRef(null);
	const released = useRef(false);

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		openWindow();
		setMounted(true);

		return () => {
			popup.current?.close();
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [popup]);

	useImperativeHandle(
		ref,
		() => ({
			focus: () => {
				popup.current?.focus();
			}
		})
	);

	const openWindow = () => {
		// Prepare position of the new window to be centered against the 'parent' window or 'screen'.
		if (
			typeof center === 'string' &&
			(features.width === undefined || features.height === undefined)
		) {
			console.warn(
				'width and height window features must be present when a center prop is provided'
			);
		}
		else if (center === 'parent') {
			features.left =
				window.top.outerWidth / 2 + window.top.screenX - features.width / 2;
			features.top =
				window.top.outerHeight / 2 + window.top.screenY - features.height / 2;
		}
		else if (center === 'screen') {
			const screenLeft =
				window.screenLeft !== undefined ? window.screenLeft : window.screen.left;
			const screenTop =
				window.screenTop !== undefined ? window.screenTop : window.screen.top;
		
			const width = window.innerWidth
				? window.innerWidth
				: document.documentElement.clientWidth
				? document.documentElement.clientWidth
				: window.screen.width;
			const height = window.innerHeight
				? window.innerHeight
				: document.documentElement.clientHeight
				? document.documentElement.clientHeight
				: window.screen.height;
		
			features.left = width / 2 - features.width / 2 + screenLeft
			features.top = height / 2 - features.height / 2 + screenTop
		}

		popup.current = window.open(url, name, toWindowFeatures(features));

		windowChecker.current = setInterval(() => {
			if (!popup.current || popup.current.closed) {
				release();
			}
		}, 50);

		if (popup.current) {
			container.current = popup.current.document.createElement('div');

			popup.current.document.title = title;
			popup.current.document.body.appendChild(container.current);

			// If specified, copy styles from parent window's document
			if (_copyStyles) {
				setTimeout(() => copyStyles(document, popup.current.document), 0);
			}

			if (typeof onOpen === 'function') {
				onOpen(popup.current);
			}

			// Release anything bound to this component before the new window unloads
			popup.current.addEventListener('beforeunload', release);
		}
		else {
			// Handle error on opening of new window
			if (typeof onBlock === 'function') {
				onBlock(null);
			}
			else {
				console.warn('A new window could not be opened. Maybe it was blocked.');
			}
		}
	};

	const release = (event) => {
		if (released.current) {
			return ;
		}

		released.current = true;

		clearInterval(windowChecker.current);

		if (typeof onClose === 'function') {
			onClose(event);
		}
	}

	if (!mounted) {
		return null;
	}
	else {
		return createPortal(children, container.current);
	}
});

NewWindow.propTypes = {
	children: PropTypes.node,
	url: PropTypes.string,
	name: PropTypes.string,
	title: PropTypes.string,
	features: PropTypes.object,
	onBlock: PropTypes.func,
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
	center: PropTypes.oneOf(['parent', 'screen']),
	copyStyles: PropTypes.bool
}

NewWindow.defaultProps = {
	url: '',
	name: '',
	title: '',
	features: {
		width: '600px',
		height: '400px'
	},
	onBlock: null,
	onOpen: null,
	onClose: null,
	center: 'parent',
	copyStyles: true
};

/**
 * Utility functions.
 * @private
 */

/**
 * Copy styles from a source document to a target.
 * @param {Object} source
 * @param {Object} target
 * @private
 */

function copyStyles(source, target) {
	// Store style tags, avoid reflow in the loop
	const headFrag = target.createDocumentFragment();

	Array.from(source.styleSheets).forEach(styleSheet => {
		// For <style> elements
		let rules;
		try {
			rules = styleSheet.cssRules;
		} catch (err) {
			console.error(err);
		}

		if (rules) {
			// IE11 is very slow for appendChild, so use plain string here
			const ruleText = [];
	
			// Write the text of each rule into the body of the style element
			Array.from(styleSheet.cssRules).forEach(cssRule => {
				const { type } = cssRule;
		
				// Skip unknown rules
				if (type === CSSRule.UNKNOWN_RULE) {
					return ;
				}
		
				let returnText = '';
		
				if (type === CSSRule.KEYFRAMES_RULE) {
					// IE11 will throw error when trying to access cssText property, so we
					// need to assemble them
					returnText = getKeyFrameText(cssRule);
				}
				else if (
					[CSSRule.IMPORT_RULE, CSSRule.FONT_FACE_RULE].includes(type)
				) {
					// Check if the cssRule type is CSSImportRule (3) or CSSFontFaceRule (5)
					// to handle local imports on a about:blank page
					// '/custom.css' turns to 'http://my-site.com/custom.css'
					returnText = fixUrlForRule(cssRule);
				}
				else {
					returnText = cssRule.cssText;
				}

				ruleText.push(returnText);
			});
	
			const newStyleEl = target.createElement('style');
			newStyleEl.textContent = ruleText.join('\n');
			headFrag.appendChild(newStyleEl);
		}
		else if (styleSheet.href) {
			// for <link> elements loading CSS from a URL
			const newLinkEl = target.createElement('link');
	
			newLinkEl.rel = 'stylesheet';
			newLinkEl.href = styleSheet.href;
			headFrag.appendChild(newLinkEl);
		}
	});

	target.head.appendChild(headFrag);
}

/**
 * Make keyframe rules.
 * @param {CSSRule} cssRule
 * @return {String}
 * @private
 */

function getKeyFrameText(cssRule) {
	const tokens = ['@keyframes', cssRule.name, '{'];
	
	Array.from(cssRule.cssRules).forEach(cssRule => {
		// type === CSSRule.KEYFRAME_RULE should always be true
		tokens.push(cssRule.keyText, '{', cssRule.style.cssText, '}')
	});
	tokens.push('}');

	return tokens.join(' ');
}

/**
 * Handle local import urls.
 * @param {CSSRule} cssRule
 * @return {String}
 * @private
 */

function fixUrlForRule(cssRule) {
	return cssRule.cssText
		.split('url(')
		.map(line => {
			if (line[1] === '/') {
				return `${line.slice(0, 1)}${window.location.origin}${line.slice(1)}`
			}
			return line
		})
		.join('url(');
}

/**
 * Convert features props to window features format (name=value,other=value).
 * @param {Object} obj
 * @return {String}
 * @private
 */

function toWindowFeatures(obj) {
	return Object.keys(obj)
		.reduce((features, name) => {
			const value = obj[name];

			if (typeof value === 'boolean') {
				features.push(`${name}=${value ? 'yes' : 'no'}`);
			}
			else {
				features.push(`${name}=${value}`);
			}

			return features;
		}, [])
		.join(',');
}

/**
 * Component export.
 * @private
 */

export default NewWindow;
