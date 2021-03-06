function(trie) {
	return function(bytes) {
		var s = '';
		var t = trie;
		for (var i = 0; i < bytes.length; ++i) {
			var b = bytes[i];
			var tt = t[b];
			if (typeof(tt) === 'string') {
				// leaf of the trie; emit and reset
				s += tt;
				t = trie;
			} else if (typeof(tt) === 'object') {
				// retrieve the trie
				t = tt;
			} else {
				// no entry; ignore and reset
				t = trie;
			}
		}
		return s;
	};
}
