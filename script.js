async function dateapi(){
    let url1 = fetch('https://date.nager.at/api/v3/NextPublicHolidaysWorldwide')
    let out1 = await url1;
    let res1 = out1.json();
    let out2 = await res1;

    for(let i of out2){
        let code1 =i.countryCode;
        let url11 = fetch(`https://date.nager.at/api/v3/CountryInfo/${code1}`)
        let out11 =await url11;
        let res22 = out11.json();
        let out22 = await res22;

        let tableCont = document.querySelector('.table-success')

        let rowCreat = document.createElement('tr')
        
        let dataArr = [i.date,i.name,out22.commonName]
        for(let dat of dataArr){
        let rowData1 = document.createElement('td')
        rowData1.innerText = `${dat}`
        rowCreat.append(rowData1)
        }

        tableCont.append(rowCreat)
    }
}
dateapi()




async function countryApi(){
    let contyUrl = fetch('https://date.nager.at/api/v3/AvailableCountries')
    let contyOut = await contyUrl;
    let contyRes = contyOut.json();
    let contyOut1 = await contyRes;

    let serSel = document.querySelector('[placeholder = select]')

    for(let cont of contyOut1){
        let serOpt = document.createElement('option')
        serOpt.setAttribute('value',cont.countryCode)
        serOpt.innerText = `${cont.name}`
        serSel.append(serOpt)
    }

    let formSub = document.querySelector('.formClass')
    formSub.addEventListener('submit',(e)=>{
        e.preventDefault()

        async function contryApi(){
            let contyUrl1 = fetch(`https://date.nager.at/api/v3/NextPublicHolidays/${serSel.value}`)
            let contyOut1 = await contyUrl1;
            let contyRes1 = contyOut1.json();
            let contyOut11 = await contyRes1;

            let pubHol = document.querySelector('.tabCon')
            let tabSel = document.querySelector('.table-info')
            let headHol = document.querySelector('.Heading')
            headHol.innerText = ''
            tabSel.innerText =''

            let ConHead = document.createElement('h4')
            ConHead.innerText ='Public holidays for the next 365 days'
            headHol.append(ConHead)

            let tabRow1 = document.createElement('tr')

            let tabHead = ["Date","Name","Local Name"]
            for(let arr of tabHead){
                let tabHead = document.createElement('th')
                tabHead.innerText = `${arr}`
                tabRow1.append(tabHead)
            }
            tabSel.append(tabRow1)
            
            for(let yearData of contyOut11){
                let holiData = [yearData.date,yearData.name,yearData.localName]
                let tabRow2 = document.createElement('tr')
                for(let holiday of holiData){
                let rowData2 = document.createElement('td')
                rowData2.innerText = `${holiday}`
                tabRow2.append(rowData2)
                }
                tabSel.append(tabRow2)
            }
            pubHol.append(tabSel)
        }
        contryApi()
    })
}
countryApi()

