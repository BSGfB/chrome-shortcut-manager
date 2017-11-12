function activateTabByIndex(index) {
    chrome.tabs.query({index: index, lastFocusedWindow: true}, tab => activateTabById(tab[0].id))
}

function activateTabById(id) {
    chrome.tabs.update(id, {active: true})
}


chrome.commands.onCommand.addListener(function(command) {
    console.log("Command: " + command)

    
    switch(command) {
        case 'switch_tab_right':
            chrome.tabs.query({active: true, lastFocusedWindow: true}, tab => {
                newIndex = tab[0].index + 1

                chrome.tabs.query({index: newIndex, lastFocusedWindow: true}, newTab => {
                    if (newTab.length > 0)
                        activateTabById(newTab[0].id)
                    else
                        activateTabByIndex(0)
                })
            })
            break
        case 'switch_tab_left':
            chrome.tabs.query({active: true, lastFocusedWindow: true}, tab => {
                newIndex = tab[0].index - 1
                    
                if (newIndex >= 0)
                    activateTabByIndex(newIndex)
                else
                    chrome.tabs.query({}, tabs => activateTabByIndex(tabs.length - 1))
            })
            break
        case 'duplicate_tab':
            chrome.tabs.query({active: true, lastFocusedWindow: true}, tab => chrome.tabs.duplicate(tab[0].id))
            break
        case 'pin_unpin_tab':
            chrome.tabs.query({active: true, lastFocusedWindow: true}, 
                              tab => chrome.tabs.update(tab[0].id, {pinned: !tab[0].pinned}))
            break
    }
})
