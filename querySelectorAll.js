
function querySelectorAll(parentNode, selector) {
	if(typeof selector !== 'string' || selector.length === 0) {
		return [];
	}

	let siblingSelectors = selector.split(',');
	let res = [];

	siblingSelectors.forEach(siblingSelector => {
		let selectorObjectInLevels = _parseSelector(siblingSelector);
		let nextNodes = [parentNode];

		for(let i = 0, len = selectorObjectInLevels.length; i < len; i++) {
			nextNodes = _getNode(nextNodes, selectorObjectInLevels[i]);

			if(nextNodes.length === 0) {
				break;
			}
		}

		res = res.concat(nextNodes);
	});

	return res;
}

function _parseSelector(selector) {
	let levels = selector.split(/\s+/);

	return levels.map(level => {
		let res = {
			id: null,
			tagName: null,
			classNames: []
		};
		let tagName = '';

		for(let i = 0, len = level.length; i < len; i++) {
			if(level[i] === '#') {
				i++;
				let id = '';
				let startIndex = i;

				while(i < len && level[i] !== '#') {
					i++;
				}
				
				res.id = level.substring(startIndex, i);
			} else if(level[i] === '.') {
				i++;
				let className = '';
				let startIndex = i;
				
				while(i < len && level[i] !== '.') {
					i++;
				}
				
				res.classNames.push(level.substring(startIndex, i));
			} else {
				tagName += level[i];
			}
		}

		res.tagName = tagName.toUpperCase();

		return res;
	});
}

function _getNode(parentNodes, selectorObject) {
	if(!Array.isArray(parentNodes) || parentNodes.length === 0) {
		return [];
	}

	let res = [];
	let nextNodes = [];

	parentNodes.forEach(parentNode => {
		let childNodes = parentNode.childNodes;

		for(let i = 0, len = childNodes.length; i < len; i++) {
			if(childNodes[i].nodeType !== 1) {
				// nodetype = 1 is Element Type
				continue;
			}

			// no matter match or not , add to check all child nodes
			nextNodes.push(childNodes[i]);

			if(selectorObject.id !== null) {
				if(childNodes[i].id !== selectorObject.id) {
					continue;
				}
			}

			if(selectorObject.tagName.length !== 0) {
				if(childNodes[i].tagName !== selectorObject.tagName) {
					continue;
				}
			}
			
			let classList = childNodes[i].classList;
			let classNamesAllMatch = selectorObject.classNames.every(className => classList.contains(className));

			if(classNamesAllMatch) {
				res.push(childNodes[i]);
			}
		}	
	});

	return res.concat(_getNode(nextNodes, selectorObject));
}
