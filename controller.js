chrome.commands.onCommand.addListener(function(command) {
	var newIndex;
   var maxTabIndex = 0;
   console.log(command);
   
   if (command == 'tab_manager_move_right') {
	    chrome.tabs.query({active: true, lastFocusedWindow: true}, tab => {
	        newIndex = tab[0].index + 1;
	        chrome.tabs.query({index: newIndex, lastFocusedWindow: true}, btab => {
	            if (btab.length > 0) {
	               chrome.tabs.update(btab[0].id, {active: true});
	            } else {
	                chrome.tabs.query({index: 0, lastFocusedWindow: true}, tab0 => {
	                    chrome.tabs.update(tab0[0].id, {active: true});
	                });
	            }
	        });
	    });
   }

  else if (command == 'tab_manager_move_left') {
            chrome.tabs.query({active: true, lastFocusedWindow: true}, tab => {
                newIndex = tab[0].index - 1;
                if (newIndex >= 0) {
                    chrome.tabs.query({index: newIndex, lastFocusedWindow: true}, btab => {
                        chrome.tabs.update(btab[0].id, {active: true});
                    });
                } else {
                    // first tab reached
                    chrome.tabs.query({lastFocusedWindow: true}, maxTab => {
                        maxTab.forEach(t => {
                            // find the maximum tab index (0-based)
                            if (t.index > maxTabIndex) {
                                maxTabIndex = t.index;
                            }
                        });
                        // update the maximum tab index to be active
                        chrome.tabs.query({index: maxTabIndex, lastFocusedWindow: true}, tabMax => {
                            chrome.tabs.update(tabMax[0].id, {active: true});
                        });
                        maxTabIndex = 0;
                    });
                }
            });
   }
});