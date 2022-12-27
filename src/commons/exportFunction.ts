

export async function isAccept(){
    try{
        const response = await fetch('https://63a3fdab821953d4f2a60bb6.mockapi.io/accepted/1',
        {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isAccepted: 'accepted'
            })
        })
        const json = await response.json()
        return json
    }
    catch(err){
        console.log(err); 
    }
    finally{
        // setTimeout(() => {
            isReject()
        // }, 1000)
    }
}
export async function isReject(){
    try{
        const response = await fetch('https://63a3fdab821953d4f2a60bb6.mockapi.io/accepted/1',
        {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isAccepted: 'rejected'
            })
        })
        const json = await response.json()
        return json
    }
    catch(err){
        console.log(err); 
    }
}
export async function getAcceptStatus(){
    try{
        const response = await fetch('https://63a3fdab821953d4f2a60bb6.mockapi.io/accepted/1',
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        return json
    }
    catch(err){
        console.log(err); 
    }
}
export async function getLanguages(){
    try{
        const response = await fetch('https://63a3fdab821953d4f2a60bb6.mockapi.io/languages',
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return data
    }
    catch(err){
        console.log(err); 
    }
}