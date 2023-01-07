//sort Limb to top and order buttonlist
const sortBtnList = (btn) => {
    let buttonList = document.getElementById(btn);
    let buttonArray = Array.from(buttonList.getElementsByTagName("BUTTON"))
    let limbo = buttonArray.shift(); 
    buttonList.append(limbo);
    buttonArray.sort((a, b) => {
            return //Sort Limb to top and order buttonlist
            const sortBtnList = (btn) => {
                let buttonList = document.getElementById(btn);
                let buttonArray = Array.from(buttonList.getElementsByTagName("BUTTON"))
                let limbo = buttonArray.shift(); 
                buttonList.append(limbo);
                buttonArray.sort((a, b) => {
                        return a.textContent.localeCompare(b.textContent)
                    })
                    .forEach(li => buttonList.append(li));
            }
            
            a.textContent.localeCompare(b.textContent)
        })
        .forEach(li => buttonList.append(li));
}

