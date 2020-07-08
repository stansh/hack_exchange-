

const loadButtons = () => 
    
    {
        fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(res =>res.json())
        .then(res=> {
            const units = Object.entries(res.rates);
            console.log(units);
            const container = document.querySelector('.container');
            const BtnDiv = document.createElement('div');
            BtnDiv.setAttribute('class', 'row');
            container.appendChild(BtnDiv);
            
            for (const [key,value] of units) 
                {
                let el = document.createElement('button');
                el.innerHTML = key;
                el.name = key;
                el.value = value;
                el.setAttribute('class', 'btn btn-info');
                el.addEventListener('click', convert);
                BtnDiv.appendChild(el);
                
                }         
            })
        }
    
window.onload = loadButtons();



const convert = (e) => {
    let clickedUnit = e.target;
    
    let unitValue = clickedUnit.value;
    let fromAmount = document.querySelector('#fromAmount').value;
    let error = document.querySelector('#error');
    
    if (!isNaN(fromAmount)) {
       document.querySelector('#toAmount').value = (fromAmount * unitValue).toFixed(2);
    } else {
       error.innerHTML = 'Please enter a numeric value.';
    }
    
}

const changeView = () => {
    const row = document.querySelector('.row');
    row.innerHTML='';
    let fromAmount = document.querySelector('#fromAmount');
    fromAmount.placeholder = 'Enter foreign currency amount';
    const changeView = document.querySelector('#changeView');
    changeView.setAttribute('onclick','location.reload()')
    const note = document.createElement('h4');
    note.innerHTML ='Enter amount and choose currency to convert from'
    note.setAttribute('class','alert')
    row.appendChild(note)
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
    .then(res =>res.json())
    .then(res=> {
        const units = Object.entries(res.rates);
        const container = document.querySelector('.container');
        const BtnDiv = document.createElement('div');
        BtnDiv.setAttribute('class', 'row');
        container.appendChild(BtnDiv);
        
        for (const [key,value] of units) 
            {
            let el = document.createElement('button');
            el.innerHTML = key;
            el.name = key;
            el.value = value;
            el.setAttribute('class', 'btn btn-info');
            
            el.addEventListener('click', convertToUSD);
            BtnDiv.appendChild(el);
           
            }         
    })
}


const convertToUSD = (e) => {
    let clickedUnit = e.target;
    console.log(clickedUnit.value);
    let unitValue = clickedUnit.value;
    let fromAmount = document.querySelector('#fromAmount').value;
    let error = document.querySelector('#error');
    
    if (!isNaN(fromAmount)) {
       document.querySelector('#toAmount').value = (fromAmount / unitValue).toFixed(2);
    } else {
       error.innerHTML = 'Please enter a numeric value.';
    }
    
}

