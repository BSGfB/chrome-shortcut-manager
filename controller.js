chrome.commands.onCommand.addListener(function(command) {
    console.log("Command: " + command)

    
    switch(command) {   
        case 'switch_tab_right':
            switchTabRight()
            break
        case 'switch_tab_left':
            switchTabLeft()
            break
        case 'duplicate_tab':
            chrome.tabs.query({active: true, lastFocusedWindow: true}, tab => chrome.tabs.duplicate(tab[0].id))
            break
        case 'pin_unpin_tab':
            chrome.tabs.query({active: true, lastFocusedWindow: true}, tab => chrome.tabs.update(tab[0].id, {pinned: !tab[0].pinned}))
            break
        case 'yandex_music_play_stop':
            findAndExecuteScriptOnTab('*://music.yandex.ru/*', "document.getElementsByClassName('player-controls__btn player-controls__btn_play')[0].click()")
            break
        case 'yandex_music_next':
            findAndExecuteScriptOnTab('*://music.yandex.ru/*', "document.getElementsByClassName('player-controls__btn player-controls__btn_next')[0].click()")
            break
        case 'vk_music_back':
            findAndExecuteScriptOnTab('*://vk.com/*', "document.getElementsByClassName('top_audio_player_btn_icon')[0].click()")
            break
        case 'vk_music_next':
            findAndExecuteScriptOnTab('*://vk.com/*', "document.getElementsByClassName('top_audio_player_btn_icon')[2].click()")
            break
        case 'vk_music_play_stop':
            findAndExecuteScriptOnTab('*://vk.com/*', "document.getElementsByClassName('top_audio_player_btn_icon')[1].click()")
            break
    }
})

function activateTabByIndex(index) {
    chrome.tabs.query({index: index, lastFocusedWindow: true}, tab => activateTabById(tab[0].id))
}

function activateTabById(id) {
    chrome.tabs.update(id, {active: true})
}

function executeScriptOnTabById(id, code) {
    chrome.tabs.executeScript(id, {code: code, runAt:"document_end"})
}

function findAndExecuteScriptOnTab(url, code) {
    chrome.tabs.query({url: url}, tabs => {
        if (tabs.length > 0)
            executeScriptOnTabById(tabs[0].id, code)
    })
}

function switchTabLeft() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tab => {
        newIndex = tab[0].index - 1
            
        if (newIndex >= 0)
            activateTabByIndex(newIndex)
        else
            chrome.tabs.query({lastFocusedWindow: true}, tabs => activateTabByIndex(tabs.length - 1))
    })
}

function switchTabRight() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tab => {
        newIndex = tab[0].index + 1

        chrome.tabs.query({index: newIndex, lastFocusedWindow: true}, newTab => {
            if (newTab.length > 0)
                activateTabById(newTab[0].id)
            else
                activateTabByIndex(0)
        })
    })
}







