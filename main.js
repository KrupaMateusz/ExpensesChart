fetch("./data.json")
.then(results=>results.json())
.then(data=>{
    const diagram = document.querySelector(".diagram")
    const height = parseInt(diagram.offsetHeight)*0.7
    let maxAmountOfMoney = 0
    data.forEach(element => {
        if(element.amount > maxAmountOfMoney) maxAmountOfMoney = element.amount
    })
    const date = new Date()
    let todaysDay = date.getDay()
    if(todaysDay===0) todaysDay = 7
    let counter = 1
    data.forEach(element => {
        let day = document.createElement('p')
        let amount = document.createElement('div')
        let currentColumnHeight = element.amount/maxAmountOfMoney*height
        let diagramDesc = document.createElement("div")
        let column = document.createElement("li")

        if(todaysDay === counter) amount.style.backgroundColor = "var(--clr-primary-300)"

        day.innerHTML = element.day

        diagramDesc.classList.add("diagram-column-description")
        diagramDesc.setAttribute("id", `${element.day}`)
        diagramDesc.innerHTML = `<p>$`+`${element.amount}</p>`

        amount.classList.add("diagram-column")
        amount.style.height = `${currentColumnHeight}px`
        amount.setAttribute("title", `${element.amount}`)
        
        amount.addEventListener("mouseover", ()=>{
            let description = document.getElementById(`${element.day}`)
            description.style.display = "block"
        })
        
        amount.addEventListener("mouseout", ()=>{
            let description = document.getElementById(`${element.day}`)
            description.style.display = "none"
        })

        column.appendChild(diagramDesc)
        column.appendChild(amount)
        column.appendChild(day)
        column.classList.add('column')
        diagram.appendChild(column)

        counter++
    })
})
