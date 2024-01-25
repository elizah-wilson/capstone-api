process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// async function with await unravels the promises
async function getQuote() {
  try {                                                 //key word 
    let response = await fetch("https://zenquotes.io/api/today/")
    let data = await response.json()
    return data[0].q
  }
  catch(error){
      console.log(error)
  }
}

exports.getQuote = getQuote