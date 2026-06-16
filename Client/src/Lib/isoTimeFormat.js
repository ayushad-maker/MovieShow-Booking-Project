const isoTimeFormat = (dateTime) =>{
    const date = new Date(dateTime);
    const localString = date.toLocaleTimeString('en-US',{
        hour:'2-digit',
        minute:'2-digit',
        hour12:true,
    })

    return localString
}

export default isoTimeFormat